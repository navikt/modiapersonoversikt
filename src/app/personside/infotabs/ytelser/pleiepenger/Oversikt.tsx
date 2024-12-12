import type { UseQueryResult } from '@tanstack/react-query';
import type { FetchError } from 'src/api/api';
import ArbeidsForholdListe from 'src/app/personside/infotabs/ytelser/arbeidsforhold/ArbeidsforholdListe';
import type { Pleiepengerettighet } from 'src/models/ytelse/pleiepenger';
import { formaterDato } from 'src/utils/string-utils';
import styled from 'styled-components';
import DescriptionList from '../../../../../components/DescriptionList';
import persondataResource from '../../../../../rest/resources/persondataResource';
import theme from '../../../../../styles/personOversiktTheme';
import { Kjonn, type Data as Persondata } from '../../../visittkort-v2/PersondataDomain';
import YtelserInfoGruppe from '../felles-styling/YtelserInfoGruppe';
import { getAlleArbiedsforholdSortert, getSisteVedtakForPleiepengerettighet } from './pleiepengerUtils';

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

function hentKjonnTilBarn(persondata: UseQueryResult<Persondata, FetchError>, barnFnr: string): string {
    const barn = persondata.data?.person?.forelderBarnRelasjon?.filter((relasjon) => relasjon.ident === barnFnr) ?? [];

    if (barn.isEmpty()) {
        return '';
    }
    const kjonnTilBarn = barn[0].kjonn.firstOrNull()?.kode;
    return getKjonnString(kjonnTilBarn);
}

function Oversikt({ pleiepenger }: Props) {
    const gjeldeneVedtak = getSisteVedtakForPleiepengerettighet(pleiepenger);
    const persondata = persondataResource.useFetch();
    const kjonn = hentKjonnTilBarn(persondata, pleiepenger.barnet);

    const omPleiepengerettenEntries = {
        'Fra og med': gjeldeneVedtak ? formaterDato(gjeldeneVedtak.periode.fom) : '',
        'Til og med': gjeldeneVedtak ? formaterDato(gjeldeneVedtak.periode.tom) : '',
        Pleiepengegrad: gjeldeneVedtak ? `${gjeldeneVedtak.pleiepengegrad}%` : '',
        [`Barnet (${kjonn})`]: pleiepenger.barnet,
        'Annen forelder': pleiepenger.andreOmsorgsperson
    };

    return (
        <OversiktStyling>
            <YtelserInfoGruppe tittel="Om pleiepengeretten">
                <DescriptionList entries={omPleiepengerettenEntries} />
            </YtelserInfoGruppe>
            <YtelserInfoGruppe tittel="Arbeidssituasjon">
                <ArbeidsForholdListe arbeidsForhold={getAlleArbiedsforholdSortert(pleiepenger)} />
            </YtelserInfoGruppe>
        </OversiktStyling>
    );
}

export default Oversikt;
