// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nmtriprbdyjleufmvgli.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tdHJpcHJiZHlqbGV1Zm12Z2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0ODY4OTksImV4cCI6MjA2NjA2Mjg5OX0.85vDMv-N9LIWmyKti0hl4S3U8aRngFnY8qbOJLBiuQ8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);