import { InjectableFactory } from './injectable-factory'
import { Injectable as InjectionInjectable, Provider } from 'injection-js'

export interface InjectableConfig {
  providers: Provider[]
}

export function Injectable(config?: InjectableConfig) {
  const providersToInject: Provider[] = []
  return function(target: any) {
    if (config) {
      providersToInject.push(...config.providers)
    }
    providersToInject.push(target)
    InjectableFactory.addProviders(...providersToInject)
    return InjectionInjectable()(target)
  }
}
