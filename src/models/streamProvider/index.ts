import * as StreamProviders from './providers'
import { STREAM_PROVIDER } from 'utils/constants'

export const initStreamProvider = () => {
  const providerName: keyof typeof StreamProviders = STREAM_PROVIDER

  return new StreamProviders[providerName]()
}
