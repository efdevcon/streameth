import { LivePulse } from 'components/LivePulse'
import moment from 'moment'

interface PlayerStatusProps {
  isActive?: boolean
  startDate: string
  onLiveClick: () => void
}

export default function PlayerStatus({ isActive = false, startDate, onLiveClick }: PlayerStatusProps) {
  return (
    <div className="player__stream-status">
      <div className="player__live" onClick={() => onLiveClick()}>
        {isActive && (
          <>
            <LivePulse style={{ marginRight: '5px' }} />
            <div className="player__live__description">Streaming live</div>
          </>
        )}
      </div>
      <div className="player__date">{moment.utc(startDate).format('MMM DD')}</div>
    </div>
  )
}
