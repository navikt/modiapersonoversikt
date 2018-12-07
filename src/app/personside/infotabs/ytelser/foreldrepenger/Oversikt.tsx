import * as React from 'react';
import { Foreldrepengerrettighet } from '../../../../../models/ytelse/foreldrepenger';
import { utledFraDatoForRettighet, utledMaksDato } from './foreldrePengerUtils';
import { datoVerbose } from '../../utbetalinger/utils/utbetalingerUtils';
import DescriptionList from '../felles-styling/DescriptionList';
import YtelserBullet from '../felles-styling/YtelserBullet';
import { OversiktStyling } from '../felles-styling/CommonStylingYtelser';

interface Props {
    foreldrePenger: Foreldrepengerrettighet;
}

function Oversikt({foreldrePenger}: Props) {

    const foreldrePengeRetten = {
        Foreldrepengetype: foreldrePenger.foreldrepengetype,
        Dekningsgrad: foreldrePenger.dekningsgrad + '%',
        Dagsats: 'Ikke implementert',
        Graderingsdager: 'Ikke implementert',
        'Fedrekvote tilogmed': 'Ikke implementert',
        'Mødrekvote tilogmed': 'Ikke implementert',
        'Rettighet fra dato': datoVerbose(utledFraDatoForRettighet(foreldrePenger)).sammensatt,
        Restdager: foreldrePenger.restDager,
        Maksdato: utledMaksDato(foreldrePenger),
        Arbeidskategori: 'Ikke implementert'
    };

    const barnet = {
        Termindato: foreldrePenger.rettighetFom && datoVerbose(foreldrePenger.rettighetFom).sammensatt,
        Fødselsdato: foreldrePenger.barnetsFødselsdato && datoVerbose(foreldrePenger.barnetsFødselsdato).sammensatt,
        'Annen forelder': foreldrePenger.andreForeldersFnr,
        Omsorgsovertakelse: 'Ikke implementert',
        'Foreldre av samme kjønn': 'Ikke implementert',
        'Antall barn': foreldrePenger.antallBarn
    };

    return (
        <OversiktStyling>
            <YtelserBullet tittel="Om foreldrepengeretten">
                <DescriptionList entries={foreldrePengeRetten}/>
            </YtelserBullet>
            <YtelserBullet tittel="Om barnet">
                <DescriptionList entries={barnet}/>
            </YtelserBullet>
        </OversiktStyling>
    );
}

export default Oversikt;
