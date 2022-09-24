import { DEFAULT_POSTER_IMAGE } from 'utils/constants'
import styles from './PlayerPosterImage.module.scss'

interface Props {
  src: string
}

export default function PlayerPosterImage({ src }: Props) {
  // TODO: Use next/image instead?
  return <img src={DEFAULT_POSTER_IMAGE} alt="text" />
  // return <div className={styles.image} style={{ backgroundImage: `url(${src})` }}></div>
}
