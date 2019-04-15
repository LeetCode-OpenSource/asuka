import { ReflectiveInjector, InjectionToken, Provider, Type } from 'injection-js'

export class InjectableFactory {
  // @internal
  static providers = new Set<any>()
  // @internal
  static injector = ReflectiveInjector.resolveAndCreate([])
  private static needRecreateInjector = true

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
    this.needRecreateInjector = true
  }

  static reset() {
    this.providers.clear()
    this.injector = ReflectiveInjector.resolveAndCreate([])
    this.needRecreateInjector = true
  }

  private static _getInstance<T>(token: Type<T> | InjectionToken<T>): T {
    if (this.needRecreateInjector) {
      this.injector = ReflectiveInjector.resolveAndCreate(Array.from(this.providers))
      this.needRecreateInjector = false
    }
    return this.injector.get(token)
  }
}
