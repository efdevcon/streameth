import React, { ReactNode } from 'react'
import Navbar from 'components/Navbar'

type Props = {
  children: ReactNode
}

export default function DefaultLayout(props: Props) {
  return (
    <div>
      <div>
        <Navbar />
        <main>{props.children}</main>
      </div>
    </div>
  )
}
