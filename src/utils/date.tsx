export const formatDate = (
  date: string | number = '',
): FormattedDate | null => {
  try {
    let dateObj = new Date();
    if (date) {
      if (typeof date === 'string') {
        if (Date.parse(date)) {
          dateObj = new Date(date);
        } else {
          return null;
        }
      } else {
        dateObj = new Date(date);
      }
    }
    return {
      isoString: dateObj.toISOString(),
      minutes: dateObj.getMinutes(),
      hours: dateObj.getHours(),
      time: dateObj.getTime(),
    };
  } catch (err) {
    console.error('formatDateToISOString', err);
    return null;
  }
};
export interface FormattedDate {
  isoString: string;
  minutes: number;
  hours: number;
  time: number;
}
