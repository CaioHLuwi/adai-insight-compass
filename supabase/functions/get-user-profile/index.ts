import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { user_id } = await req.json();

    if (!user_id) {
      return new Response(
        JSON.stringify({ error: 'user_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create a Supabase client with service role key to access auth.users
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // First try to get from public.users table
    const { data: publicUser } = await supabaseAdmin
      .from('users')
      .select('id, name, email, avatar_url, department')
      .eq('id', user_id)
      .maybeSingle();

    if (publicUser) {
      return new Response(
        JSON.stringify(publicUser),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If not found in public.users, try to get from auth.users
    const { data: authUser, error } = await supabaseAdmin.auth.admin.getUserById(user_id);

    if (error || !authUser?.user) {
      console.log('User not found in auth or public tables for ID:', user_id);
      return new Response(
        JSON.stringify({ 
          id: user_id, 
          name: 'Usuario Deletado', 
          email: '', 
          avatar_url: '', 
          department: '' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract user data from auth.users
    const userData = {
      id: authUser.user.id,
      name: authUser.user.user_metadata?.name || 
            authUser.user.user_metadata?.full_name || 
            authUser.user.email?.split('@')[0] || 
            'Usuário',
      email: authUser.user.email || '',
      avatar_url: authUser.user.user_metadata?.avatar_url || '',
      department: authUser.user.user_metadata?.department || ''
    };

    return new Response(
      JSON.stringify(userData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in get-user-profile function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
})