import 'reflect-metadata'
import test from 'ava'

import {
  Inject,
  InjectionToken,
  InjectableFactory,
  Injectable,
  ValueProvider,
  FactoryProvider,
  ClassProvider,
} from '../index'

test.afterEach(() => {
  InjectableFactory.reset()
})

test('should get single instance', (t) => {
  @Injectable()
  class Single {}

  const instance = InjectableFactory.getInstance(Single)

  t.true(instance instanceof Single)
})

test('should get same instance after add new providers', (t) => {
  @Injectable()
  class Single {}

  class NewOne {}

  const instance1 = InjectableFactory.getInstance(Single)
  InjectableFactory.addProviders([NewOne])
  const instance2 = InjectableFactory.getInstance(Single)

  t.is(instance1, instance2)
})

test('should get dependencies', (t) => {
  @Injectable()
  class Dep {}

  @Injectable()
  class DepTwo {
    constructor(public dep: Dep) {}
  }

  @Injectable()
  class Service {
    constructor(public dep: Dep, public depTwo: DepTwo) {}
  }

  const service = InjectableFactory.getInstance(Service)

  t.true(InjectableFactory.getInstance(Dep) instanceof Dep)
  t.true(InjectableFactory.getInstance(DepTwo) instanceof DepTwo)
  t.true(service instanceof Service)
})

test('should singleton by default', (t) => {
  @Injectable()
  class Dep {}

  @Injectable()
  class DepTwo {
    constructor(public dep: Dep) {}
  }

  @Injectable()
  class Service {
    constructor(public dep: Dep, public depTwo: DepTwo) {}
  }

  const service = InjectableFactory.getInstance(Service)
  const dep = InjectableFactory.getInstance(Dep)
  const depTwo = InjectableFactory.getInstance(DepTwo)

  t.is(service.dep, dep)
  t.is(service.depTwo, depTwo)
})

test('should be able to inject by useValue', (t) => {
  function whatever() {}
  const token = new InjectionToken<typeof whatever>('whatever')

  const provider: ValueProvider = {
    provide: token,
    useValue: whatever,
  }

  @Injectable({
    providers: [provider],
  })
  class Service {
    constructor(@Inject(token) public dep: typeof whatever) {}
  }
  const service = InjectableFactory.getInstance(Service)
  t.true(service instanceof Service)
  t.is(service.dep, whatever)
})

test('should be able to inject by useFactory', (t) => {
  class Dep {
    constructor(public cacheSize: number) {}
  }

  const cacheSize = 5

  const token = new InjectionToken<Dep>('whatever')

  const provider: FactoryProvider = {
    provide: token,
    useFactory() {
      return new Dep(cacheSize)
    },
  }

  @Injectable({
    providers: [provider],
  })
  class Service {
    constructor(@Inject(token) public dep: Dep) {}
  }

  const service = InjectableFactory.getInstance(Service)

  t.true(service.dep instanceof Dep)
  t.is(service.dep.cacheSize, cacheSize)
})

test('should be able to resolve deps from useFactory', (t) => {
  class Dep {
    constructor(public cacheSize: number, public depTwo: DepTwo) {}
  }

  @Injectable()
  class DepTwo {}

  const cacheSize = 5

  const token = new InjectionToken<Dep>('whatever')

  const provider: FactoryProvider = {
    provide: token,
    useFactory(depTwo: DepTwo) {
      return new Dep(cacheSize, depTwo)
    },
    deps: [DepTwo],
  }

  @Injectable({
    providers: [provider],
  })
  class Service {
    constructor(@Inject(token) public dep: Dep) {}
  }

  const service = InjectableFactory.getInstance(Service)
  const depTwo = InjectableFactory.getInstance(DepTwo)

  t.true(service.dep instanceof Dep)
  t.is(service.dep.cacheSize, cacheSize)
  t.true(depTwo instanceof DepTwo)
  t.is(service.dep.depTwo, depTwo)
})

test('should be able to inject by useClass', (t) => {
  class Dep {
    constructor() {}
  }

  const token = new InjectionToken<Dep>('whatever')

  const provider: ClassProvider = {
    provide: token,
    useClass: Dep,
  }

  @Injectable({
    providers: [provider],
  })
  class Service {
    constructor(@Inject(token) public dep: Dep) {}
  }

  const service = InjectableFactory.getInstance(Service)

  t.true(service instanceof Service)
  t.true(service.dep instanceof Dep)
})
