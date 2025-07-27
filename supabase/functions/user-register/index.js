import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

// Helper function to correctly create a Supabase admin client
const createAdminClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );
};
function toISODate(dateStr) {
  const [day, month, year] = dateStr.split("/"); 
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

Deno.serve(async (req) => {
  console.log("--- Edge function invoked ---");

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  let userId = null;

  try {
    const supabaseAdmin = createAdminClient();
    console.log("Admin client created.");

    const formData = await req.formData();
    console.log("FormData received.");

    const userData = {
      email: formData.get('email'),
      password: formData.get('password'),
      displayName: formData.get('displayName'),
      age: parseInt(formData.get('age'), 18),
      gender: formData.get('gender'),
      dateOfBirth: formData.get("dateOfBirth"),
      country: formData.get('country'),
      city: formData.get('city'),
      phoneNumber: formData.get('phoneNumber'),
      avatarFile: formData.get('avatarFile'),
    };
    console.log("date",userData)
    console.log(`Parsed form data for user: ${userData.displayName}`);

    const { data: { user }, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: userData.email,
      password: userData.password,
      email_confirm: true,
      user_metadata: {
        display_name: userData.displayName
      },
      app_metadata: {
        is_blocked: false,
        role: 'user',
      },
    });

    if (authError) throw authError;
    if (!user) throw new Error("User creation failed in Auth.");
    userId = user.id;
    console.log(`Auth user created with ID: ${userId}`);

    const { error: profileError } = await supabaseAdmin.from('profiles').insert({
      id: userId,
      email: userData.email,
      display_name: userData.displayName,
      role: 'user'
    });
    if (profileError) throw new Error(`Profile creation failed: ${profileError.message}`);
    console.log("Profile record created successfully.");

    let avatarUrl = null;
    if (userData.avatarFile && userData.avatarFile instanceof File) {
      console.log(`Uploading avatar: ${userData.avatarFile.name}`);
      const avatarPath = `${userId}/${userData.avatarFile.name}`;
      const { error: uploadError } = await supabaseAdmin.storage
        .from('avatars')
        .upload(avatarPath, userData.avatarFile, {
          contentType: userData.avatarFile.type
        });
      if (uploadError) throw uploadError;
      const { data: urlData } = supabaseAdmin.storage.from('avatars').getPublicUrl(avatarPath);
      avatarUrl = urlData.publicUrl;
      console.log(`Avatar uploaded to: ${avatarUrl}`);
    }

    console.log("Inserting user profile details into database...");

    
    const { error: userProfileError } = await supabaseAdmin.from('userprofiles').insert({
      id: userId,
      email:userData.email,
      display_name: userData.displayName,
      age: userData.age,
      gender: userData.gender,
      date_of_birth: userData.dateOfBirth,
      country: userData.country,
      city: userData.city,
      phone_number: userData.phoneNumber,
      avatar_url: avatarUrl
    });
    
    if (userProfileError) {
        // Throw the specific database error so the catch block can inspect it
        throw userProfileError;
    }
    console.log("User profile record inserted successfully.");

    return new Response(JSON.stringify({
      message: "User registration successful!",
      userId: userId
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    console.error("--- ERROR IN USER REGISTRATION FUNCTION ---");
    
    // --- ENHANCED ERROR HANDLING ---
    // This will now log the specific database error details
    const errorDetails = {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
    };
    console.error(JSON.stringify(errorDetails, null, 2)); 

    if (userId) {
      console.log(`Rolling back: Deleting user ${userId}`);
      const supabaseAdmin = createAdminClient();
      await supabaseAdmin.auth.admin.deleteUser(userId);
    }
    
    return new Response(JSON.stringify({
      error: errorDetails.message || 'An unknown error occurred.',
      details: errorDetails
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400
    });
  }
});
