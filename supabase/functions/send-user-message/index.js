import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {corsHeaders} from "../_shared/cors.ts"; // Import CORS headers from a separate file

// CORS headers to allow requests from any origin



serve(async (req) => {
  // This is needed for CORS preflight requests.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { sender_id, sender_role, message_text } = await req.json();
    const now = new Date().toISOString();

    if (!sender_id || !message_text || !sender_role) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize the Supabase client with the Service Role Key
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL"),
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
    );

    const column = "user_id" ;

    // Find the last chat for the user, if it's not closed
    const { data: lastChat, error: lastChatError } = await supabase
      .from("support_chats")
      .select("id, status")
      .eq(column, sender_id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (lastChatError) throw lastChatError;

    let chatId = lastChat?.status !== "closed" ? lastChat?.id : null;

    // If no active chat exists, create a new one
    if (!chatId) {
      const { data: newChat, error: newChatError } = await supabase
        .from("support_chats")
        .insert({
          [column]: sender_id,
          status: "open",
          last_user_message_at: now,
          last_message_at: now,
          last_message_text: message_text,
        })
        .select("id")
        .single();

      if (newChatError) throw newChatError;
      chatId = newChat.id;

    } else {
      // If an active chat exists, update its last message details
      const updateData = {
        last_user_message_at: now,
        last_message_at: now,
        last_message_text: message_text,
      };

      // If an agent was waiting, set the status back to in_progress
      if (lastChat.status === "waiting") {
        updateData.status = "in_progress";
      }

      const { error: updateError } = await supabase
        .from("support_chats")
        .update(updateData)
        .eq("id", chatId);

      if (updateError) throw updateError;
    }

    // Finally, insert the new message into the chat
    const { error: messageError } = await supabase.from("chat_messages").insert({
      chat_id: chatId,
      sender_id,
      sender_role, // It's good practice to store the role with the message
      message_text,
    });

    if (messageError) throw messageError;

    return new Response(JSON.stringify({ chat_id: chatId }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});