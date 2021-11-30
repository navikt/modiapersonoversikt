import * as React from 'react';
import { Pleiepengerettighet } from '../../../../../models/ytelse/pleiepenger';
import YtelserInfoGruppe from '../felles-styling/YtelserInfoGruppe';
import DescriptionList from '../../../../../components/DescriptionList';
import { getSisteVedtakForPleiepengerettighet } from './pleiepengerUtils';
import { formaterDato } from '../../../../../utils/string-utils';
import { Data as Persondata, Kjonn } from '../../../visittkort-v2/PersondataDomain';
import styled from 'styled-components/macro';
import ArbeidsForholdListe from './arbeidsforhold/ArbeidsforholdListe';
import theme from '../../../../../styles/personOversiktTheme';
import { useHentPersondata } from '../../../../../utils/customHooks';
import { FetchResult, hasData } from '@nutgaard/use-fetch';

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

function getKjonnString(kjonn: Kjonn | undefined): string {
    switch (kjonn) {
        case Kjonn.M:
            return 'gutt';
        case Kjonn.K:
            return 'jente';
        case Kjonn.U:
            return 'ukjent';
        default:
            return '';
    }
}

function hentKjonnTilBarn(persondata: FetchResult<Persondata>, barnFnr: string): string {
    const person = hasData(persondata) ? persondata.data.person : null;
    const barn = person?.forelderBarnRelasjon.filter((relasjon) => relasjon.ident === barnFnr) ?? null;
    if (!barn || barn.isEmpty()) {
        return '';
    }
    const kjonnTilBarn = barn[0].kjonn.firstOrNull()?.kode;
    return getKjonnString(kjonnTilBarn);
}

function Oversikt({ pleiepenger }: Props) {
    const gjeldeneVedtak = getSisteVedtakForPleiepengerettighet(pleiepenger);
    const persondata = useHentPersondata();
    const kjonn = hentKjonnTilBarn(persondata, pleiepenger.barnet);

    const omPleiepengerettenEntries = {
        'Fra og med': gjeldeneVedtak ? formaterDato(gjeldeneVedtak.periode.fom) : '',
        'Til og med': gjeldeneVedtak ? formaterDato(gjeldeneVedtak.periode.tom) : '',
        Pleiepengegrad: gjeldeneVedtak ? gjeldeneVedtak.pleiepengegrad + '%' : '',
        ['Barnet (' + kjonn + ')']: pleiepenger.barnet,
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
