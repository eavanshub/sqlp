import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { DataSources } from '../App';

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
            ? DATABASE.withoutPVML
            : DATABASE.withPVML;

        // just to simulate the server delay and show the loading state
        await delay(1000);

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

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// examples to show an empty and a huge responses
const DATABASE = {
  withPVML: [['first_name', 'last_name']],
  withoutPVML: [
    ['first_name', 'last_name'],
    ['John', 'Doe'],
    ['Jane', 'Smith'],
    ['Michael', 'Johnson'],
    ['Emily', 'Williams'],
    ['David', 'Brown'],
    ['Olivia', 'Jones'],
    ['William', 'Davis'],
    ['Sophia', 'Miller'],
    ['James', 'Wilson'],
    ['Emma', 'Moore'],
    ['Joseph', 'Taylor'],
    ['Ava', 'Anderson'],
    ['Daniel', 'Thomas'],
    ['Isabella', 'Jackson'],
    ['Matthew', 'White'],
    ['Mia', 'Harris'],
    ['Christopher', 'Martin'],
    ['Abigail', 'Thompson'],
    ['Andrew', 'Garcia'],
    ['Ella', 'Martinez'],
    ['Joshua', 'Robinson'],
    ['Sofia', 'Clark'],
    ['Nicholas', 'Rodriguez'],
    ['Amelia', 'Lewis'],
    ['Ryan', 'Lee'],
    ['Avery', 'Walker'],
    ['David', 'Hall'],
    ['Grace', 'Allen'],
    ['Dylan', 'Young'],
    ['Chloe', 'Hernandez'],
    ['Brandon', 'King'],
    ['Evelyn', 'Wright'],
    ['Carter', 'Lopez'],
    ['Zoe', 'Adams'],
    ['Liam', 'Nelson'],
    ['Layla', 'Hill'],
    ['Gabriel', 'Baker'],
    ['Harper', 'Turner'],
    ['Jackson', 'Perez'],
    ['Madison', 'Green'],
    ['John', 'Evans'],
    ['Luna', 'Collins'],
    ['Muhammad', 'Diaz'],
    ['Aria', 'Murphy'],
    ['Oliver', 'Rogers'],
    ['Scarlett', 'Cook'],
    ['Jayden', 'Morgan'],
    ['Ella', 'Bell'],
    ['Lucas', 'Peterson'],
    ['Gianna', 'Cooper'],
    ['Alexander', 'Reed'],
    ['Aubrey', 'Bailey'],
    ['Sebastian', 'Sanders'],
    ['Savannah', 'Phillips'],
    ['Mateo', 'Ross'],
    ['Addison', 'Bennett'],
    ['Jack', 'Wood'],
    ['Hazel', 'Watson'],
    ['Christopher', 'Foster'],
    ['Eleanor', 'Perry'],
    ['Leo', 'Long'],
    ['Stella', 'Ramirez'],
    ['Lincoln', 'Gray'],
    ['Paisley', 'James'],
    ['Daniel', 'Butler'],
    ['Victoria', 'Stewart'],
    ['Jaxon', 'Coleman'],
    ['Penelope', 'Morgan'],
    ['Julian', 'Hill'],
    ['Skylar', 'Hughes'],
    ['Christian', 'Edwards'],
    ['Maya', 'Flores'],
    ['Josiah', 'Washington'],
    ['Lily', 'Barnes'],
    ['Grayson', 'Morris'],
    ['Aurora', 'Rogers'],
    ['Levi', 'Ward'],
    ['Nova', 'Price'],
    ['Aaron', 'Murphy'],
    ['Elizabeth', 'Baker'],
    ['Eli', 'Harris'],
    ['Grace', 'Scott'],
    ['Nathan', 'Gonzalez'],
    ['Elena', 'Peterson'],
    ['Isaac', 'Rivera'],
    ['Hannah', 'Morgan'],
    ['Owen', 'Cruz'],
    ['Lillian', 'Reed'],
    ['Jeremiah', 'Cooper'],
    ['Ellie', 'Miller'],
    ['Landon', 'Ramirez'],
    ['Addison', 'Brown'],
    ['Natalie', 'Bell'],
    ['Oliver', 'Gomez'],
    ['Violet', 'Hill'],
    ['Andrew', 'Ward'],
    ['Eleanor', 'Barnes'],
    ['Lucas', 'Thomas'],
    ['Mila', 'Garcia'],
    ['Elijah', 'Lopez'],
    ['Aria', 'Smith'],
    ['Carter', 'King'],
    ['Scarlett', 'Johnson'],
    ['Leo', 'Adams'],
    ['Aubrey', 'Wilson'],
    ['Henry', 'Allen'],
    ['Luna', 'Miller'],
    ['Mia', 'Evans'],
    ['Isaac', 'Walker'],
    ['Grace', 'Gonzalez'],
    ['Liam', 'White'],
    ['Ella', 'Williams'],
    ['Avery', 'Harris'],
    ['Michael', 'Scott'],
    ['Abigail', 'Jackson'],
    ['Eli', 'Robinson'],
    ['Aurora', 'Hall'],
    ['James', 'Lee'],
    ['Sophia', 'Martin'],
    ['Benjamin', 'Turner'],
    ['Zoe', 'Lewis'],
    ['Daniel', 'Cruz'],
    ['Chloe', 'Thompson'],
    ['Evelyn', 'Moore'],
    ['Nicholas', 'Martinez'],
    ['Madison', 'Brown'],
    ['Mason', 'Jones'],
    ['Emma', 'Perez'],
    ['Jackson', 'Collins'],
    ['Amelia', 'Clark'],
    ['Logan', 'Young'],
    ['Stella', 'Hernandez'],
    ['Oliver', 'Taylor'],
    ['Emily', 'Hill'],
    ['Caleb', 'Rodriguez'],
    ['Elizabeth', 'Gomez'],
    ['Mila', 'Wright'],
    ['Sebastian', 'Cooper'],
    ['Layla', 'Ramirez'],
    ['Wyatt', 'Baker'],
    ['Nora', 'Miller'],
    ['Henry', 'Green'],
    ['Addison', 'Phillips'],
    ['Elena', 'Butler'],
    ['Leo', 'James'],
    ['Penelope', 'Wilson'],
    ['Sofia', 'Morgan'],
    ['Ethan', 'Davis'],
    ['Eliana', 'Smith'],
    ['Liam', 'Perez'],
    ['Aria', 'Adams'],
    ['Charlotte', 'Johnson'],
    ['Carter', 'Anderson'],
    ['Avery', 'Brown'],
    ['Lucas', 'Moore'],
    ['Harper', 'Taylor'],
    ['Daniel', 'Hall'],
    ['Mila', 'Evans'],
    ['Oliver', 'Garcia'],
    ['Sophia', 'Thompson'],
    ['Noah', 'Walker'],
    ['Isabella', 'Martinez'],
    ['Emma', 'Lewis'],
    ['Elijah', 'Williams'],
    ['Ava', 'Jackson'],
    ['Jackson', 'Davis'],
    ['Chloe', 'Allen'],
    ['William', 'Jones'],
    ['Abigail', 'Harris'],
    ['Liam', 'Martin'],
    ['Mia', 'Wilson'],
    ['James', 'Turner'],
    ['Olivia', 'Clark'],
    ['Benjamin', 'Young'],
    ['Ella', 'Rodriguez'],
    ['Lucas', 'Lee'],
    ['Aria', 'Hall'],
    ['Logan', 'Thompson'],
    ['Aurora', 'Moore'],
    ['Emma', 'Martin'],
    ['Oliver', 'Phillips'],
    ['Carter', 'Taylor'],
    ['Sophia', 'Butler'],
    ['Ethan', 'Johnson'],
    ['Eliana', 'Smith'],
    ['Liam', 'Perez'],
    ['Aria', 'Adams'],
    ['Charlotte', 'Jones'],
    ['Carter', 'Brown'],
    ['Lucas', 'Moore'],
    ['Harper', 'Taylor'],
    ['Daniel', 'Hall'],
    ['Mila', 'Evans'],
    ['Oliver', 'Garcia'],
    ['Sophia', 'Thompson'],
    ['Noah', 'Walker'],
    ['Isabella', 'Martinez'],
    ['Emma', 'Lewis'],
    ['Elijah', 'Williams'],
    ['Ava', 'Jackson'],
    ['Jackson', 'Davis'],
    ['Chloe', 'Allen'],
    ['William', 'Jones'],
    ['Abigail', 'Harris'],
    ['Liam', 'Martin'],
    ['Mia', 'Wilson'],
    ['James', 'Turner'],
    ['Olivia', 'Clark'],
    ['Benjamin', 'Young'],
    ['Ella', 'Rodriguez'],
    ['Lucas', 'Lee'],
    ['Aria', 'Hall'],
    ['Logan', 'Thompson'],
    ['Aurora', 'Moore'],
    ['Emma', 'Martin'],
    ['Oliver', 'Phillips'],
    ['Carter', 'Taylor'],
    ['Sophia', 'Butler'],
    ['Ethan', 'Johnson'],
    ['Eliana', 'Smith'],
    ['Liam', 'Perez'],
    ['Aria', 'Adams'],
    ['Charlotte', 'Johnson'],
    ['Carter', 'Anderson'],
    ['Avery', 'Brown'],
    ['Lucas', 'Moore'],
    ['Harper', 'Taylor'],
    ['Daniel', 'Hall'],
    ['Mila', 'Evans'],
    ['Oliver', 'Garcia'],
    ['Sophia', 'Thompson'],
    ['Noah', 'Walker'],
    ['Isabella', 'Martinez'],
    ['Emma', 'Lewis'],
    ['Elijah', 'Williams'],
    ['Ava', 'Jackson'],
    ['Jackson', 'Davis'],
    ['Chloe', 'Allen'],
    ['William', 'Jones'],
    ['Abigail', 'Harris'],
    ['Liam', 'Martin'],
    ['Mia', 'Wilson'],
    ['James', 'Turner'],
    ['Olivia', 'Clark'],
    ['Benjamin', 'Young'],
    ['Ella', 'Rodriguez'],
    ['Lucas', 'Lee'],
    ['Aria', 'Hall'],
    ['Logan', 'Thompson'],
    ['Aurora', 'Moore'],
    ['Emma', 'Martin'],
    ['Oliver', 'Phillips'],
    ['Carter', 'Taylor'],
    ['Sophia', 'Butler'],
    ['Ethan', 'Johnson'],
    ['Eliana', 'Smith'],
    ['Liam', 'Perez'],
    ['Aria', 'Adams'],
    ['Charlotte', 'Jones'],
    ['Carter', 'Brown'],
    ['Lucas', 'Moore'],
    ['Harper', 'Taylor'],
    ['Daniel', 'Hall'],
    ['Mila', 'Evans'],
    ['Oliver', 'Garcia'],
    ['Sophia', 'Thompson'],
    ['Noah', 'Walker'],
    ['Isabella', 'Martinez'],
    ['Emma', 'Lewis'],
    ['Elijah', 'Williams'],
    ['Ava', 'Jackson'],
    ['Jackson', 'Davis'],
    ['Chloe', 'Allen'],
    ['William', 'Jones'],
    ['Abigail', 'Harris'],
    ['Liam', 'Martin'],
    ['Mia', 'Wilson'],
    ['James', 'Turner'],
    ['Olivia', 'Clark'],
    ['Benjamin', 'Young'],
    ['Ella', 'Rodriguez'],
    ['Lucas', 'Lee'],
    ['Aria', 'Hall'],
    ['Logan', 'Thompson'],
    ['Aurora', 'Moore'],
    ['Emma', 'Martin'],
    ['Oliver', 'Phillips'],
    ['Carter', 'Taylor'],
    ['Sophia', 'Butler'],
    ['Ethan', 'Johnson'],
    ['Eliana', 'Smith'],
    ['Liam', 'Perez'],
    ['Aria', 'Adams'],
    ['Charlotte', 'Johnson'],
    ['Carter', 'Anderson'],
    ['Avery', 'Brown'],
    ['Lucas', 'Moore'],
    ['Harper', 'Taylor'],
    ['Daniel', 'Hall'],
    ['Mila', 'Evans'],
    ['Oliver', 'Garcia'],
    ['Sophia', 'Thompson'],
    ['Noah', 'Walker'],
    ['Isabella', 'Martinez'],
    ['Emma', 'Lewis'],
    ['Elijah', 'Williams'],
    ['Ava', 'Jackson'],
    ['Jackson', 'Davis'],
    ['Chloe', 'Allen'],
    ['William', 'Jones'],
    ['Abigail', 'Harris'],
    ['Liam', 'Martin'],
    ['Mia', 'Wilson'],
    ['James', 'Turner'],
    ['Olivia', 'Clark'],
    ['Benjamin', 'Young'],
    ['Ella', 'Rodriguez'],
    ['Lucas', 'Lee'],
    ['Aria', 'Hall'],
    ['Logan', 'Thompson'],
    ['Aurora', 'Moore'],
    ['Emma', 'Martin'],
    ['Oliver', 'Phillips'],
    ['Carter', 'Taylor'],
    ['Sophia', 'Butler'],
    ['Ethan', 'Johnson'],
    ['Eliana', 'Smith'],
    ['Liam', 'Perez'],
    ['Aria', 'Adams'],
    ['Charlotte', 'Jones'],
    ['Carter', 'Brown'],
    ['Lucas', 'Moore'],
    ['Harper', 'Taylor'],
    ['Daniel', 'Hall'],
    ['Mila', 'Evans'],
    ['Oliver', 'Garcia'],
    ['Sophia', 'Thompson'],
    ['Noah', 'Walker'],
    ['Isabella', 'Martinez'],
    ['Emma', 'Lewis'],
    ['Elijah', 'Williams'],
    ['Ava', 'Jackson'],
    ['Jackson', 'Davis'],
    ['Chloe', 'Allen'],
    ['William', 'Jones'],
    ['Abigail', 'Harris'],
    ['Liam', 'Martin'],
    ['Mia', 'Wilson'],
    ['James', 'Turner'],
    ['Olivia', 'Clark'],
    ['Benjamin', 'Young'],
    ['Ella', 'Rodriguez'],
    ['Lucas', 'Lee'],
    ['Aria', 'Hall'],
    ['Logan', 'Thompson'],
    ['Aurora', 'Moore'],
    ['Emma', 'Martin'],
    ['Oliver', 'Phillips'],
    ['Carter', 'Taylor'],
    ['Sophia', 'Butler'],
    ['Ethan', 'Johnson'],
    ['Eliana', 'Smith'],
    ['Liam', 'Perez'],
  ],
};