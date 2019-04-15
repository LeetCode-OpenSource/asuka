import { ReflectiveInjector, InjectionToken, Provider } from 'injection-js'
import { ConstructorOf } from '@asuka/types'

export class InjectableFactory {
  // @internal
  static providers = new Set<any>()
  // @internal
  static injector = ReflectiveInjector.resolveAndCreate([])
  private static needRecreateInjector = true

  static getInstance<T>(token: ConstructorOf<T> | InjectionToken<T>): T {
    if (this.needRecreateInjector) {
      this.injector = ReflectiveInjector.resolveAndCreate(Array.from(this.providers))
      this.needRecreateInjector = false
    }
    return this.injector.get(token)
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
}
