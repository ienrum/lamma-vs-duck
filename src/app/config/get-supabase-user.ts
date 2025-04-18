
import { SupabaseClient } from "@supabase/supabase-js"

export const getSupabaseUser = async (supabase: SupabaseClient) => {
  if (typeof window !== "undefined") {
    if (process.env.NEXT_PUBLIC_API_TEST_TOKEN) {
      return await supabase.auth.getUser(process.env.NEXT_PUBLIC_API_TEST_TOKEN!)
    }
    return await supabase.auth.getUser()
  } else {
    if (process.env.NEXT_PUBLIC_API_TEST_TOKEN) {
      return await supabase.auth.getUser(process.env.NEXT_PUBLIC_API_TEST_TOKEN!)
    }
    return await supabase.auth.getUser()
  }
}