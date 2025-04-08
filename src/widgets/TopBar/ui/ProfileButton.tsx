'use client'

import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"
import { User } from "lucide-react"
import { redirect } from "next/navigation"
import Image from "next/image"
import { useUser } from "@/src/shared/api/use-user"
import { getQueryClient } from "@/src/app/utils/get-query-client"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { useFocusStore } from "@/src/shared/model/focus.store"

export const signInTooltipId = 'sign-in-tooltip'

const ProfileButton = () => {
  const supabase = createClient()
  const queryClient = getQueryClient()
  const { isFocused } = useFocusStore()

  const { user } = useUser()

  const handleSignin = async () => {
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

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error)
    }

    queryClient.invalidateQueries({ queryKey: ['user'] })
  }

  if (!user) {
    return (
      <TooltipProvider>
        <Tooltip open={isFocused(signInTooltipId)}>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className='hover:bg-gray-100' onClick={handleSignin}>
              <User className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sign in</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip open={isFocused(signInTooltipId)}>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className='hover:bg-gray-100' onClick={handleSignout}>
            <Image src={user.user_metadata.avatar_url} alt="profile" width={32} height={32} className="rounded-full" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Sign out</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ProfileButton