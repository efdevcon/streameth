import { Moment } from 'moment'
import moment from 'moment-timezone'
import { EVENT_TIMEZONE } from './constants'

export const startOfDay = (d: moment.Moment | number): number => {
  if (typeof d === 'number') {
    return moment(d, EVENT_TIMEZONE).startOf('day').valueOf()
  }

  return d.startOf('day').valueOf()
}

export const currentTimeInUTC = () => {
  return moment(EVENT_TIMEZONE) // TODO: Fix properly based on user
}

export const localizedMoment = (value?: number): Moment => {
  return moment(value, EVENT_TIMEZONE) // TODO: Fix properly based on user
}

export const getDate = (value: number): string => {
  return moment(value, EVENT_TIMEZONE).format('ddd, MMM D')
}

export const datetimeToUnixTimestamp = (datetime: string): number => {
  return moment(datetime, EVENT_TIMEZONE).valueOf()
}
