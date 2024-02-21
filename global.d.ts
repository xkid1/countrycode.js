/**
 * Time zone
 *
 * @version 1.0.0
 * @since 1.0.0
 */
declare module 'tz' {
  /**
   * Get the local time
   * @param tzi
   * @returns {string} local time
   */
  function getLocalTime(tzi: string | undefined | null): string;
}
