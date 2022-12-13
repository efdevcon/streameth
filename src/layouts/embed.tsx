import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function EmbedLayout(props: Props) {
  return <div className='h-screen'>{props.children}</div>
}
