import moment from 'moment'

interface PlayerStatusProps {
  isActive: boolean
  startDate: string
}

export default function PlayerStatus({ isActive, startDate }: PlayerStatusProps) {
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
      <div className="player__date">{moment.utc(startDate).format('MMM DD')}</div>
    </div>
  )
}
