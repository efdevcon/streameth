import { Moment } from 'moment'
import moment from 'moment-timezone'
import config from '../../config/streameth.json'

export const startOfDay = (d: moment.Moment | number): number => {
  if (typeof d === "number") {
    return moment(d).startOf('day').valueOf()
  }

  return d.startOf('day').valueOf()
}

export const currentTimeInUTC = () => {
  return moment().tz(config.timezone).add(2, 'hours') // TODO: Fix properly based on user
}

export const localizedMoment = (value: number): Moment => {
  return moment(value).tz(config.timezone).subtract(2, 'hours') // TODO: Fix properly based on user
}