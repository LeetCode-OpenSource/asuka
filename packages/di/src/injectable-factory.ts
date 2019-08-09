import { ReflectiveInjector, InjectionToken, Provider, Type } from 'injection-js'

export class InjectableFactory {
  // @internal
  static providers = new Set<any>()
  // @internal
  static injector = ReflectiveInjector.resolveAndCreate([])

  private static _hasResolved = false

  static getInstance<T>(constructor: Type<T>): T {
    return this._getInstance(constructor)
  }

  static getInstanceByToken<T>(token: InjectionToken<T>): T {
    return this._getInstance(token)
  }

  static initialize<T>(provider: Provider): T {
    return this.injector.resolveAndInstantiate(provider)
  }

  static addProviders(...providers: Provider[]) {
    providers.forEach((provider) => {
      this.providers.add(provider)
    })
    this.injector = this.injector.resolveAndCreateChild(providers)
  }

  static overrideProviders(...providers: Provider[]) {
    if (this._hasResolved) {
      throw new Error(
        'Override providers after DI system start is forbidden, ensure this method was invoked before any Provider was initialized',
      )
    }
    providers.forEach((provider) => {
      this.providers.add(provider)
    })
    this.injector = ReflectiveInjector.resolveAndCreate(Array.from(this.providers))
  }

  /**
   * @description
   * ## unit test only
   * **do not use this method in application**
   */
  static reset() {
    this._hasResolved = false
    this.providers.clear()
    this.injector = ReflectiveInjector.resolveAndCreate([])
  }

  private static _getInstance<T>(token: Type<T> | InjectionToken<T>): T {
    this._hasResolved = true
    return this.injector.get(token)
  }
}
