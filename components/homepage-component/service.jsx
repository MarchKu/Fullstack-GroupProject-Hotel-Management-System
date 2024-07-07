import React from 'react'
import Image from 'next/image'
import spa from '../../asset/service/spa.svg'
import sauna from '../../asset/service/sauna.svg'
import fitness from '../../asset/service/fitness.svg'
import lounge from '../../asset/service/lounge.svg'
import wifi from '../../asset/service/wifi.svg'
import parking from '../../asset/service/parking.svg'
import operation from '../../asset/service/operation.svg'

const Service = () => {
  return (
    <section className='w-full h-[50vh] px-[10%] py-[6%] bg-green-700 justify-between items-start text-center text-white'>
    <div className='w-full h-[60%] font-heading text-[7rem]'>
      Service & Facilities
    </div>
    <div className='w-full h-[40%] font-body flex flex-row justify-between text-[1.5rem]'>
      <div className='h-full w-1/7'>
        <Image src={spa} className='h-[70%] w-full'/>
        <p className='h-[30%] w-full'>Spa</p>  
      </div>
      <div className='h-full w-1/7'>
        <Image src={sauna} className='h-[70%] w-full'/>
        <p className='h-[30%] w-full'>Sauna</p>
      </div>
      <div className='h-full w-1/7'>
        <Image src={fitness} className='h-[70%] w-full'/>
        <p className='h-[30%] w-full'>Fitness</p>
      </div>
      <div className='h-full w-1/7'>
        <Image src={lounge} className='h-[70%] w-full'/>
        <p className='h-[30%] w-full'>Arrival Lougn</p>
      </div>
      <div className='h-full w-1/7'>
        <Image src={wifi} className='h-[70%] w-full'/>
        <p className='h-[30%] w-full'>Free Wifi</p>
      </div>
      <div className='h-full w-1/7'>
        <Image src={parking} className='h-[70%] w-full'/>
        <p className='h-[30%] w-full'>Parking</p>
      </div>
      <div className='h-full w-1/7'>
        <Image src={operation} className='h-[70%] w-full'/>
        <p className='h-[30%] w-full'>24 hours operation</p>
      </div>
    </div>
    
    </section>
    
  )
}

export default Service
