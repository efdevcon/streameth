import React from 'react'
import moment from 'moment'
import Image from 'next/image'
import Clock from 'assets/images/clock.svg'
interface Props {
  start: number
  location: string
}
export default function SessionDetails(props: Props) {
  return (
    <div className="flex flex-col mt-5 italic">
      <div className="flex flex-row">
        {/* <Image src={Clock} width={20} height={20} /> */}
        {moment(props.start).format('MMM DD / HH:mm')}
      </div>
      <div className="flex flex-row">{props.location}</div>
    </div>
  )
}
