import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function EmbedLayout(props: Props) {
  return <div>{props.children}</div>
}
