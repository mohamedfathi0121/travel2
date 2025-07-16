import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  console.log("--- Edge function invoked ---");

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

    let userId = null;

    try {
      const supabaseAdmin = createClient();
      console.log("Admin client created.");

      // 1. Parse the multipart/form-data request
      const formData = await req.formData();
      console.log("FormData received.");

      const userData = {
        email: formData.get('email'),
        password: formData.get('password'),
        displayName: formData.get('displayName'),
        age: parseInt(formData.get('age'), 10),
        gender: formData.get('gender'),
        dateOfBirth: formData.get('dateOfBirth'),
        country: formData.get('country'),
        city: formData.get('city'),
        phoneNumber: formData.get('phoneNumber'),
        avatarFile: formData.get('avatarFile'),
      };
      console.log(`Parsed form data for user: ${userData.displayName}`);

      // 2. Create the user in Supabase Auth
      console.log(`Attempting to create auth user for: ${userData.email}`);
      const { data: { user }, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        email_confirm: true,
        user_metadata: {
          display_name: userData.displayName
        }
      });

      if (authError) throw authError;
      if (!user) throw new Error("User creation failed in Auth.");
      userId = user.id;
      console.log(`Auth user created with ID: ${userId}`);

      // 3. Create the corresponding record in the 'profiles' table
      console.log(`Creating profile record for user ID: ${userId}`);
      const { error: profileError } = await supabaseAdmin.from('profiles').insert({
        id: userId,
        email: userData.email,
        display_name: userData.displayName,
        role: 'user'
      });
      if (profileError) throw new Error(`Profile creation failed: ${profileError.message}`);
      console.log("Profile record created successfully.");

      // 4. Upload avatar to Supabase Storage
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

      // 5. Insert the final user profile record with all details
      console.log("Inserting user profile details into database...");
      const { error: userProfileError } = await supabaseAdmin.from('userProfiles').insert({
        id: userId,
        display_name: userData.displayName,
        age: userData.age,
        gender: userData.gender,
        date_of_birth: new Date(userData.dateOfBirth).toISOString(),
        country: userData.country,
        city: userData.city,
        phone_number: userData.phoneNumber,
        avatar_url: avatarUrl
      });
      if (userProfileError) throw userProfileError;
      console.log("User profile record inserted successfully.");

      // 6. Return a success response
      return new Response(JSON.stringify({
        message: "User registration successful!",
        userId: userId
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });

    } catch (error) {
      console.error("--- ERROR IN USER REGISTRATION FUNCTION ---");
      console.error(error);

      // Rollback logic
      if (userId) {
        console.log(`Rolling back: Deleting user ${userId}`);
        const supabaseAdmin = createAdminClient();
        await supabaseAdmin.auth.admin.deleteUser(userId);
      }

      return new Response(JSON.stringify({
        error: error.message
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      });
    }
  
});
