import React, { ReactNode } from 'react'
import Navbar from 'components/Navbar'
import styles from './defaultLayout.module.scss'
import { page } from 'types'
type Props = {
  children: ReactNode
  pages: page[]
}

export default function DefaultLayout(props: Props) {
  return (
    <div>
      <div className={styles.default_layout}>
        <Navbar pages={props.pages} />
        <main>{props.children}</main>
      </div>
    </div>
  )
}
