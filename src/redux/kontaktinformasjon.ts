import { createActionsAndReducer } from './restReducer';
import { getKontaktinformasjon } from '../api/kontaktinformasjon-api';
import { Kontaktinformasjon } from '../models/kontaktinformasjon';

const { reducer, action} = createActionsAndReducer('kontaktinformasjon');

export function hentKontaktinformasjon(fødselsnummer: string) {
    return action(() => getKontaktinformasjon(fødselsnummer)
        .then((data: Kontaktinformasjon) => {
            return data;
        }));
}

export default reducer;