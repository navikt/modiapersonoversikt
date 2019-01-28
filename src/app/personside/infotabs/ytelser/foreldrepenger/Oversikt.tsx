import * as React from 'react';
import { Foreldrepengerettighet } from '../../../../../models/ytelse/foreldrepenger';
import { utledFraDatoForRettighet, utledMaksDato } from './foreldrePengerUtils';
import { datoVerbose } from '../../utbetalinger/utils/utbetalingerUtils';
import DescriptionList from '../felles-styling/DescriptionList';
import YtelserInfoGruppe from '../felles-styling/YtelserInfoGruppe';
import { OversiktStyling } from '../felles-styling/CommonStylingYtelser';

interface Props {
    foreldrePenger: Foreldrepengerettighet;
}

function Oversikt({foreldrePenger}: Props) {

    const foreldrePengeRetten = {
        Foreldrepengetype: foreldrePenger.foreldrepengetype,
        Dekningsgrad: foreldrePenger.dekningsgrad + '%',
        'Rettighet fra dato': datoVerbose(utledFraDatoForRettighet(foreldrePenger)).sammensatt,
        Restdager: foreldrePenger.restDager,
        Maksdato: utledMaksDato(foreldrePenger),
        Arbeidskategori: foreldrePenger.arbeidskategori
    };

    const barnet = {
        Termindato: foreldrePenger.rettighetFom && datoVerbose(foreldrePenger.rettighetFom).sammensatt,
        Fødselsdato: foreldrePenger.barnetsFødselsdato && datoVerbose(foreldrePenger.barnetsFødselsdato).sammensatt,
        'Annen forelder': foreldrePenger.andreForeldersFnr,
        [foreldrePenger.termin && 'Termindato' || foreldrePenger.omsorgsovertakelse && 'Omsorgsovertagelse' || 'N/A']:
        foreldrePenger.termin || foreldrePenger.omsorgsovertakelse || 'N/A',
        'Foreldre av samme kjønn': foreldrePenger.foreldreAvSammeKjønn ,
        'Antall barn': foreldrePenger.antallBarn
    };

    return (
        <OversiktStyling>
            <YtelserInfoGruppe tittel="Om foreldrepengeretten">
                <DescriptionList entries={foreldrePengeRetten}/>
            </YtelserInfoGruppe>
            <YtelserInfoGruppe tittel="Om barnet">
                <DescriptionList entries={barnet}/>
            </YtelserInfoGruppe>
        </OversiktStyling>
    );
}

export default Oversikt;
