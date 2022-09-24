import Image from 'next/image'

interface Props {
  src: string
}

export default function PlayerPosterImage({ src }: Props) {
  return <Image src={src} alt="text" layout="fill" objectFit="cover" />
}
