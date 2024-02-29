import { OrganizationSwitcher, SignOutButton, SignedIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Topbar = () => {
  return (
    <nav className='topbar text-white'>
      <Link href="/" className='flex gap-4 items-center cursor-pointer'>
        <Image src="/assets/logo.svg" alt='logo' width={28} height={28}/>
        <h1 className='max-xs:hidden font-semibold'>Threads</h1>
      </Link>

      {/* <div className="flex gap-4 items-center">
        <SignedIn>
          <div className='block md:hidden'>
            <SignOutButton>
              <div className="flex">
                <Image src="/assets/logout.svg" alt='logout' height={20} width={20} />
              </div>
            </SignOutButton>
          </div>
          
          <OrganizationSwitcher
          appearance={{
            baseTheme: dark
          }}
          />
        </SignedIn>
      </div> */}
      
    </nav>
  )
}

export default Topbar