import navfaker from 'nav-faker';
import { IkkeTilgangArsak, TilgangDTO } from '../redux/restReducers/tilgangskontroll';

export default function tilgangskontrollMock(fnr: string | undefined) {
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
