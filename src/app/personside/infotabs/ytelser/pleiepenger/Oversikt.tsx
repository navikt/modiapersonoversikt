import * as React from 'react';
import { Pleiepengerettighet } from '../../../../../models/ytelse/pleiepenger';
import { OversiktStyling } from '../felles-styling/CommonStylingYtelser';
import YtelserBullet from '../felles-styling/YtelserBullet';
import DescriptionList from '../felles-styling/DescriptionList';
import ForbrukteDager from './ForbrukteDager';
import { getSisteVedtakForPleiepengerettighet } from './pleiepengerUtils';
import { formaterDato } from '../../../../../utils/dateUtils';
import { utledKjønnFraFødselsnummer } from '../../../../../utils/fnr-utils';
import { Kjønn } from '../../../../../models/person/person';

interface Props {
    pleiepenger: Pleiepengerettighet;
}

function getKjønnString(fnr: string): string {
    switch (utledKjønnFraFødselsnummer(fnr)) {
        case Kjønn.Mann:
            return 'gutt';
        case Kjønn.Kvinne:
            return 'jente';
        case Kjønn.Diskresjonskode:
            return 'diskresjonskode';
        default:
            return '';
    }
}

function Oversikt({pleiepenger}: Props) {

    const gjeldeneVedtak = getSisteVedtakForPleiepengerettighet(pleiepenger);
    const kjønn = getKjønnString(pleiepenger.barnet);

    const omPleiepengerettenEntries = {
        'Fra og med': formaterDato(gjeldeneVedtak.periode.fom),
        'Til og med': formaterDato(gjeldeneVedtak.periode.tom),
        Kompensasjonsgrad: gjeldeneVedtak.kompensasjonsgrad + '%',
        Pleiepengegrad: gjeldeneVedtak.pleiepengegrad + '%',
        'Totalt invilget': pleiepenger.pleiepengedager - pleiepenger.restDagerAnvist + ' dager',
        ['Barnet (' + kjønn + ')']: pleiepenger.barnet,
        'Annen forelder': pleiepenger.andreOmsorgsperson
    };

    const arbeidsSitsuasjonEntries = {
        Arbeidsgiver: '',
        Arbeidskategori: '',
        Inntekstsperiode: '',
        Kontonummer: '',
        Refusjonstype: '',
        'Inntekt for perioden': '',
        'Refusjon til dato': ''
    };

    return (
        <OversiktStyling>
            <YtelserBullet tittel="Om pleiepengeretten">
                <ForbrukteDager pleiepenger={pleiepenger}/>
                <DescriptionList entries={omPleiepengerettenEntries}/>
            </YtelserBullet>
            <YtelserBullet tittel="Arbeidssituasjon">
                <DescriptionList entries={arbeidsSitsuasjonEntries}/>
            </YtelserBullet>
        </OversiktStyling>);
}

export default Oversikt;
