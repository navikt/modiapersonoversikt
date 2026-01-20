import { Accordion, Heading, Table, VStack } from '@navikt/ds-react';
import type { UseQueryResult } from '@tanstack/react-query';
import type { FetchError } from 'src/api/api';
import type { Data as Persondata } from 'src/app/personside/visittkort-v2/PersondataDomain';
import { Kjonn } from 'src/app/personside/visittkort-v2/PersondataDomain';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { TitleValuePairsComponent } from 'src/components/ytelser/Detail';
import ArbeidsForholdListe from 'src/components/ytelser/Detail/ArbeidsforholdListe';
import {
    getPleiepengerArbiedsforholdSortert,
    getSisteVedtakForPleiepenger,
    sorterPleiepengerPerioder
} from 'src/components/ytelser/utils';
import type { Pleiepenger, PleiepengerPeriode } from 'src/generated/modiapersonoversikt-api';
import persondataResource from 'src/rest/resources/persondataResource';
import { datoEllerTomString, NOKellerNull, prosentEllerNull } from 'src/utils/string-utils';

const getKjonnString = (kjonn?: Kjonn) => {
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
};

const hentKjonnTilBarn = (persondata: UseQueryResult<Persondata, FetchError>, barnFnr: string): string => {
    const barn = persondata.data?.person?.forelderBarnRelasjon?.filter((relasjon) => relasjon.ident === barnFnr) ?? [];

    if (barn.isEmpty()) {
        return '';
    }
    const kjonnTilBarn = barn[0].kjonn.firstOrNull()?.kode;
    return getKjonnString(kjonnTilBarn);
};

const getPleiePengerRettenEntries = (pleiePenger: Pleiepenger) => {
    const gjeldeneVedtak = getSisteVedtakForPleiepenger(pleiePenger);
    const persondata = persondataResource.useFetch();
    const kjonn = hentKjonnTilBarn(persondata, pleiePenger.barnet ?? '');

    return {
        'Fra og med': datoEllerTomString(gjeldeneVedtak?.periode?.fom),
        'Til og med': datoEllerTomString(gjeldeneVedtak?.periode?.tom),
        Pleiepengegrad: gjeldeneVedtak ? `${gjeldeneVedtak.pleiepengegrad}%` : '',
        [`Barnet (${kjonn})`]: pleiePenger.barnet,
        'Annen forelder': pleiePenger.andreOmsorgsperson
    };
};

const PleiePengerRetten = ({ pleiePenger }: { pleiePenger: Pleiepenger }) => {
    return (
        <Card padding="4">
            <Heading as="h4" size="small">
                Om pleiepengerrettighet
            </Heading>
            <TitleValuePairsComponent entries={getPleiePengerRettenEntries(pleiePenger)} columns={4} />
        </Card>
    );
};

const PleieVedtaker = ({ periode }: { periode: PleiepengerPeriode }) => {
    const vedtakter = periode.vedtak ?? [];
    const vedtakEntries = vedtakter.map((vedtak) => ({
        fom: datoEllerTomString(vedtak.periode?.fom),
        tom: datoEllerTomString(vedtak.periode?.tom),
        bruttobelop: NOKellerNull(vedtak.bruttobelop),
        anvistUtbetaling: datoEllerTomString(vedtak.anvistUtbetaling),
        dagsats: NOKellerNull(vedtak.dagsats),
        pleiepengegrad: prosentEllerNull(vedtak.pleiepengegrad)
    }));

    return (
        <Table size="small" zebraStripes={true}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col" className="w-28">
                        Fra og med
                    </Table.HeaderCell>
                    <Table.HeaderCell scope="col" className="w-28">
                        Til og med
                    </Table.HeaderCell>
                    <Table.HeaderCell scope="col" className="w-28">
                        Bruttobeløp
                    </Table.HeaderCell>
                    <Table.HeaderCell scope="col" className="w-28">
                        Anvist utbetaling
                    </Table.HeaderCell>
                    <Table.HeaderCell scope="col" className="w-28">
                        Dagsats
                    </Table.HeaderCell>
                    <Table.HeaderCell scope="col" className="w-28">
                        Pleiepengegrad
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {vedtakEntries.map((entry, i) => {
                    return (
                        <Table.Row key={i + entry.fom}>
                            <Table.DataCell>{entry.fom}</Table.DataCell>
                            <Table.DataCell>{entry.tom}</Table.DataCell>
                            <Table.DataCell>{entry.bruttobelop}</Table.DataCell>
                            <Table.DataCell>{entry.anvistUtbetaling}</Table.DataCell>
                            <Table.DataCell>{entry.dagsats}</Table.DataCell>
                            <Table.DataCell>{entry.pleiepengegrad}</Table.DataCell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

const PleiePengerPerioder = ({ pleiePenger }: { pleiePenger: Pleiepenger }) => {
    const sortertePerioder = sorterPleiepengerPerioder(pleiePenger);

    return (
        <Card padding="4">
            <Heading as="h4" size="small">
                Perioder
            </Heading>
            <Accordion size="small" headingSize="xsmall">
                {sortertePerioder.map((entry, index) => {
                    return (
                        <Accordion.Item key={index} defaultOpen>
                            <Accordion.Header>{`Periode ${index + 1} - ${datoEllerTomString(entry.fom)}`}</Accordion.Header>
                            <Accordion.Content>
                                <Heading as="h3" size="small">
                                    Anviste utbetalinger
                                </Heading>
                                <PleieVedtaker periode={entry} />
                            </Accordion.Content>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        </Card>
    );
};

const Arbeidssituasjon = ({ pleiePenger }: { pleiePenger: Pleiepenger }) => {
    const arbeidsforhold = getPleiepengerArbiedsforholdSortert(pleiePenger);
    return (
        <Card padding="4">
            <Heading as="h4" size="small">
                Arbeidssituasjon
            </Heading>
            <ArbeidsForholdListe arbeidsForholdList={arbeidsforhold} ytelseType="Pleiepenger" />
        </Card>
    );
};

export const PleiePengerDetails = ({ pleiePenger }: { pleiePenger: Pleiepenger }) => {
    return (
        <VStack gap="2" minHeight="0">
            <ErrorBoundary boundaryName="pleiePengerDetails">
                <PleiePengerRetten pleiePenger={pleiePenger} />
                <PleiePengerPerioder pleiePenger={pleiePenger} />
                <Arbeidssituasjon pleiePenger={pleiePenger} />
            </ErrorBoundary>
        </VStack>
    );
};
