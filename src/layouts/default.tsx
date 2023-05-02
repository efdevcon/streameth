import React, { ReactNode } from 'react'
import Navbar from 'components/Navbar'
import styles from './defaultLayout.module.scss'
type Props = {
  children: ReactNode
}

export default function DefaultLayout(props: Props) {
  return (
    <div>
      <div className={styles.default_layout}>
        <Navbar />
        <main>{props.children}</main>
      </div>
    </div>
  )
}
