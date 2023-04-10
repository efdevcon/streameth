import Link from 'next/link'
import Image from 'next/image'
import DarkModeToggle from 'components/DarkMode/Toggle'
import Container from 'components/Container'
import { useRouter } from 'next/router'
import { TITLE } from 'utils/constants'
import img from 'assets/images/logo.png'

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
    <nav className="bg-white border-b-2 border-opacity-1 border-gray-300">
      <Container>
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <Link href="/">
              <a className="relative w-32 h-12 lg:w-56 lg:h-16">
                <Image src={img} alt={TITLE} layout="fill" objectFit="contain" />
              </a>
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-start">
            <div>
              {pages.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(item.href === path ? 'text-gray-900' : 'text-gray-500', 'px-3 py-2 font-medium text-sm')}
                  aria-current={item.href === path ? 'page' : undefined}>
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-2 hidden md:block">Powered by</span>
            <a className="relative w-32 lg:w-40 h-6" href="https://streameth.org" target="_blank" rel="noreferrer">
              <Image src="/streameth.png" alt="streamETH" layout="fill" objectFit="contain" />
            </a>
            {/* <DarkModeToggle /> */}
          </div>
        </div>
      </Container>
    </nav>
  )
}
