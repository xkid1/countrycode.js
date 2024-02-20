class CountryCode {
  private param: undefined | string;
  private countries: undefined | any[];
  constructor(param: undefined | string) {
    //
  }
}

const countrycode = new Proxy(CountryCode, {
  construct(target: any, args: any[]) {
    console.log('Constructing MyClass instance with args:', args);
    console.log('target:', target);

    const instance = new target(...args);
    return new Proxy(instance, {
      get(target, prop: any, receiver) {
        console.log(`Getting property '${prop}' of MyClass instance`);
        return Reflect.get(target, prop, receiver);
      },
      // apply(target, thisArg, args) {
      //     console.log(
      //         `Calling method '${prop}' of MyClass instance with args:`,
      //         args
      //     );
      //     return Reflect.apply(target, thisArg, args);
      // },
    });
  },
});

export default countrycode;
