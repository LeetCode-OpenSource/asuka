import 'reflect-metadata'
import test from 'ava'

import { Inject, Test, Injectable, InjectableFactory, InjectionToken, ValueProvider, FactoryProvider } from '../index'

test.afterEach(() => {
  InjectableFactory.reset()
})

test('should resolve dep instance', (t) => {
  @Injectable()
  class Dep {}

  @Injectable()
  class Service {
    constructor(public dep: Dep) {}
  }

  const testModule = Test.createTestingModule().compile()
  const service = testModule.getInstance(Service)
  t.true(service instanceof Service)
  t.true(service.dep instanceof Dep)
})

test('should override when createTestingModule', (t) => {
  function whatever() {
    return true
  }

  function replacement() {
    return false
  }

  const token = new InjectionToken<typeof whatever>('replacable')

  const provider: ValueProvider = {
    useValue: replacement,
    provide: token,
  }

  @Injectable({
    providers: [provider],
  })
  class Service {
    constructor(@Inject(token) public dep: typeof whatever) {}
  }

  const testModule = Test.createTestingModule({ providers: [{ provide: token, useValue: replacement }] }).compile()
  const service = testModule.getInstance(Service)
  t.true(service instanceof Service)
  t.is(service.dep, replacement)
  t.false(service.dep())
})

test('should override by overrideProvider method', (t) => {
  function whatever() {
    return true
  }

  function replacement() {
    return false
  }

  const token = new InjectionToken<typeof whatever>('replacabel')

  const provider: ValueProvider = {
    useValue: replacement,
    provide: token,
  }

  @Injectable({
    providers: [provider],
  })
  class Service {
    constructor(@Inject(token) public dep: typeof whatever) {}
  }

  const testModule = Test.createTestingModule()
    .overrideProvider(token)
    .useValue(replacement)
    .compile()
  const service = testModule.getInstance(Service)
  t.true(service instanceof Service)
  t.is(service.dep, replacement)
  t.false(service.dep())
})

test('should override class', (t) => {
  @Injectable()
  class Dep {}

  @Injectable()
  class Service {
    constructor(public dep: Dep) {}
  }

  class BetterDep {}

  const testModule = Test.createTestingModule()
    .overrideProvider(Dep)
    .useClass(BetterDep)
    .compile()

  const service = testModule.getInstance(Service)
  t.true(service instanceof Service)
  t.true(service.dep instanceof BetterDep)
})

test('should ovrride factory', (t) => {
  const token = new InjectionToken<string>('whatever')

  const provider: FactoryProvider = {
    provide: token,
    useFactory: () => {
      return '1'
    },
  }

  @Injectable({
    providers: [provider],
  })
  class Service {
    constructor(@Inject(token) public fun: string) {}
  }

  const testModule = Test.createTestingModule()
    .overrideProvider(token)
    .useFactory(() => '2')
    .compile()

  const service = testModule.getInstance(Service)

  t.is(service.fun, '2')
})
