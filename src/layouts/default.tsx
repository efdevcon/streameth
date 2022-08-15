import React, { ReactNode } from 'react'
import Navbar from 'components/Navbar'

type Props = {
  children: ReactNode
}

export default function DefaultLayout(props: Props) {
  return (
    <div className={'css.container'}>
      <div className={'css.inner'}>
        <Navbar />
        <main>{props.children}</main>
      </div>
    </div>
  )
}
