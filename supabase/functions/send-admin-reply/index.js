import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts"; // Ensure this file exists

serve(async (req) => {
  // ✅ Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { admin_id, chat_id, message_text } = await req.json();
    const now = new Date().toISOString();

    if (!admin_id || !chat_id || !message_text) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL"),
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
    );

    // Insert message
    const { error: messageError } = await supabase.from("chat_messages").insert({
      chat_id,
      sender_id: admin_id,
      sender_role: "admin",
      message_text,
    });
    if (messageError) throw messageError;

    // Update parent chat
    const { error: chatError } = await supabase
      .from("support_chats")
      .update({
        admin_id,
        status: "in_progress",
        last_admin_message_at: now,
        last_message_at: now,
        last_message_text: message_text,
      })
      .eq("id", chat_id);
    if (chatError) throw chatError;

    return new Response(
      JSON.stringify({ message: "Admin reply sent successfully" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
