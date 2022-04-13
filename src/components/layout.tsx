import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export function DefaultLayout(props: Props) {
  return (
    <div>
      <main>{props.children}</main>
    </div>
  )
}
