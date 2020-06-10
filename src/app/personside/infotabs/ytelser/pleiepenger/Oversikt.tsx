import * as React from 'react';
import { Pleiepengerettighet } from '../../../../../models/ytelse/pleiepenger';
import YtelserInfoGruppe from '../felles-styling/YtelserInfoGruppe';
import DescriptionList from '../../../../../components/DescriptionList';
import { getSisteVedtakForPleiepengerettighet } from './pleiepengerUtils';
import { formaterDato } from '../../../../../utils/stringFormatting';
import { utledKjønnFraFødselsnummer } from '../../../../../utils/fnr-utils';
import { Kjønn } from '../../../../../models/person/person';
import styled from 'styled-components/macro';
import ArbeidsForholdListe from './arbeidsforhold/ArbeidsforholdListe';
import theme from '../../../../../styles/personOversiktTheme';

interface Props {
    pleiepenger: Pleiepengerettighet;
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

function Oversikt({ pleiepenger }: Props) {
    const gjeldeneVedtak = getSisteVedtakForPleiepengerettighet(pleiepenger);
    const kjønn = getKjønnString(pleiepenger.barnet);

    const omPleiepengerettenEntries = {
        'Fra og med': gjeldeneVedtak ? formaterDato(gjeldeneVedtak.periode.fom) : '',
        'Til og med': gjeldeneVedtak ? formaterDato(gjeldeneVedtak.periode.tom) : '',
        Pleiepengegrad: gjeldeneVedtak ? gjeldeneVedtak.pleiepengegrad + '%' : '',
        ['Barnet (' + kjønn + ')']: pleiepenger.barnet,
        'Annen forelder': pleiepenger.andreOmsorgsperson
    };

    return (
        <OversiktStyling>
            <YtelserInfoGruppe tittel="Om pleiepengeretten">
                <DescriptionList entries={omPleiepengerettenEntries} />
            </YtelserInfoGruppe>
            <YtelserInfoGruppe tittel="Arbeidssituasjon">
                <ArbeidsForholdListe pleiepengerettighet={pleiepenger} />
            </YtelserInfoGruppe>
        </OversiktStyling>
    );
}

export default Oversikt;
