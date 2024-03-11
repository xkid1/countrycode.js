import { FormatDateTime } from '../lib';
import base from '../../db/iso/tz.json';

class TimeZoneC {
  private base: Array<any> = base;
  private instanceOfFormatDateTime: FormatDateTime;
  constructor() {
    this.base = base;
    this.instanceOfFormatDateTime = new FormatDateTime();
  }

  /**
   * Get local time
   * @param tzi  - string | null | undifine
   * @returns {string}
   */

  getLocalTime(tzi: string | null | undefined = null): string {
    const qr = this.base.find((tz) =>
      tz.timeZoneIdentifier === tzi ? tzi : this.getTimeZone()
    );
    if (qr && qr.iso) {
      return this.instanceOfFormatDateTime.localTime(qr.timeZoneIdentifier);
    }
    throw new Error('Invalid time zone identifier');
  }

  /**
   * Get full date
   * @param tzi
   * @returns {string}
   */

  getFullDate(
    tzi: string | null | undefined = null,
    format: string | undefined | null = null
  ): string {
    const qr = this.base.find((tz) =>
      tz.timeZoneIdentifier === tzi ? tzi : this.getTimeZone()
    );

    if (qr && qr.iso) {
      return this.instanceOfFormatDateTime.localDate(qr.timeZoneIdentifier);
    }

    throw new Error('Invalid time zone identifier');
  }

  /**
   * TODO: weather
   */

  getWeather() {
    //
  }

  private getTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  getDaylightSavingTime() {
    //
  }

  getDifference() {
    //
  }

  /**
   * Get flag
   * @param flag Country name || country code
   * @returns {string} flag
   */

  getFlag(flag: string): string {
    if (typeof flag !== 'string') {
      throw new Error('Parameter shoul be string');
    }

    if (flag) {
      const qr = this.base.find(
        (f) =>
          f.countryName.toLowerCase() === flag.toLowerCase() ||
          f.country.countryCode.toLowerCase() == flag.toLowerCase()
      );
      if (qr && qr.iso) {
        //
      }
      throw new Error('Invalid country name');
    }

    throw new Error('Country name is required');
  }

  /**
   * Ge country phone code
   * @param cn Country Name
   * @returns {String}  Country phone code
   *
   */

  getCountryPhoneCode(cn: string): string {
    if (typeof cn !== 'string') {
      throw new Error('Parameter shoul be string');
    }
    if (cn) {
      const qr = this.base.find(
        (cpc) => cpc.countryName.toLowerCase() === cn.toLowerCase()
      );
      if (qr && qr.iso) {
        return qr.countryPhoneCode;
      }
      throw new Error('Invalid country name');
    }

    throw new Error('Country name is required');
  }

  getCountryCode() {
    //
  }

  /**
   * Get All time zone indentifies
   * @returns {Array<string>} list of time zone
   */

  getTimeZoneIdentifier(): Array<string> {
    return this.base.map((tz) => {
      return tz['timeZoneIdentifier'];
    });
  }
}

const timeZone = new TimeZoneC();

const tz = new Proxy(timeZone, {
  get(target, prop) {
    return target[prop];
  },
});

export default tz;
