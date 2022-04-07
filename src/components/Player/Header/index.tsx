interface PlayerHeaderProps {
  title: string
}

export default function PlayerHeader({ title }: PlayerHeaderProps) {
  return (
    <div className="player__header">
      <p className="player__header__title bold">{title}</p>
    </div>
  )
}
