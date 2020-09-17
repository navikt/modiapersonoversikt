import navfaker from 'nav-faker';
import { IkkeTilgangArsak, TilgangDTO } from '../redux/restReducers/tilgangskontroll';
import { AuthIntropectionDTO } from '../utils/hooks/use-persistent-login';

export function authMock(): AuthIntropectionDTO {
    return { expirationDate: new Date().getTime() + 2.5 * 60 * 1000 };
}
export function tilgangskontrollMock(fnr: string | undefined) {
    const ikkeTilgang = Math.random() > 0.98 || fnr === '21042900076';
    const dto: TilgangDTO = ikkeTilgang
        ? {
              harTilgang: false,
              ikkeTilgangArsak: navfaker.random.arrayElement(Object.values(IkkeTilgangArsak))
          }
        : {
              harTilgang: true
          };

    return dto;
}
