import { fakerNB_NO as faker } from '@faker-js/faker';
import type { AuthIntropectionDto } from 'src/lib/types/modiapersonoversikt-api';
import { IkkeTilgangArsak, type TilgangDTO } from '../rest/resources/tilgangskontrollResource';

export function authMock(): AuthIntropectionDto {
    return { expirationDate: new Date().getTime() + 2.5 * 60 * 1000 };
}
export function tilgangskontrollMock(fnr: string | undefined) {
    const ikkeTilgang = Math.random() > 0.98 || fnr === '21042900076';
    const dto: TilgangDTO = ikkeTilgang
        ? {
              harTilgang: false,
              ikkeTilgangArsak: faker.helpers.arrayElement(Object.values(IkkeTilgangArsak))
          }
        : {
              harTilgang: true
          };

    return dto;
}
