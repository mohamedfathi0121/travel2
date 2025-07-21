
import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// This function is likely a cron job to automatically update chat statuses.

serve(async () => {
  try {
    // 1. Create a Supabase client with the Service Role Key.
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL"),
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
    );

    const now = new Date().toISOString();

    // 2. Call the RPC function to move inactive chats to 'waiting'.
    const { error: waitingError } = await supabase.rpc("set_chats_to_waiting", { now });
    if (waitingError) throw waitingError;

    // 3. Call the RPC function to move old waiting chats to 'closed'.
    const { error: closedError } = await supabase.rpc("set_chats_to_closed", { now });
    if (closedError) throw closedError;

    // 4. Return a success response.
    return new Response(JSON.stringify({ message: "Status transitions complete ✅" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});