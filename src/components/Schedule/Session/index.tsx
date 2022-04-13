import moment from 'moment'
import { Session, Speaker } from 'types'
import IconClock from 'assets/icons/icon_clock.svg'
import IconVoiceRecord from 'assets/icons/voice_record.svg'

interface ScheduleSessionProps {
  session: Session
}

const formattedDate = (date: string) => {
  return moment.utc(date).format('MMM DD - HH:mm A')
}

const speakersList = (speakers: Speaker[]) => {
  return speakers?.map(speaker => speaker.name).join(', ')
}

export default function ScheduleSession({ session }: ScheduleSessionProps) {
  return (
    <div className="schedule__session">
      <span className="schedule__session__name">{session.name}</span>
      <table className="schedule__session__info">
        <tbody>
          <tr>
            <td>
              <i>
                <IconClock stroke="#B7B7B7" />
              </i>
            </td>
            <td>
              <span className="schedule__session__date">{formattedDate(session.start)}</span>
            </td>
          </tr>
          {session.speakers &&
            <tr>
              <td>
                <i style={{ color: '#B7B7B7' }}>
                  <IconVoiceRecord />
                </i>
              </td>
              <td>
                <span className="schedule__session__speakers">{speakersList(session.speakers)}</span>
              </td>
            </tr>}
        </tbody>
      </table>
    </div>
  )
}
