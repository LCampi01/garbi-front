
export class TimestampUtil {

  static convertToDateAndHour(timestamp) {
    const date = new Date(timestamp);

    const formattedDate = date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
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
}