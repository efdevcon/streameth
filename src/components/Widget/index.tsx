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
  event: Event
  allEvents: Event[]
}

export default function Widget({ event, allEvents }: WidgetProps) {
  const { currentStream, streamsLoading, mediaUrl, changeStream } = useStreams(event)
  return (
    <div className="widget">
      <div className="widget__area__header">
        <WidgetHeader />
      </div>
      <div className="widget__area__event-switcher">
        <EventSwitcher events={allEvents} />
      </div>
      <div className="widget__area__player-header">
        <PlayerHeader title={event.name} />
      </div>
      <div className="widget__area__player-status">
        <PlayerStatus isActive={currentStream?.isActive} startDate={event.start} />
      </div>
      {/* Span player across both columns if schedule is empty, There might be a better way to do this. */}
      <div className={`widget__area__player ${event.schedule.sessions.length === 0 ? 'widget__area--span-full' : ''}`}>
        <Player src={mediaUrl()} poster={event.poster} isLoading={streamsLoading} onStreamError={changeStream} />
      </div>
      <div className="widget__area__schedule">
        <Schedule sessions={event.schedule.sessions} />
      </div>
      <div className="widget__area__event-info-box">
        <EventInfoBox event={event} />
      </div>
    </div>
  )
}
