import React, { ReactNode } from 'react'
import css from './layout.module.scss'
import Link from 'next/link'

type Props = {
  children: ReactNode
}

export default function DefaultLayout(props: Props) {
  return (
    <div className={css.container}>
      <div className={css.inner}>
        <header>
          <Link href='/' as={''}>
            <h1 className={css.title}>Stream<strong>eth</strong></h1>
          </Link>
          <Link href='https://github.com/efdevcon/tv/' passHref>
            <a target="_blank" rel="noopener noreferrer">
              <i className={`${css.icon} bi bi-github`} />
            </a>
          </Link>
        </header>

        <main>{props.children}</main>
      </div>
    </div>
  )
}
