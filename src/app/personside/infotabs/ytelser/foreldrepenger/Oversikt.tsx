import * as React from 'react';
import { Foreldrepengerettighet, isAdopsjon, isFødsel } from '../../../../../models/ytelse/foreldrepenger';
import { utledFraDatoForRettighet } from './foreldrePengerUtils';
import DescriptionList, {
    DescriptionListEntries,
    fjernEntriesUtenVerdi
} from '../../../../../components/DescriptionList';
import YtelserInfoGruppe from '../felles-styling/YtelserInfoGruppe';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { datoEllerNull, formaterDato, prosentEllerNull } from '../../../../../utils/stringFormatting';
import ArbeidsForholdListe from '../arbeidsforhold/ArbeidsforholdListe';

interface Props {
    foreldrePenger: Foreldrepengerettighet;
}

const OversiktStyling = styled.div`
    padding: ${theme.margin.layout};
    display: flex;
    flex-wrap: wrap;
    > * {
        flex-basis: 40%;
        flex-grow: 1;
    }
`;

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    > * {
        flex-grow: 1;
    }
`;

function omsorgsovertakelseEllerTermin(foreldrePenger: Foreldrepengerettighet) {
    if (isFødsel(foreldrePenger)) {
        return {
            Termindato: datoEllerNull(foreldrePenger.termin)
        };
    } else if (isAdopsjon(foreldrePenger)) {
        return {
            Omsorgsovertakelse: datoEllerNull(foreldrePenger.omsorgsovertakelse)
        };
    }
    return {};
}

function Oversikt({ foreldrePenger }: Props) {
    const foreldrePengeRetten: DescriptionListEntries = {
        Foreldrepengetype: foreldrePenger.foreldrepengetype,
        Dekningsgrad: prosentEllerNull(foreldrePenger.dekningsgrad),
        'Rettighet fra dato': formaterDato(utledFraDatoForRettighet(foreldrePenger)),
        ...fjernEntriesUtenVerdi({
            Graderingsdager: foreldrePenger.graderingsdager
        }),
        Restdager: foreldrePenger.restDager,
        Maksdato: foreldrePenger.slutt && formaterDato(foreldrePenger.slutt),
        Arbeidskategori: foreldrePenger.arbeidskategori,
        ...fjernEntriesUtenVerdi({
            'Mødrekvote til og med': datoEllerNull(foreldrePenger.mødrekvoteTom),
            'Fedrekvote til og med': datoEllerNull(foreldrePenger.fedrekvoteTom)
        })
    };

    const barnet: DescriptionListEntries = {
        ...omsorgsovertakelseEllerTermin(foreldrePenger),
        Fødselsdato: datoEllerNull(foreldrePenger.barnetsFødselsdato),
        'Annen forelder': foreldrePenger.andreForeldersFnr,
        'Antall barn': foreldrePenger.antallBarn,
        ...fjernEntriesUtenVerdi({
            'Foreldre av samme kjønn': foreldrePenger.foreldreAvSammeKjønn
        })
    };

    return (
        <OversiktStyling>
            <Flex>
                <YtelserInfoGruppe tittel="Om foreldrepengeretten">
                    <DescriptionList entries={foreldrePengeRetten} />
                </YtelserInfoGruppe>
                <YtelserInfoGruppe tittel="Om barnet">
                    <DescriptionList entries={barnet} />
                </YtelserInfoGruppe>
            </Flex>
            <YtelserInfoGruppe tittel="Arbeidssituasjon">
                <ArbeidsForholdListe ytelse={foreldrePenger} arbeidsForhold={foreldrePenger.arbeidsforhold} />
            </YtelserInfoGruppe>
        </OversiktStyling>
    );
}

export default Oversikt;
