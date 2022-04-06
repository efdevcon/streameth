interface EventSwitcherProps {
  eventNames: string[]
  activeEventName: string
  onEventSwitch: (eventName: string) => void
}

export default function EventSwitcher({ eventNames, activeEventName, onEventSwitch }: EventSwitcherProps) {
  return (
    <div className="event-switcher">
      <div className="event-switcher__title">Select event stream</div>
      <ul className="event-switcher__events">
        {eventNames.map(name => {
          return (
            <li
              key={name}
              onClick={() => onEventSwitch(name)}
              className={`event-switcher__events__event ${activeEventName === name ? 'active' : ''}`}
            >
              {name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
