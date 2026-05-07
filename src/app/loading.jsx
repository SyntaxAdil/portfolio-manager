import { Loader2 } from 'lucide-react'
import React from 'react'

const MainLoading = () => {
  return (
    <section className='flex items-center justify-center min-h-[80dvh]' >
        <Loader2 className='animate-spin text-primary' size={40}   />

    </section>
  )
}

export default MainLoading