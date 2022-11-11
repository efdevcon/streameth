import React from 'react'
import { Session, Speaker } from 'types'
import defaultAvatar from 'assets/images/default-avatar.png'
import Image from 'next/image'
import Calendar from 'assets/images/calendar.svg'
import Camera from 'assets/images/camera.svg'
import { localizedMoment } from 'utils/dateTime'

export function DateDetail({ start, end }: { start: Session['start']; end: Session['end'] }) {
  return (
    <div className="flex items-center">
      <Calendar />
      <div className="ml-2 text-gray-500 text-base">
        {localizedMoment(start).format('MMM DD / HH:mm')} - {localizedMoment(end).format('HH:mm')}
      </div>
    </div>
  )
}

export function UserAvatar({ avatarUrl }: { avatarUrl: Speaker['avatarUrl'] }) {
  return (
    <div className="w-12 h-12 rounded-full object-cover overflow-clip mr-5">
      <Image src={avatarUrl ?? defaultAvatar} alt="avatar" width={100} height={100} />
    </div>
  )
}

export function StageDetail({ stage }: { stage: Session["stage"] }) {
  return (
    <div className="flex items-center">
      <Camera />
      <div className="ml-2 text-gray-500 text-base">
        {stage}</div>
    </div>
  )

}



