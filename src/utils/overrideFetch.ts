import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { DataSources } from '../store/reducer';
import { createUsersTable, delay, getRandomArbitrary } from './helpers';

export function overrideFetch() {
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
            ? createUsersTable(getRandomArbitrary(0, 500))
            : // looks the same, but it could be different in the real world :)
              createUsersTable(getRandomArbitrary(0, 500));

        // just to simulate the server delay and show the loading state
        await delay(getRandomArbitrary(500, 2000));

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
