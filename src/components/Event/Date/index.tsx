import moment from 'moment'

interface EventDateProps {
  startDate: string
  endDate: string
  startTime: string
  endTime?: string
}

const formattedDate = (startDate: string, endDate: string) => {
  const dateFormat = 'MMM D'

  let str = moment(startDate).format(dateFormat)

  if (endDate !== startDate) {
    str += ` - ${moment(endDate).format(dateFormat)}`
  }

  str += ' —'

  return str
}

const formattedTime = (startTime: string, endTime?: string) => {
  const momentStartTime = moment.utc(startTime)
  const timeFormat = 'HH:mm'

  let str = momentStartTime.format(timeFormat)

  if (endTime) {
    str += ` - ${moment.utc(endTime).format(timeFormat)}`
  }

  str += ` ${momentStartTime.format('z')}`

  return str
}

export default function EventDate({ startDate, endDate, startTime, endTime }: EventDateProps) {
  return (
    <div className="event__date">
      {formattedDate(startDate, endDate)}
      <br />
      <span className="event__date__time">{formattedTime(startTime, endTime)}</span>
    </div>
  )
}
