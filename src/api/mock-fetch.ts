import providers from '../data/providers.json';
import clients from '../data/clients.json';
import { Provider } from '@/types/types';

export function mockFetchProviders() {
  return providers;
}

export function mockFetchProviderById(providerId: number) {
  const provider = providers.find((provider) => provider.id === providerId);
  return provider;
}

export function mockFetchProviderByIdWithAbort(providerId: number, { signal }: { signal?: AbortSignal }) {
  return new Promise<Provider | undefined>((resolve, reject) => {
    const timeout = setTimeout(() => {
      const provider = providers.find((provider) => provider.id === providerId);

      resolve(provider);
    }, 500);

    if (signal) {
      signal.onabort = () => {
        clearTimeout(timeout);
        reject(new DOMException('aborted', 'AbortError'));
      };
    }
  });
}

export function mockFetchClientById(clientId: number) {
  const client = clients.find((client) => client.id === clientId);
  return client;
} 
