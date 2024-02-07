import { supabase } from "../supabase/supabase";

export const getTeams = async () => {
  const data = await supabase.from("match").select("*");
  return data;
};
