import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Container from 'components/Container'
import { useRouter } from 'next/router'
import { TITLE } from 'utils/constants'
import img from 'assets/images/logo.png'
import { page } from 'types'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({ pages }: { pages: page[] }) {
  const router = useRouter()
  const path = router.asPath
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const extendedPages: page[] = [...pages, { name: 'Archive', href: '/archive' }]

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 py-2">
      <Container>
        <div className="flex justify-between py-2">
          <div className="flex items-center">
            <Link href="/">
              <a className="relative w-28 h-12 lg:w-40 lg:h-12">
                <Image src={img} alt={TITLE} layout="fill" objectFit="contain" />
              </a>
            </Link>
          </div>
          <div className="flex-1 flex items-center space-x-2 justify-end">
            <div className="hidden md:flex">
              {extendedPages.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a className={'px-2 py-1  text-gray-500'} aria-current={item.href === path ? 'page' : undefined}>
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex"></div>
          <button
            className="md:hidden border-2 border-black p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
            aria-expanded={isMenuOpen}>
            Menu
          </button>
        </div>
        <div className={classNames('md:hidden', isMenuOpen ? 'block' : 'hidden')}>
          <ul className="border-t border-gray-200 py-3">
            {pages.map((item) => (
              <li key={item.name} className="py-2">
                <Link href={item.href}>
                  <a className={classNames('block px-4 py-2 text-gray-500', item.href === path ? 'bg-gray-200' : '')}>{item.name}</a>
                </Link>
              </li>
            ))}
            <li>
              {/* <div className="border-2 border-black p-2 my-2">Sign in with Ethereum</div> */}
              {/* <ConnectButton
                accountStatus={{
                  smallScreen: 'full',
                  largeScreen: 'full',
                }}
                chainStatus="none"
              /> */}
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  )
}
