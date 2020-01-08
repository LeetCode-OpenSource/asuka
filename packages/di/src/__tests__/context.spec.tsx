import 'reflect-metadata'

import React from 'react'
import { create } from 'react-test-renderer'
import test from 'ava'

import { InjectionProvidersContext, InjectableContext, useInstance } from '../context'
import { Injectable } from '../injectable'

function render(component: React.ReactElement) {
  return create(<InjectableContext>{component}</InjectableContext>)
}

function inject() {
  @Injectable()
  class Service {}

  @Injectable()
  class Module {
    constructor(public readonly service: Service) {}
  }

  return { Module, Service }
}

test('should getInstance', (t) => {
  const { Module, Service } = inject()
  const TestComponent = () => {
    const instance = useInstance(Module)
    t.truthy(instance.service instanceof Service)
    return <div />
  }

  render(<TestComponent />)
})

test('should override provider', (t) => {
  const { Module, Service } = inject()
  const mockService = {
    provide: Service,
    useValue: 1,
  }
  const TestComponent = () => {
    const instance = useInstance(Module)
    t.is(instance.service, mockService.useValue)
    return <div />
  }

  render(
    <InjectionProvidersContext providers={[mockService]}>
      <TestComponent />
    </InjectionProvidersContext>,
  )
})

test('Muti providers context', (t) => {
  const { Module, Service } = inject()
  const mockService1 = {
    provide: Service,
    useValue: 1,
  }
  const mockService2 = {
    provide: Service,
    useValue: 2,
  }
  const TestComponent1 = () => {
    const instance = useInstance(Module)
    t.is(instance.service, mockService1.useValue)
    return <div />
  }

  const TestComponent2 = () => {
    const instance = useInstance(Module)
    t.is(instance.service, mockService2.useValue)
    return <div />
  }

  render(
    <>
      <InjectionProvidersContext providers={[mockService1]}>
        <TestComponent1 />
      </InjectionProvidersContext>
      <InjectionProvidersContext providers={[mockService2]}>
        <TestComponent2 />
      </InjectionProvidersContext>
    </>,
  )
})

test('Nested providers', (t) => {
  const { Module, Service } = inject()
  const mockService1 = {
    provide: Service,
    useValue: 1,
  }
  const mockService2 = {
    provide: Service,
    useValue: 2,
  }
  const TestComponent1 = () => {
    const instance = useInstance(Module)
    t.is(instance.service, mockService1.useValue)
    return <div />
  }

  const TestComponent2 = () => {
    const instance = useInstance(Module)
    t.is(instance.service, mockService2.useValue)
    return <div />
  }

  render(
    <>
      <InjectionProvidersContext providers={[mockService1]}>
        <TestComponent1 />
        <InjectionProvidersContext providers={[mockService2]}>
          <TestComponent2 />
          <InjectionProvidersContext providers={[mockService1]}>
            <TestComponent1 />
          </InjectionProvidersContext>
        </InjectionProvidersContext>
      </InjectionProvidersContext>
    </>,
  )
})
