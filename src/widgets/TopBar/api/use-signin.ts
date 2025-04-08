

import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/client"

export const signin = async () => {

  const supabase = createClient()

  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    }
  })
}

export const useSignin = () => {
  const { data, error } = useQuery({
    queryKey: ['signin'],
    queryFn: signin,
  })

  return { data, error }
}