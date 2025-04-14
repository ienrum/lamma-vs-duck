import { createClient as createClientClient } from "@/utils/supabase/client"
import { createClient as createClientServer } from "@/utils/supabase/server"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { SupabaseClient } from "@supabase/supabase-js"

export const getSupabaseUser = async (supabase?: SupabaseClient, cookieStore?: ReadonlyRequestCookies) => {
  if (typeof window !== "undefined") {
    if (!supabase) {
      supabase = createClientClient()
    }
    if (process.env.NEXT_PUBLIC_API_TEST_TOKEN) {
      return await supabase.auth.getUser(process.env.NEXT_PUBLIC_API_TEST_TOKEN!)
    }
    return await supabase.auth.getUser()
  } else {
    if (!supabase) {
      supabase = await createClientServer(cookieStore!)
    }
    if (process.env.NEXT_PUBLIC_API_TEST_TOKEN) {
      return await supabase.auth.getUser(process.env.NEXT_PUBLIC_API_TEST_TOKEN!)
    }
    return await supabase.auth.getUser()
  }
}