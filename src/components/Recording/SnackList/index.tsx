import { Recording } from 'types'
import RecordingSnack from '../Snack'

interface RecordingSnackListProps {
  recordings: Recording[]
  showRecordings: boolean
  currentRecordingIndex: number
  onRecordingClick: (recordingIndex: number) => void
}

export default function RecordingSnackList({
  recordings,
  showRecordings,
  onRecordingClick,
  currentRecordingIndex,
}: RecordingSnackListProps) {
  if (!showRecordings) {
    return null
  }
  return (
    <div className="recording__snack-list">
      <div className="recording__snack-list__title">Recordings</div>
      <div className="recording__snacks">
        {recordings.map((recording, idx) => {
          return (
            <RecordingSnack
              key={recording.recordingUrl}
              name={recording.name}
              index={idx}
              onRecordingClick={onRecordingClick}
              isActive={idx === currentRecordingIndex}
            />
          )
        })}
      </div>
    </div>
  )
}
