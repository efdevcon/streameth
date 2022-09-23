import styles from './PlayerPosterImage.module.scss'

interface Props {
  src: string
}

export default function PlayerPosterImage({ src }: Props) {
  return <div className={styles.image} style={{ backgroundImage: `url(${src})` }}></div>
}
