
export class TimestampUtil {

  static convertToDateAndHour(timestamp, showYear = true) {
    const date = new Date(timestamp);

    date.setHours(date.getHours() + 3) //to transform to Argentina time

    const formattedDate = date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: showYear ? '2-digit' : undefined
    });

    const formattedTime = date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }) + ' hs';

    return {
      date: formattedDate,
      time: formattedTime
    }
  }

  static formatMinutes = (minutes) => {
    console.log('🚀 ~ TimestampUtil ~ minutes:', minutes)
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    if (hours > 0 && remainingMinutes !== 0) {
      return `${hours.toFixed(0)} hr ${remainingMinutes.toFixed(0)} min`;
    } else if (hours > 0 && remainingMinutes === 0) {
      return `${hours.toFixed(0)} hr`;
    } else {
      return `${remainingMinutes.toFixed(0)} min`;
    }
  }

  static convertToDateForFilter(date) {
    return date.toLocaleString('en-CA', { 
      timeZone: 'America/Argentina/Buenos_Aires', 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    })
  }

  static getDuration(finishedTimestamp, startedTimestamp) {
    const finished = new Date(finishedTimestamp)
    const started = new Date(startedTimestamp)
  
    const duration = finished - started
    return duration
  }
}