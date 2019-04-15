import { InjectableFactory } from './index'
import { ReflectiveInjector, InjectionToken, Type, Provider, ClassProvider } from 'injection-js'

export type Token<T> = Type<T> | InjectionToken<T>

export class Test {
  static createTestingModule(overrideConfig?: { TestModule?: Type<AbstractTestModule>; providers?: Provider[] }) {
    return new Test(
      overrideConfig && overrideConfig.providers ? overrideConfig.providers : [],
      overrideConfig && overrideConfig.TestModule ? overrideConfig.TestModule : TestModule,
    )
  }

  // @internal
  providers: Map<Token<any>, Provider> = new Map()

  private constructor(providers: Provider[], private TestModule: Type<AbstractTestModule>) {
    for (const provide of InjectableFactory.providers) {
      if (typeof provide === 'function') {
        this.providers.set(provide, provide)
      } else {
        this.providers.set((provide as ClassProvider).provide, provide)
      }
    }

    providers.forEach((provide) => {
      if (typeof provide === 'function') {
        this.providers.set(provide, provide)
      } else {
        this.providers.set((provide as ClassProvider).provide, provide)
      }
    })
  }

  overrideProvider<T>(token: Type<T> | InjectionToken<T>) {
    return new MockProvider(this, token)
  }

  compile() {
    const child = ReflectiveInjector.resolveAndCreate(Array.from(this.providers.values()))
    return new this.TestModule(child)
  }
}

export class MockProvider<T> {
  constructor(private test: Test, private token: Type<T> | InjectionToken<T>) {}

  useClass(value: Type<T>) {
    this.test.providers.set(this.token, { provide: this.token, useClass: value })
    return this.test
  }

  useValue(value: T) {
    this.test.providers.set(this.token, { provide: this.token, useValue: value })
    return this.test
  }

  useFactory(value: Function) {
    this.test.providers.set(this.token, { provide: this.token, useFactory: value })
    return this.test
  }
}

export abstract class AbstractTestModule {
  abstract getInstance<T>(token: Token<T>): T
}

export class TestModule implements AbstractTestModule {
  constructor(private injector: ReflectiveInjector) {}

  getInstance<T>(token: Token<T>): T {
    return this.injector.get(token)
  }
}
