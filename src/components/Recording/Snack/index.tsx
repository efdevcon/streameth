interface RecordingSnackProps {
  name?: string
  index: number
  isActive: boolean
  onRecordingClick: (recordingIndex: number) => void
}

export default function RecordingSnack({ name, onRecordingClick, index, isActive }: RecordingSnackProps) {
   console.log(name, index)
  return (
    <div onClick={() => onRecordingClick(index)} className={`recording__snack ${isActive ? 'active' : ''}`}>
      <i className="bi bi-play recording__snack__play"></i>
      <div className="recording__snack__title">{name}</div>
    </div>
  )
}
