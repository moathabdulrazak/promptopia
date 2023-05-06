'use client'
import Link from 'next/link'
import Image from "next/image"
import { useState, useEffect } from "react"
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {

  const {data: session} = useSession()

  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  }, [])
  return (
    <nav className="flex-between w-full mb-16 pt-3" >
        <Link className="flex gap-2 flex-center"  href={'/'} >
          <Image src="/assets/images/logo.svg"
          alt="Promptopia logo" 
          width={40}
          height={40}
          className="object-contain"/>
          <p className="logo_text" > Promptopia</p>
        </Link>

        {/* desktop navigation */}
        <div className="sm:flex hidden" >
          {session?.user ? (
          <div className="flex gap-3 md:gap-5" >
            <Link className="black_btn" href={'/create-prompt'} >
            Create Post
            </Link>
            <button type="button" onClick={signOut}  className="outline_btn"  >
              Sign out
            </button>
            <Link href={'/profile'} >
              <Image
              src='/assets/images/logo.svg'
              alt="profile"
              width={37}
              height={37}
              className="rounded-full"
              />

            </Link>
          </div>
          ) : (
            <>
             {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
            </>
          ) }
        </div>

         {/* mobile navigation */}
         <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
                  src='/assets/images/logo.svg'
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav