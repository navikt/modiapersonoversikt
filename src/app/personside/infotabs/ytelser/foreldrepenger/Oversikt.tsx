import { type Foreldrepengerettighet, isAdopsjon, isFodsel } from 'src/models/ytelse/foreldrepenger';
import { datoEllerNull, formaterDato, prosentEllerNull } from 'src/utils/string-utils';
import styled from 'styled-components';
import DescriptionList, {
    type DescriptionListEntries,
    fjernEntriesUtenVerdi
} from '../../../../../components/DescriptionList';
import theme from '../../../../../styles/personOversiktTheme';
import ArbeidsForholdListe from '../arbeidsforhold/ArbeidsforholdListe';
import YtelserInfoGruppe from '../felles-styling/YtelserInfoGruppe';
import { utledFraDatoForRettighet } from './foreldrePengerUtils';

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
    if (isFodsel(foreldrePenger)) {
        return {
            Termindato: datoEllerNull(foreldrePenger.termin)
        };
    }
    if (isAdopsjon(foreldrePenger)) {
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
            'Mødrekvote til og med': datoEllerNull(foreldrePenger.modrekvoteTom),
            'Fedrekvote til og med': datoEllerNull(foreldrePenger.fedrekvoteTom)
        })
    };

    const barnet: DescriptionListEntries = {
        ...omsorgsovertakelseEllerTermin(foreldrePenger),
        Fødselsdato: datoEllerNull(foreldrePenger.barnetsFodselsdato),
        'Annen forelder': foreldrePenger.andreForeldersFnr,
        'Antall barn': foreldrePenger.antallBarn,
        ...fjernEntriesUtenVerdi({
            'Foreldre av samme kjønn': foreldrePenger.foreldreAvSammeKjonn
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
                <ArbeidsForholdListe arbeidsForhold={foreldrePenger.arbeidsforhold} />
            </YtelserInfoGruppe>
        </OversiktStyling>
    );
}

export default Oversikt;
