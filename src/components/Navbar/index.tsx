import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Container from 'components/Container'
import { useRouter } from 'next/router'
import { TITLE } from 'utils/constants'
import img from 'assets/images/logo.png'
import { page } from 'types'
import githubLogo from 'assets/images/github-mark.png'
import { ConnectButton } from '@rainbow-me/rainbowkit'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({ pages }: { pages: page[] }) {
  const router = useRouter()
  const path = router.asPath
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
              <a href="https://github.com/efdevcon/streameth/tree/zuzalu">
                <Image src={githubLogo} alt="streamETH Repo" width={24} height={24} objectFit='contain'/>
              </a>
            </div>
          </div>
          <div className="hidden md:flex">
          </div>
        </div>
      </Container>
    </nav>
  )
}
