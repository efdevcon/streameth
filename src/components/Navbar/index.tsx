import Link from 'next/link'
import Image from 'next/image'
import DarkModeToggle from 'components/DarkMode/Toggle'
import Container from 'components/Container'
import { useRouter } from 'next/router'
import { TITLE } from 'utils/constants'
import img from 'assets/images/logo.png'
import {page} from 'types'



function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({ pages }: { pages: page[] }) {
  const router = useRouter()
  const path = router.asPath


  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <Container>
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <Link href="/">
              <a className="relative w-24 h-8 lg:w-40 lg:h-12">
                <Image src={img} alt={TITLE} layout="fill" objectFit="contain" />
              </a>
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-start space-x-2">
            {/* {pages.map((item) => (
              <Link key={item.name} href={item.href}>
                <a
                  className={classNames(
                    item.href === path ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-300',
                    'px-2 py-1 text-xs font-medium'
                  )}
                  aria-current={item.href === path ? 'page' : undefined}>
                  {item.name}
                </a>
              </Link>
            ))} */}
          </div>
          <div className="flex items-center space-x-2">{/* <DarkModeToggle /> */}</div>
        </div>
      </Container>
    </nav>
  )
}
