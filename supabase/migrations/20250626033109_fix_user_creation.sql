
-- First, let's update the handle_new_user function to work correctly
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY definer SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    'user'
  );
  RETURN new;
END;
$$;

-- Remove the password_hash column from users table as it's not needed with Supabase Auth
ALTER TABLE public.users DROP COLUMN IF EXISTS password_hash;

-- Make sure the trigger exists and is properly set up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
