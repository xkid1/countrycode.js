/**
 * Country Code
 *
 * @version 1.0.0
 * @since 1.0.0
 */
declare module 'countrycode' {
    type CountryCodeType = typeof CountryCode & {
        new (param: string | undefined | null): ProxyHandler<CountryCode>;
    };
    class CountryCode {
        constructor(param: string | undefined | null);
    }

    const countrycode: CountryCodeType;

    export = countrycode;
}
