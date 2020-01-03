import React, { createContext, useContext, useMemo, memo } from 'react'

import { InjectableFactory } from './injectable-factory'
import { rootInjectableFactory } from './injectable-factory-instance'
import { Provider } from './type'

const _InjectableContext = createContext<InjectableFactory>(rootInjectableFactory)

export function InjectableContext({ children }: { children: React.ReactNode }) {
  return (
    <_InjectableContext.Provider value={rootInjectableFactory.resolveProviders()}>
      {children}
    </_InjectableContext.Provider>
  )
}

const ProvidersContext = createContext<Provider[]>([])

export const InjectionProvidersContext = memo<{ providers: Provider[]; children: React.ReactNode }>(
  ({ providers, children }) => {
    const parentInjectableFactory = useContext(_InjectableContext)
    const childInjectableFactory = useMemo(
      () => parentInjectableFactory.overrideProviders(...providers).resolveProviders(),
      [providers],
    )
    return (
      <_InjectableContext.Provider value={childInjectableFactory}>
        <ProvidersContext.Provider value={providers}>{children}</ProvidersContext.Provider>
      </_InjectableContext.Provider>
    )
  },
)

export function useInstance<T>(provider: Provider<T>): T {
  const childInjector = useContext(_InjectableContext)

  return childInjector.getInstance(provider)
}
