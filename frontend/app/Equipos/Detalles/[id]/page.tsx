'use client'

import DetallesEquipo from '@/app/components/Equipos/DetallesEquipo'
import { useParams } from 'next/navigation'

// With ID as a parameter, get the team details
export default function page() {
  const { id } = useParams()
  const validId = typeof id === 'string' ? id : undefined
  return (
    <div className='relative overflow-x-auto mt-[80px]'>
      <DetallesEquipo id={validId} />
    </div>
  )
}
