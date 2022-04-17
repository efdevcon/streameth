import PlausibleProvider from 'next-plausible'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function EmbedLayout(props: Props) {
  return <PlausibleProvider domain='streameth.tv' trackOutboundLinks>
    <div>{props.children}</div>
  </PlausibleProvider>
}
