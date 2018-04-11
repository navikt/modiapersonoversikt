import '../testSetup';
import { parseUrlForPersonIKontekst } from './urlUtils';
import { paths } from '../app/routes/routing';

it('returnerer fødselsnummeret når en person er i kontekst i URL', () => {
    const location = {
        pathname: `${paths.personUri}/123`
    };

    const fodselsnummer = parseUrlForPersonIKontekst(location);

    expect(fodselsnummer).toEqual('123');
});

it('returnerer tomt fødselsnummer når en person ikke er i kontekst', () => {
    const location = {
        pathname: '/'
    };

    const fodselsnummer = parseUrlForPersonIKontekst(location);

    expect(fodselsnummer).toEqual('');
});
