import css from './tags.module.scss'

interface Props {
  tags: string[]
  className?: string
}

export function Tags(props: Props) {
  let className = `${css.container}`
  if (props.className) className += ` ${props.className}`

  return (
    <ul className={className}>
      {props.tags.map((i) => {
        return <li key={i}>{i}</li>
      })}
    </ul>
  )
}
