import { Moment } from 'moment'
import moment from 'moment-timezone'
import { EVENT_TIMEZONE } from './constants'

export const startOfDay = (d: moment.Moment | number): number => {
  if (typeof d === "number") {
    return moment(d).startOf('day').valueOf()
  }

  return d.startOf('day').valueOf()
}

export const currentTimeInUTC = () => {
  return moment().utc()
}

export const localizedMoment = (value: number): Moment => {
  return moment(value).tz(EVENT_TIMEZONE).subtract(2, 'hours') // TODO: Fix properly based on user
}