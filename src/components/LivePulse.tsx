import css from './components.module.scss'

interface Props {
  style?: any
  className?: string
}

export const LivePulse = (props: Props) => {
  let className = `${css.live}`
  if (props.className) className += ` ${props.className}`

  return <div className={className} style={props.style}>
    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 16 16">
      <g fill="#fd1f1f" className={css["nc-icon-wrapper"]}>
        <g className={css["nc-loop-ripple-16-icon-f"]}>
          <circle cx="8" cy="8" fill="#fd1f1f" r="8"></circle>
          <circle data-color="color-2" cx="8" cy="8" r="8"></circle>
        </g>
      </g>
    </svg>
  </div>
}
