import { InjectableFactory } from './injectable-factory'
import { Injectable as InjectionInjectable, Provider } from 'injection-js'

export function Injectable(config?: { providers: Provider[] }) {
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
