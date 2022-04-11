interface PlayerStatusProps {
  isActive: boolean
}

export default function PlayerStatus({ isActive }: PlayerStatusProps) {
  return (
    <div className="player__stream-status">
      <div className="player__live">
        {isActive && (
          <>
            <div className="player__live__dot"></div>
            <div className="player__live__description">Streaming live</div>
          </>
        )}
      </div>
      <div className="player__date">
        APR 18 -
        <br />
        <span>16:35 CET</span>
      </div>
    </div>
  )
}
