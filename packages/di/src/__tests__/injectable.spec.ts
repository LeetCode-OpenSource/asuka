import 'reflect-metadata'
import test from 'ava'

import { Inject, InjectionToken, Injectable, rootInjector } from '../index'

test.afterEach(() => {
  rootInjector.reset()
})

test('should get single instance', (t) => {
  @Injectable()
  class Single {}

  const instance = rootInjector.getInstance(Single)

  t.true(instance instanceof Single)
})

test('should get same instance after add new provider', (t) => {
  @Injectable()
  class Single {}

  class NewOne {}

  const instance1 = rootInjector.getInstance(Single)
  rootInjector.addProvider(NewOne)
  const instance2 = rootInjector.getInstance(Single)

  t.is(instance1, instance2)
})

test('should get same instance after override providers', (t) => {
  @Injectable()
  class Single {}

  class NewOne {}

  class AddedOne {}

  const injector = rootInjector
  const addedInjector = injector.createChild([AddedOne, NewOne])
  const instance1 = injector.getInstance(Single)
  const instance2 = addedInjector.getInstance(Single)

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

  const injector = rootInjector
  const service = injector.getInstance(Service)

  t.true(injector.getInstance(Dep) instanceof Dep)
  t.true(injector.getInstance(DepTwo) instanceof DepTwo)
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

  const injector = rootInjector

  const service = injector.getInstance(Service)
  const dep = injector.getInstance(Dep)
  const depTwo = injector.getInstance(DepTwo)

  t.is(service.dep, dep)
  t.is(service.depTwo, depTwo)
})

test('should be able to inject by useValue', (t) => {
  function whatever() {}
  const token = new InjectionToken<typeof whatever>('whatever')

  rootInjector.addProvider({
    provide: token,
    useValue: whatever,
  })

  @Injectable()
  class Service {
    constructor(@Inject(token) public dep: typeof whatever) {}
  }

  const injector = rootInjector
  const service = injector.getInstance(Service)
  t.true(service instanceof Service)
  t.is(service.dep, whatever)
})

test('should be able to replace provide', (t) => {
  const rawClientProvide = rootInjector.addProvider({
    provide: new InjectionToken('raw-client'),
    useValue: Object.create(null),
  })

  const queryProvider = rootInjector.addProvider({
    provide: new InjectionToken('query'),
    useFactory: (client: any) =>
      Object.create({
        client: client,
      }),
    deps: [rawClientProvide.provide],
  })

  @Injectable()
  class Client {
    constructor(@Inject(queryProvider.provide) public query: any) {}
  }

  @Injectable()
  class Module {
    constructor(public client: Client) {}
  }

  const childInjector = rootInjector.createChild([
    {
      provide: rawClientProvide.provide,
      useValue: new Date(),
    },
  ])

  const oldM = rootInjector.getInstance(Module)
  const m = childInjector.getInstance(Module)

  t.not(oldM, m)
  t.true(m.client.query.client instanceof Date)
})

test('should be able to inject by useFactory', (t) => {
  class Dep {
    constructor(public cacheSize: number) {}
  }

  const cacheSize = 5

  const token = new InjectionToken<Dep>('whatever')

  rootInjector.addProvider({
    provide: token,
    useFactory() {
      return new Dep(cacheSize)
    },
  })

  @Injectable()
  class Service {
    constructor(@Inject(token) public dep: Dep) {}
  }

  const injector = rootInjector
  const service = injector.getInstance(Service)

  t.true(service.dep instanceof Dep)
  t.is(service.dep.cacheSize, cacheSize)
})

test('should be able to resolve deps from useFactory', (t) => {
  @Injectable()
  class Dep {
    constructor(public cacheSize: number, public depTwo: DepTwo) {}
  }

  @Injectable()
  class DepTwo {}

  const cacheSize = 5

  const token = new InjectionToken<Dep>('whatever')

  rootInjector.addProvider({
    provide: token,
    useFactory(depTwo: DepTwo) {
      return new Dep(cacheSize, depTwo)
    },
    deps: [DepTwo],
  })

  @Injectable()
  class Service {
    constructor(@Inject(token) public dep: Dep) {}
  }

  const injector = rootInjector

  const service = injector.getInstance(Service)
  const depTwo = injector.getInstance(DepTwo)

  t.true(service.dep instanceof Dep)
  t.is(service.dep.cacheSize, cacheSize)
  t.true(depTwo instanceof DepTwo)
  t.is(service.dep.depTwo, depTwo)
})

test('should be able to inject by useClass', (t) => {
  @Injectable()
  class Dep {
    constructor() {}
  }

  const token = new InjectionToken<Dep>('whatever')

  rootInjector.addProvider({
    provide: token,
    useClass: Dep,
  })

  @Injectable()
  class Service {
    constructor(@Inject(token) public dep: Dep) {}
  }

  const injector = rootInjector
  const service = injector.getInstance(Service)

  t.true(service instanceof Service)
  t.true(service.dep instanceof Dep)
})

test('should initialize without cache #1', (t) => {
  @Injectable()
  class Dep {}

  @Injectable()
  class Service {
    constructor(public readonly dep: Dep) {}
  }

  const injector = rootInjector

  const dep = injector.resolveAndInstantiate<Dep>(Dep)
  const service = injector.getInstance(Service)
  t.not(dep, service.dep)
})

test('should initialize without cache #2', (t) => {
  @Injectable()
  class Dep {}

  const injector = rootInjector

  const dep1 = injector.resolveAndInstantiate(Dep)
  const dep2 = injector.resolveAndInstantiate(Dep)
  t.not(dep1, dep2)
})

test('should resolve and create new injector', (t) => {
  class Dep {
    constructor() {}
  }

  const token = new InjectionToken<Dep>('whatever')

  rootInjector.addProvider({
    provide: token,
    useClass: Dep,
  })

  @Injectable()
  class Service {
    constructor(@Inject(token) public dep: Dep) {}
  }

  const replacementProvider = {
    provide: token,
    useValue: 1,
  }

  const newInjector = rootInjector.createChild([replacementProvider])
  const service = newInjector.getInstance(Service)
  t.is(service.dep, 1)
})
