import 'reflect-metadata'
import ava, { TestInterface } from 'ava'

import {
  Inject,
  InjectionToken,
  Injectable,
  ValueProvider,
  FactoryProvider,
  ClassProvider,
  rootInjectableFactory,
} from '../index'
import { InjectableFactory } from '../injectable-factory'

const test = ava as TestInterface<{
  injectableFactory: InjectableFactory
}>

test.beforeEach((t) => {
  t.context.injectableFactory = rootInjectableFactory.overrideProviders()
})

test.afterEach(() => {
  rootInjectableFactory.reset()
})

test.serial('should get single instance', (t) => {
  @Injectable()
  class Single {}

  const injector = t.context.injectableFactory.resolveProviders()
  const instance = injector.getInstance(Single)

  t.true(instance instanceof Single)
})

test.serial('should get same instance after add new providers', (t) => {
  @Injectable()
  class Single {}

  class NewOne {}

  const injector = t.context.injectableFactory.resolveProviders()
  const instance1 = injector.getInstance(Single)
  t.context.injectableFactory.addProviders(NewOne)
  const instance2 = injector.getInstance(Single)

  t.is(instance1, instance2)
})

test.serial('should get dependencies', (t) => {
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

  const injector = t.context.injectableFactory.resolveProviders()
  const service = injector.getInstance(Service)

  t.true(injector.getInstance(Dep) instanceof Dep)
  t.true(injector.getInstance(DepTwo) instanceof DepTwo)
  t.true(service instanceof Service)
})

test.serial('should singleton by default', (t) => {
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

  const injector = t.context.injectableFactory.resolveProviders()

  const service = injector.getInstance(Service)
  const dep = injector.getInstance(Dep)
  const depTwo = injector.getInstance(DepTwo)

  t.is(service.dep, dep)
  t.is(service.depTwo, depTwo)
})

test.serial('should be able to inject by useValue', (t) => {
  function whatever() {}
  const token = new InjectionToken<typeof whatever>('whatever')

  const provider: ValueProvider<typeof whatever> = {
    provide: token,
    useValue: whatever,
  }

  @Injectable({
    providers: [provider],
  })
  class Service {
    constructor(@Inject(token) public dep: typeof whatever) {}
  }

  const injector = t.context.injectableFactory.resolveProviders()
  const service = injector.getInstance(Service)
  t.true(service instanceof Service)
  t.is(service.dep, whatever)
})

test.serial('should be able to replace provide', (t) => {
  const rawClientProvide = {
    provide: new InjectionToken('raw-client'),
    useValue: Object.create(null),
  }

  const queryProvider = {
    provide: new InjectionToken('query'),
    useFactory: (client: any) =>
      Object.create({
        client: client,
      }),
    deps: [new Inject(rawClientProvide.provide)],
  }

  @Injectable({
    providers: [rawClientProvide, queryProvider],
  })
  class Client {
    constructor(@Inject(queryProvider.provide) public query: any) {}
  }

  @Injectable()
  class Module {
    constructor(public client: Client) {}
  }

  const injector = t.context.injectableFactory
    .overrideProviders({
      provide: rawClientProvide.provide,
      useValue: new Date(),
    })
    .resolveProviders()

  const m = injector.getInstance(Module)

  t.true(m.client.query.client instanceof Date)
})

test.serial('should be able to inject by useFactory', (t) => {
  class Dep {
    constructor(public cacheSize: number) {}
  }

  const cacheSize = 5

  const token = new InjectionToken<Dep>('whatever')

  const provider: FactoryProvider<Dep> = {
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

  const injector = t.context.injectableFactory.resolveProviders()
  const service = injector.getInstance(Service)

  t.true(service.dep instanceof Dep)
  t.is(service.dep.cacheSize, cacheSize)
})

test.serial('should be able to resolve deps from useFactory', (t) => {
  class Dep {
    constructor(public cacheSize: number, public depTwo: DepTwo) {}
  }

  @Injectable()
  class DepTwo {}

  const cacheSize = 5

  const token = new InjectionToken<Dep>('whatever')

  const provider: FactoryProvider<Dep> = {
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

  const injector = t.context.injectableFactory.resolveProviders()

  const service = injector.getInstance(Service)
  const depTwo = injector.getInstance(DepTwo)

  t.true(service.dep instanceof Dep)
  t.is(service.dep.cacheSize, cacheSize)
  t.true(depTwo instanceof DepTwo)
  t.is(service.dep.depTwo, depTwo)
})

test.serial('should be able to inject by useClass', (t) => {
  class Dep {
    constructor() {}
  }

  const token = new InjectionToken<Dep>('whatever')

  const provider: ClassProvider<Dep> = {
    provide: token,
    useClass: Dep,
  }

  @Injectable({
    providers: [provider],
  })
  class Service {
    constructor(@Inject(token) public dep: Dep) {}
  }

  const injector = t.context.injectableFactory.resolveProviders()
  const service = injector.getInstance(Service)

  t.true(service instanceof Service)
  t.true(service.dep instanceof Dep)
})

test.serial('should initialize without cache #1', (t) => {
  @Injectable()
  class Dep {}

  @Injectable()
  class Service {
    constructor(public readonly dep: Dep) {}
  }

  const injector = t.context.injectableFactory.resolveProviders()

  const dep = injector.initialize<Dep>(Dep)
  const service = injector.getInstance(Service)
  t.not(dep, service.dep)
})

test.serial('should initialize without cache #2', (t) => {
  @Injectable()
  class Dep {}

  const injector = t.context.injectableFactory.resolveProviders()

  const dep1 = injector.initialize<Dep>(Dep)
  const dep2 = injector.initialize<Dep>(Dep)
  t.not(dep1, dep2)
})

test.serial('should resolve and create new injector', (t) => {
  class Dep {
    constructor() {}
  }

  const token = new InjectionToken<Dep>('whatever')

  const provider: ClassProvider<Dep> = {
    provide: token,
    useClass: Dep,
  }

  @Injectable({
    providers: [provider],
  })
  class Service {
    constructor(@Inject(token) public dep: Dep) {}
  }

  const replacementProvider: ValueProvider<1> = {
    provide: token,
    useValue: 1,
  }

  const newInjector = t.context.injectableFactory.overrideProviders(replacementProvider).resolveProviders()
  const service = newInjector.getInstance(Service)
  t.is(service.dep, 1)
})
