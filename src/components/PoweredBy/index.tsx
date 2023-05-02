import React from 'react'
import Image from 'next/image'

export default function PoweredBy() {
  return (
    <>
      <span className="text-gray-600 dark:text-gray-300 text-xs hidden md:block">Powered by</span>
      <a className="relative w-24 lg:w-32 h-4" href="https://streameth.org" target="_blank" rel="noreferrer">
        <Image src="/streameth.png" alt="streamETH" layout="fill" objectFit="contain" />
      </a>
    </>
  )
}
