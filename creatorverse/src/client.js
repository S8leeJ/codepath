// src/client.js
import { createClient } from '@supabase/supabase-js';

// Replace with your actual values from Supabase Settings → API
const URL = 'https://euwtoqiqgntquvrcdcbw.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1d3RvcWlxZ250cXV2cmNkY2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MTgwODMsImV4cCI6MjA3MTI5NDA4M30.6CAmFVEn3tDe2cQ0Y_5NzoWFrIVWAnxUeAFrqpR-sRA';

export const supabase = createClient(URL, API_KEY);
