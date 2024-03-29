import { Moment } from 'moment'
import moment from 'moment-timezone'
import { EVENT_TIMEZONE } from './constants'

export const startOfDay = (d: moment.Moment | number): number => {
  if (typeof d === 'number') {
    return moment(d).startOf('day').valueOf()
  }

  return d.startOf('day').valueOf()
}

export const currentTimeInUTC = () => {
  return moment() // TODO: Fix properly based on user
}

export const localizedMoment = (value?: number): Moment => {
  return moment(value).tz(EVENT_TIMEZONE, true).subtract(2, 'hours') // TODO: Fix properly based on user
}

export const getDate = (value: number): string => {
  return moment(value).format('ddd, MMM D')
}

export const datetimeToUnixTimestamp = (datetime: string): number => {
  return moment(datetime).valueOf()
}
