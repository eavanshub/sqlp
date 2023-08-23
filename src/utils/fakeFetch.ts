import { API_ENDPOINTS } from '../constants/apiEndpoints';

export function setupFakeFetch() {
  window.fetch = new Proxy(window.fetch, {
    apply: async function (
      target,
      that,
      args: [input: string, init?: RequestInit | undefined],
    ) {
      const [input] = args;

      // catch our api endpoint
      if (Object.values(API_ENDPOINTS).includes(input)) {
        return new Response(
          JSON.stringify([
            ['username', 'email'],
            ['bar', 'bar.haim@pvml.com'],
            ['shlomi', 's@pvml.com'],
          ]),
          {
            status: 200,
            statusText: 'ok',
          },
        );
      }
      // let others continue as it supposed to
      return target.apply(that, args);
    },
  });
}
