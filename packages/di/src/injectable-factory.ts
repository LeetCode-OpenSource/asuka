import { ReflectiveInjector, InjectionToken, Provider, Type } from 'injection-js'

export class InjectableFactory {
  // @internal
  static providers = new Set<any>()
  // @internal
  static injector = ReflectiveInjector.resolveAndCreate([])

  static getInstance<T>(constructor: Type<T>): T {
    return this._getInstance(constructor)
  }

  static getInstanceByToken<T>(token: InjectionToken<T>): T {
    return this._getInstance(token)
  }

  static addProviders(...providers: Provider[]) {
    providers.forEach((provider) => {
      this.providers.add(provider)
    })
    this.injector = this.injector.resolveAndCreateChild(providers)
  }

  static reset() {
    this.providers.clear()
    this.injector = ReflectiveInjector.resolveAndCreate([])
  }

  private static _getInstance<T>(token: Type<T> | InjectionToken<T>): T {
    return this.injector.get(token)
  }
}
