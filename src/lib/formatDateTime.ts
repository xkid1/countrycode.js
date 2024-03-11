interface DateTimeFormatOptions {
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  timeZoneName?: 'short' | 'long';
  dateStyle?: 'full' | 'long' | 'medium' | 'short';
  timeStyle?: 'full' | 'long' | 'medium' | 'short';
  timeZone?: string;
}

class FormatDateTime {
  private date: Date;

  constructor() {
    this.date = new Date();
  }

  /**
   * Local time
   * @param timeZoneIdentifier
   * @returns {string}  local time
   */

  localTime(timeZoneIdentifier: string): string {
    if (timeZoneIdentifier) {
      const options: DateTimeFormatOptions = {
        timeZone: timeZoneIdentifier,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
      return new Intl.DateTimeFormat(undefined, options).format(this.date);
    }

    throw new Error('Time Zone Identifier is required');
  }

  /**
   * Local date
   * @param timeZoneIdentifier
   * @param format mm/dd/yyyy
   * @returns {string} local date
   */

  localDate(
    timeZoneIdentifier: string,
    format: string | undefined | null = null
  ): string {
    if (timeZoneIdentifier) {
      const options: DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: timeZoneIdentifier,
        timeZoneName: 'short',
      };

      if (format) {
        /**
         * Todo formating
         */
      }

      return new Intl.DateTimeFormat(undefined, options).format(this.date);
    }

    throw new Error('Time Zone Identifier is required');
  }

  format() {
    //
  }
}

export default FormatDateTime;
