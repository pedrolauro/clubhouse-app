import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils'
import format from 'date-fns/format'

export default class extends DateFnsUtils {
  getDatePickerHeaderText(date) {
    const ret = format(date, 'ddd[,] D [de] MMM', { locale: this.locale })
    return ret.charAt(0).toUpperCase() + ret.slice(1)
  }
  getCalendarHeaderText(date) {
    return format(date, 'MMMM [de] YYYY', { locale: this.locale })
  }
  /* eslint-disable class-methods-use-this */
  getWeekdays() {
    return ['S', 'T', 'Q', 'Q', 'S', 'S', 'D']
  }
  getDateTimePickerHeaderText(date) {
    return format(date, 'D [de] MMM', { locale: this.locale });
  }
}
