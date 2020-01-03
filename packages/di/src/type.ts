import { InjectionToken, Type } from 'injection-js'

export interface ValueProvider<T> {
  /**
   * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
   */
  provide: InjectionToken<T>
  /**
   * The value to inject.
   */
  useValue: T
  /**
   * If true, then injector returns an array of instances. This is useful to allow multiple
   * providers spread across many files to provide configuration information to a common token.
   *
   * ### Example
   *
   * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
   */
  multi?: boolean
}

export interface FactoryProvider<T, Deps extends Array<any> = any[]> {
  /**
   * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
   */
  provide: InjectionToken<T>
  /**
   * A function to invoke to create a value for this `token`. The function is invoked with
   * resolved values of `token`s in the `deps` field.
   */
  useFactory: (...args: Deps) => T
  /**
   * A list of `token`s which need to be resolved by the injector. The list of values is then
   * used as arguments to the `useFactory` function.
   */
  deps?: Deps
  /**
   * If true, then injector returns an array of instances. This is useful to allow multiple
   * providers spread across many files to provide configuration information to a common token.
   *
   * ### Example
   *
   * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
   */
  multi?: boolean
}

export interface ClassProvider<T> {
  /**
   * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
   */
  provide: InjectionToken<T>
  /**
   * Class to instantiate for the `token`.
   */
  useClass: Type<T>
  /**
   * If true, then injector returns an array of instances. This is useful to allow multiple
   * providers spread across many files to provide configuration information to a common token.
   *
   * ### Example
   *
   * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
   */
  multi?: boolean
}

export interface ExistingProvider<T> {
  /**
   * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
   */
  provide: InjectionToken<T>
  /**
   * Existing `token` to return. (equivalent to `injector.get(useExisting)`)
   */
  useExisting: InjectionToken<T>
  /**
   * If true, then injector returns an array of instances. This is useful to allow multiple
   * providers spread across many files to provide configuration information to a common token.
   *
   * ### Example
   *
   * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
   */
  multi?: boolean
}

export type Provider<T = unknown> =
  | Type<T>
  | ValueProvider<T>
  | ClassProvider<T>
  | ExistingProvider<T>
  | FactoryProvider<T>
