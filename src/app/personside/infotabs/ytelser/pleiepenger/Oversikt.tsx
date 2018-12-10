import * as React from 'react';
import { Pleiepengerettighet } from '../../../../../models/ytelse/pleiepenger';
import { OversiktStyling } from '../felles-styling/CommonStylingYtelser';
import YtelserBullet from '../felles-styling/YtelserBullet';
import DescriptionList from '../felles-styling/DescriptionList';
import ForbrukteDager from './ForbrukteDager';

interface Props {
    pleiepenger: Pleiepengerettighet;
}

function Oversikt({pleiepenger}: Props) {

    const omPleiepengerettenEntries = {
        'Fra og med': 'Ikke implementert',
        'Til og med': 'Ikke implementert',
        Kompensasjonsgrad: 'Ikke implementert',
        Pleiepengegrad: 'Ikke implementert',
        'Totalt invilget': 'Ikke implementert',
        Ferieperioder: 'Ikke implementert',
        Barnet: pleiepenger.barnet,
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
