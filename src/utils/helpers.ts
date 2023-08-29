import { faker } from '@faker-js/faker';

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function createUser() {
  return [faker.person.firstName(), faker.person.lastName()];
}

export function createUsersTable(numUsers = 5) {
  return [
    ['first_name', 'last_name'],
    ...Array.from({ length: numUsers }, createUser),
  ];
}
