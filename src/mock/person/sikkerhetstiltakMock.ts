import * as faker from 'faker/locale/nb_NO';
import { Sikkerhetstiltak, SikkerhetstiltakTyper } from '../../models/sikkerhetstiltak';
import { getPeriode } from './periodeMock';
import { vektetSjanse } from '../utils/mock-utils';

const fysiskUtestenkt: Sikkerhetstiltak = {
    sikkerhetstiltakskode: SikkerhetstiltakTyper.FysiskUtestengelse,
    sikkerhetstiltaksbeskrivelse: 'Skal fysisk utestenges fra NAV-kontor grunnet truende oppførsel.',
    periode: getPeriode()
};

const fysiskOgTelefonUtestenkt: Sikkerhetstiltak = {
    sikkerhetstiltakskode: SikkerhetstiltakTyper.FysiskOgTelefonUtestengelse,
    sikkerhetstiltaksbeskrivelse: 'Får verken møte opp på NAV-kontor eller ringe på telefon grunnet truende oppførsel' +
    ' og språk.'
};

const toAnsatte: Sikkerhetstiltak = {
    sikkerhetstiltakskode: SikkerhetstiltakTyper.ToAnsatteSamtale,
    sikkerhetstiltaksbeskrivelse: 'To ansatte må delta i samtale med bruker.',
    periode: getPeriode()
};

export function getSikkerhetstiltak() {
    if (vektetSjanse(faker, 0.5)) {
        return fysiskUtestenkt;
    }
    if (vektetSjanse(faker, 0.5)) {
        return fysiskOgTelefonUtestenkt;
    }
    return toAnsatte;
}