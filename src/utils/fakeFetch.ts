import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { DataSources } from '../App';

export function setupFakeFetch() {
  window.fetch = new Proxy(window.fetch, {
    apply: async function (
      target,
      that,
      args: [input: string, init?: RequestInit | undefined],
    ) {
      const [input, request] = args;

      // catch our api endpoint
      if (Object.values(API_ENDPOINTS).includes(input) && request?.body) {
        const body = JSON.parse(request?.body as string);

        const data =
          body.source === DataSources.MYSQL
            ? [
                ['username', 'email'],
                ['bar', 'bar.haim@pvml.com'],
                ['shlomi', 's@pvml.com'],
              ]
            : [
                ['username', 'email'],
                ['foo', 'foo.haim@pvml.com'],
                ['shlomi2', 's2@pvml.com'],
              ];

        return new Response(JSON.stringify(data), {
          status: 200,
          statusText: 'ok',
        });
      }
      // let others continue as it supposed to
      return target.apply(that, args);
    },
  });
}
