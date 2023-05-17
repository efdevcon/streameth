import { ReactNode } from 'react'
import styles from './Container.module.scss'

interface Props {
  children: ReactNode
}

export default function Container({ children }: Props) {
  return <div className={styles.container}>{children}</div>
}

export function SessionContainer({ children }: Props) {
  return <div className={styles.container__session}>{children}</div>
}

export function PageContainer({ children }: Props) {
  return <div className="relative h-[calc(100vh-10rem)] px-4 lg:px-8 overflow-scroll">{children}</div>
}

export function StageContainer({ children }: Props) {
  return <div className="relative h-[calc(100vh-10rem)] overflow-scroll">{children}</div>
}
