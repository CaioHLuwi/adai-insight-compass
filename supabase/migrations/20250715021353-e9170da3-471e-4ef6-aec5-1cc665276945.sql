-- First, let's check and sync existing auth users to public.users table
-- This will ensure all existing users are properly visible

-- Insert missing users from auth.users to public.users
INSERT INTO public.users (id, email, name, role, avatar_url)
SELECT 
  au.id,
  au.email,
  COALESCE(
    au.raw_user_meta_data ->> 'name',
    au.raw_user_meta_data ->> 'full_name', 
    split_part(au.email, '@', 1)
  ) as name,
  'user' as role,
  au.raw_user_meta_data ->> 'avatar_url' as avatar_url
FROM auth.users au
WHERE NOT EXISTS (
  SELECT 1 FROM public.users pu WHERE pu.id = au.id
);

-- Update the trigger function to handle user creation properly
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role, avatar_url)
  VALUES (
    new.id,
    new.email,
    COALESCE(
      new.raw_user_meta_data ->> 'name',
      new.raw_user_meta_data ->> 'full_name', 
      split_part(new.email, '@', 1)
    ),
    'user',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  RETURN new;
END;
$$;