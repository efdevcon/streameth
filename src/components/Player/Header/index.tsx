interface PlayerHeaderProps {
  eventName: string
}

export default function PlayerHeader({ eventName }: PlayerHeaderProps) {
  return (
    <div className="player__header">
      <p className="player__header__title bold">{eventName}</p>
      {/* <img src="/livepeer_logo_dark.png" /> */}
    </div>
  )
}
