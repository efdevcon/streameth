import { ReactNode } from 'react'
import styles from './Container.module.scss'

interface Props {
  children: ReactNode
}

export default function Container({ children }: Props) {
  return <div className={styles.container}>{children}</div>
}

export function SessionContainer({ children }: Props) {
  return <div className={styles.sessionContainer}>{children}</div>
}