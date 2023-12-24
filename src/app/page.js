'use client'

import GoogleMapSection from '@/components/Home/GoogleMapSection'
import SearchSection from '@/components/Home/SearchSection'
import { DestinationContextProvder } from '@/context/DestinationContext'
import { SourceContextProvider } from '@/context/SourceContext'
import { LoadScript } from '@react-google-maps/api'

export default function Home() {
  return (
    <DestinationContextProvder>
      <SourceContextProvider>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} libraries={['places']} >

        <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-5'>
          <div className=''>
            <SearchSection />
          </div>
          <div className='col-span-2'>
            <GoogleMapSection />
          </div>
        </div>
      </LoadScript>
      </SourceContextProvider>
    </DestinationContextProvder>
  )
}
