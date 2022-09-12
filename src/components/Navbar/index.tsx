import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import Image from 'next/image'
import css from './Navbar.module.scss'
import img from 'assets/images/logo.png'
import Container from 'components/Container'
import { useRouter } from 'next/router'

const pages = [
  { name: 'Schedule', href: '/schedule' },
  // { name: 'Archive', href: '/archive' }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const router = useRouter()
  const path = router.asPath

  return (
    <Disclosure as="nav" className={css.navbar}>
      {({ open }) => (
        <>
          <Container>
            <div className={css.navbar__inner}>
              <div className={css.navbar__hamburger}>
                <Disclosure.Button className={css.navbar__hamburger__button}>
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className={css.navbar__hamburger__button__icon} aria-hidden="true" />
                  ) : (
                    <MenuIcon className={css.navbar__hamburger__button__icon} aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className={css.navbar__nav}>
                <div className={css.navbar__logo}>
                  <Link href="/">
                    <a>
                      <Image src={img} alt="StreamETH" />
                    </a>
                  </Link>
                </div>
                <div className={css.navbar__nav__items}>
                  <div className="flex space-x-4">
                    {pages.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(item.href === path ? css.active : '', css.navbar__nav__item)}
                        aria-current={item.href === path ? 'page' : undefined}>
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <Disclosure.Panel className={css.navbar__mobileMenu}>
            <div className={css.navbar__mobileMenu__items}>
              {pages.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(item.href === path ? css.active : '', css.navbar__mobileMenu__item)}
                  aria-current={item.href === path ? 'page' : undefined}>
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
