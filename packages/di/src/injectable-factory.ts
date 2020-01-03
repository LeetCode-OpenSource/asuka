import { ReflectiveInjector, ResolvedReflectiveProvider } from 'injection-js'

import { Provider, ValueProvider } from './type'

export class InjectableFactory {
  // @internal
  providers: Set<Provider>
  // @internal
  reflectiveProviders: ResolvedReflectiveProvider[]

  private _injector: ReflectiveInjector | null = null

  private resolved = false

  constructor(
    providers: Set<Provider> = new Set(),
    reflectiveProviders: ResolvedReflectiveProvider[] = [],
    private readonly parent: InjectableFactory | null = null,
  ) {
    this.providers = providers
    this.reflectiveProviders = reflectiveProviders
  }

  addProvider<T>(provider: Provider<T>): Provider<T> {
    this.providers.add(provider)
    return provider
  }

  addProviders(...providers: Provider[]) {
    providers.forEach((provider) => {
      this.providers.add(provider)
    })
    return this
  }

  overrideProviders(...providers: Provider[]) {
    const newProviders = new Set<Provider>(providers)
    return new InjectableFactory(newProviders, [], this)
  }

  resolveProviders() {
    if (this.parent && !this.parent.resolved) {
      this.parent.resolveProviders()
    }
    this.reflectiveProviders = ReflectiveInjector.resolve(Array.from(this.providers))
    let parent = this.parent
    const reflectiveProviders = Array.from(this.reflectiveProviders)
    while (parent) {
      reflectiveProviders.push(...parent.reflectiveProviders)
      parent = parent.parent
    }
    this._injector = ReflectiveInjector.fromResolvedProviders(reflectiveProviders)
    this.resolved = true
    return this
  }

  /**
   * @description
   * ## unit test only
   * **do not use this method in application**
   */
  reset() {
    this.providers.clear()
    this.resolved = false
    return this
  }

  getInstance<T>(provider: Provider<T>): T {
    return this._injector!.get((provider as ValueProvider<T>).provide ?? provider)
  }

  initialize<T>(provider: Provider): T {
    return this._injector!.resolveAndInstantiate(provider)
  }
}
