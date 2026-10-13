import { faker } from '@faker-js/faker';
import { Country } from '../enums/Country';

export type AccountUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile: string;
  birthdate: Date;
};

export function createUser(): AccountUser {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 12 }),
    address: faker.location.streetAddress(),
    country: faker.helpers.enumValue(Country),
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobile: faker.string.numeric(10),
    birthdate: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }),
  };
}
