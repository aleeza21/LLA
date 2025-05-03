// supabase.js

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://bymyzshjzxyjigkmpwha.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5bXl6c2hqenh5amlna21wd2hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ5MTA5MTYsImV4cCI6MjAzMDQ4NjkxNn0.eNhjeb6DK0KM-hX9sCzHXu_oQqzWBaKM7Kfe6pSydM8';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;