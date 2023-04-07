import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import css from './Navbar.module.scss'
import img from 'assets/images/logo.png'
import DarkModeToggle from 'components/DarkMode/Toggle'
import Container from 'components/Container'
import { useRouter } from 'next/router'
import { TITLE } from 'utils/constants'

interface page {
  name: string
  href: string
}

const pages: page[] = []

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
                    <XMarkIcon className={css.navbar__hamburger__button__icon} aria-hidden="true" />
                  ) : (
                    <Bars3Icon className={css.navbar__hamburger__button__icon} aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className={css.navbar__nav}>
                <div className={css.navbar__logo}>
                  <Link href="/schedule">
                    <a>
                      <Image src={img} alt={TITLE} layout="fill" />
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
                  <DarkModeToggle />
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
              <div className="px-3">
                <DarkModeToggle />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
