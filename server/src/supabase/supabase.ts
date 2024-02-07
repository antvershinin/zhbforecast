import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jqazsgxiuwlcsrgzckre.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxYXpzZ3hpdXdsY3NyZ3pja3JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcyMDI5MTMsImV4cCI6MjAyMjc3ODkxM30.wb8RHIhiVNZ106Td92vyiOT1Qv_h8EtHtu-Q59uUd2U";

export const supabase = createClient(supabaseUrl, supabaseKey);
