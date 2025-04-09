'use client'

import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import Image from "next/image"
import { useUser } from "@/src/shared/api/use-user"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { useFocusStore } from "@/src/shared/model/focus.store"
import { signinAction } from "@/src/shared/api/actions/signin-action"
import { signoutAction } from "@/src/shared/api/actions/signout-action"

export const signInTooltipId = 'sign-in-tooltip'

const ProfileButton = () => {
  const { isFocused } = useFocusStore()

  const { user } = useUser()

  if (!user) {
    return (
      <TooltipProvider>
        <Tooltip open={isFocused(signInTooltipId)}>
          <TooltipTrigger asChild>
            <form action={signinAction}>
              <Button variant="ghost" size="icon" className='hover:bg-gray-100' type="submit">
                <User className="h-5 w-5" />
              </Button>
            </form>
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
      <Tooltip >
        <TooltipTrigger asChild>
          <form action={signoutAction}>
            <Button variant="ghost" size="icon" className='hover:bg-gray-100' type="submit">
              <Image src={user.user_metadata.avatar_url} alt="profile" width={32} height={32} className="rounded-full" />
            </Button>
          </form>
        </TooltipTrigger>
        <TooltipContent>
          <p>Sign out</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ProfileButton