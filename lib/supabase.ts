import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://abtluivjiudgfkszrhif.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFidGx1aXZqaXVkZ2Zrc3pyaGlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4MTE4NzQsImV4cCI6MjA5MDM4Nzg3NH0.zMQbOJSfFjHmLAehIuorYN-33VxMWyGTc-kscTLVlOk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
