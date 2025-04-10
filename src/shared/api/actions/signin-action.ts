'use server'

import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const signinAction = async () => {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
    }
  })

  if (error) {
    console.error(error)
  }

  if (data.url) {
    redirect(data.url)
  }
}