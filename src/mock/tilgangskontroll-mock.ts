import type { AuthIntropectionDto } from 'src/lib/types/modiapersonoversikt-api';
import type { TilgangDTO } from '../rest/resources/tilgangskontrollResource';

export function authMock(): AuthIntropectionDto {
    return { expirationDate: new Date().getTime() + 2.5 * 60 * 1000 };
}
export function tilgangskontrollMock(fnr: string | undefined) {
    const ikkeTilgang = Math.random() > 0.98 || fnr === '21042900076';
    const dto: TilgangDTO = ikkeTilgang
        ? {
              harTilgang: false,
              message: 'Har ikke tilgang'
          }
        : {
              harTilgang: true
          };

    return dto;
}
