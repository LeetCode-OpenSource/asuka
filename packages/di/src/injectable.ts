import { Injectable as InjectionInjectable } from 'injection-js'
import { Provider } from './type'

import { rootInjectableFactory } from './injectable-factory-instance'

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
    rootInjectableFactory.addProviders(...providersToInject)
    return InjectionInjectable()(target)
  }
}
