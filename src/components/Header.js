'use client'

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import { DestinationContext } from '@/context/DestinationContext';
import { useRouter } from 'next/navigation'

const heraderMenu = [
    {
        id: 1,
        name: 'Ride'
    },
    {
        id: 2,
        name: 'Packege'
    },
]
const Header = () => {
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.push('/sign-in')
        }, 2000)
    },[])
    // const { routeData } = useContext(DestinationContext)
    // {JSON.stringify(routeData)}

    // console.log(routeData)

    return (
        <div className='p-4 pb-3 pl-10 border-b-4 shadow-sm border-gray-200 flex justify-between items-center'>
            <div className='flex items-center gap-24'>
                <Image src='/images/uber-logo.jpg' width={80} height={70} alt='logo' />

                <div className='flex gap-6 items-center'>
                    {
                        heraderMenu.map((item) => (
                            <h2 className='text-sm font-medium' key={item.id}>
                                {item.name}
                            </h2>
                        ))
                    }
                </div>
            </div>
            <div>
                {
                    true ? <UserButton /> : <Link href='/sign-in'>Sign In</Link>
                }
            </div>
        </div>
    )
}
export default Header;