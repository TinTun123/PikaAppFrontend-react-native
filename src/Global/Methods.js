import moment from 'moment';


export const handleChange = (field, value, setData) => {
  setData(pre => ({ ...pre, [field]: value }))
}



export const formatVideoDuration = (inputSeconds, humanReadable = false) => {

  if (!inputSeconds) {
    return (humanReadable ? '0h 0m' : '00:00');
  }

  const duration = moment.duration(inputSeconds, 'seconds');
  const hours = duration.hours() < 10 ? '0' + duration.hours() : duration.hours();
  const minutes = duration.minutes() < 10 ? '0' + duration.minutes() : duration.minutes();
  const seconds = duration.seconds() < 10 ? '0' + duration.seconds() : duration.seconds();

  if (duration.hours() == 0) {
    return (humanReadable ? `${duration.minutes()}m` : `${minutes}:${seconds}`);
  }

  return (humanReadable ? `${parseInt(duration.asHours())}h ${duration.minutes()}m` : `${hours}:${minutes}:${seconds}`);
};