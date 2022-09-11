import moment from "moment"

export const startOfDay = (d: moment.Moment | number): number => {
  if (typeof d === "number") {
    return moment(d).startOf('day').valueOf()
  }

  return d.startOf('day').valueOf()
}

export const currentTimeInUTC = () => {
  return moment().utc()
}