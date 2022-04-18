import React, { ReactNode } from 'react'
import css from './layout.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import img from 'assets/images/logo.png'

type Props = {
  children: ReactNode
}

export default function DefaultLayout(props: Props) {
  return (
    <div className={css.container}>
      <div className={css.inner}>
        <header>
          <div className={css.logo}>
            <Link href='/' as={''}>
              <Image src={img.src} alt='StreamETH' height={22} width={190} />
            </Link>
          </div>
          <div className={css.icons}>
            <Link href='https://livepeer.org/' passHref>
              <a target="_blank" rel="noopener noreferrer">
                <Image src="/livepeer_logo_dark.png" alt='Livepeer' height={24} width={70} />
              </a>
            </Link>
            <Link href='https://github.com/efdevcon/tv/' passHref>
              <a target="_blank" rel="noopener noreferrer">
                <i className={`${css.icon} bi bi-github`} />
              </a>
            </Link>
          </div>
        </header>

        <main>{props.children}</main>
      </div>
    </div>
  )
}
