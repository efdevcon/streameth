import { Event } from 'types'
import EventSwitcher from 'components/Event/Switcher'
import EventInfoBox from 'components/Event/InfoBox'
import PlayerHeader from 'components/Player/Header'
import PlayerStatus from 'components/Player/Status'
import Player from 'components/Player'
import Schedule from 'components/Schedule'
import WidgetHeader from './Header'
import RoomSwitcher from 'components/Room/Switcher'
import RecordingSnackList from 'components/Recording/SnackList'
import useStreams from 'components/Hooks/useStreams'

interface WidgetProps {
  event: Event
  allEvents: Event[]
}

export default function Widget({ event, allEvents }: WidgetProps) {
  const { currentStream, mediaUrl, changeStream, currentRoom, changeRoom, changeRecording, currentRecordingIndex } =
    useStreams(event)
  return (
    <div className="widget">
      <div className="widget__area__header">
        <WidgetHeader />
      </div>
      <div className="widget__area__nav">
        <EventSwitcher current={event} events={allEvents} />
        <RoomSwitcher rooms={event.rooms} activeRoom={currentRoom} onRoomClick={changeRoom} />
      </div>
      <div className="widget__area__player-header">
        <PlayerHeader title={event.name} />
      </div>
      <div className="widget__area__player-status">
        <PlayerStatus
          isActive={currentStream?.isActive}
          startDate={event.start}
          onLiveClick={() => changeRecording(null)}
        />
      </div>
      {/* Span player across both columns if schedule is empty, There might be a better way to do this. */}
      <div className={`widget__area__player ${event.schedule.sessions.length === 0 ? 'widget__area--span-full' : ''}`}>
        <Player src={mediaUrl} eventName={event.name} poster={event.poster} onStreamError={changeStream} />
      </div>
      <div className="widget__area__schedule">
        <Schedule sessions={event.schedule.sessions} />
      </div>
      <div className="widget__area__recordings">
        <RecordingSnackList
          isActive={currentStream?.isActive}
          recordings={event.recordings}
          onRecordingClick={changeRecording}
          currentRecordingIndex={currentRecordingIndex}
          onLiveClick={() => changeRecording(null)}
        />
      </div>
      <div className="widget__area__event-info-box">
        <EventInfoBox event={event} />
      </div>
    </div>
  )
}
