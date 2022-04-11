import { Event } from 'types'
import EventSwitcher from 'components/Event/Switcher'
import EventInfoBox from 'components/Event/InfoBox'
import PlayerHeader from 'components/Player/Header'
import PlayerStatus from 'components/Player/Status'
import Player from 'components/Player'
import Schedule from 'components/Schedule'
import WidgetHeader from './Header'
import useStreams from 'components/Hooks/useStreams'

interface WidgetProps {
  initialEvent: Event
  allEvents: Event[]
}

export default function Widget({ initialEvent, allEvents }: WidgetProps) {
  const { streams, streamsLoading, eventNames, currentEvent, changeEvent } = useStreams(initialEvent, allEvents)
  return (
    <div className="widget">
      <WidgetHeader />
      <div className="widget__event-switcher">
        <EventSwitcher eventNames={eventNames()} activeEventName={currentEvent.name} onEventSwitch={changeEvent} />
      </div>
      <div className="widget__player-header">
        <PlayerHeader title={currentEvent.name} />
      </div>
      <div className="widget__player-status">
        <PlayerStatus />
      </div>
      <div className="widget__player">
        <Player streams={streams} poster={currentEvent.poster} isLoading={streamsLoading} />
      </div>
      <div className="widget__schedule">
        <Schedule sessions={currentEvent.schedule.sessions} />
      </div>

      <div className="widget__event-info-box">
        <EventInfoBox event={currentEvent} />
      </div>
    </div>
  )
}
