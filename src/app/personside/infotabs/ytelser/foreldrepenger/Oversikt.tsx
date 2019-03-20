import * as React from 'react';
import { useState } from 'react';
import { Foreldrepengerettighet, isAdopsjon, isFødsel } from '../../../../../models/ytelse/foreldrepenger';
import { sorterArbeidsforholdEtterRefusjonTom, utledFraDatoForRettighet } from './foreldrePengerUtils';
import DescriptionList, {
    DescriptionListEntries,
    fjernEntriesUtenVerdi
} from '../../../../../components/DescriptionList';
import YtelserInfoGruppe from '../felles-styling/YtelserInfoGruppe';
import { OversiktStyling } from '../felles-styling/CommonStylingYtelser';
import ArbeidsForhold from './Arbeidsforhold';
import styled from 'styled-components/macro';
import theme from '../../../../../styles/personOversiktTheme';
import DetaljerCollapse from '../../../../../components/DetaljerCollapse';
import { datoEllerNull, formaterDato, prosentEllerNull } from '../../../../../utils/stringFormatting';

interface Props {
    foreldrePenger: Foreldrepengerettighet;
}

const ArbeidsForholdListeStyle = styled.ol`
    list-style: none;
    > *:not(:first-child) {
        border-top: ${theme.border.skilleSvak};
    }
    > *:not(:last-child) {
        margin-bottom: 2rem;
    }
`;

const Luft = styled.div`
    margin-top: 2rem;
`;

function AlleArbeidsforhold(props: { foreldrePenger: Foreldrepengerettighet }) {
    const [gjeldendeArbeidsforhold, ...tidligereArbeidsforhold] = sorterArbeidsforholdEtterRefusjonTom(
        props.foreldrePenger
    );

    const [visAlleArbeidsforhold, setVisalleArbeidsforhold] = useState(false);

    const tidligereArbeidsforholdCollapse = (
        <DetaljerCollapse
            open={visAlleArbeidsforhold}
            toggle={() => setVisalleArbeidsforhold(!visAlleArbeidsforhold)}
            tittel="alle arbeidsforhold"
        >
            <ArbeidsForholdListeStyle aria-label="Andre arbeidsforhold">
                {tidligereArbeidsforhold.map((arbForhold, index) => (
                    <li key={index}>
                        <ArbeidsForhold arbeidsforhold={arbForhold} />
                    </li>
                ))}
            </ArbeidsForholdListeStyle>
        </DetaljerCollapse>
    );

    const flereArbeidsforhold = tidligereArbeidsforhold.length > 0;
    return (
        <>
            <ArbeidsForhold arbeidsforhold={gjeldendeArbeidsforhold} />
            {flereArbeidsforhold && tidligereArbeidsforholdCollapse}
        </>
    );
}

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
    return {
        Termindato: null
    };
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
            <div>
                <YtelserInfoGruppe tittel="Om foreldrepengeretten">
                    <DescriptionList entries={foreldrePengeRetten} />
                </YtelserInfoGruppe>
                <Luft />
                <YtelserInfoGruppe tittel="Om barnet">
                    <DescriptionList entries={barnet} />
                </YtelserInfoGruppe>
            </div>
            <YtelserInfoGruppe tittel="Arbeidssituasjon">
                <AlleArbeidsforhold foreldrePenger={foreldrePenger} />
            </YtelserInfoGruppe>
        </OversiktStyling>
    );
}

export default Oversikt;
