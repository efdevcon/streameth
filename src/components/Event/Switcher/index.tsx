interface EventSwitcherProps {
  eventNames: string[]
  activeEventName: string
  onEventSwitch: (eventName: string) => void
}

export default function EventSwitcher({ eventNames, activeEventName, onEventSwitch }: EventSwitcherProps) {
  return (
    <div className="event__switcher">
      <div className="event__switcher__title">Select event stream</div>
      <div className="event__switcher__scroll">
        <ul className="event__switcher__events">
          {eventNames.map(name => {
            return (
              <li
                key={name}
                onClick={() => onEventSwitch(name)}
                className={`event__switcher__events__event ${activeEventName === name ? 'active' : ''}`}
              >
                {name}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
