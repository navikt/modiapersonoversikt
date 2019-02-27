import { createActionsAndReducer } from './restReducer';
import { getKontaktinformasjon } from '../../api/kontaktinformasjon-api';
import { KRRKontaktinformasjon } from '../../models/kontaktinformasjon';

const { reducer, action, actionNames } = createActionsAndReducer('kontaktinformasjon');

export function hentKontaktinformasjon(fødselsnummer: string) {
    return action(() =>
        getKontaktinformasjon(fødselsnummer).then((data: KRRKontaktinformasjon) => {
            return data;
        })
    );
}

export const kontaktinformasjonActionNames = actionNames;

export default reducer;
