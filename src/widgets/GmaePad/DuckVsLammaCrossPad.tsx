'use client'

import { CrossPadContainer } from "@/src/features/cross-pad/ui/CrossPadContainer"

const DuckVsLammaCrossPad = () => {
  return (
    <div>
      <CrossPadContainer onPress={(direction) => console.log("press", direction)} />
    </div>
  )
}

export default DuckVsLammaCrossPad