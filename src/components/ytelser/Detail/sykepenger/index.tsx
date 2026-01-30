import { Heading, Table, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import { TitleValuePairsComponent } from 'src/components/ytelser/Detail';
import ArbeidsForholdListe from 'src/components/ytelser/Detail/ArbeidsforholdListe';
import {
    fjernEntriesUtenVerdi,
    formaterBoolean,
    formaterPeriode,
    formaterProsent,
    periodeEllerNull
} from 'src/components/ytelser/utils';
import type { GjeldendeForsikring, Sykepenger, SykmeldingItem } from 'src/generated/modiapersonoversikt-api';
import { datoSynkende } from 'src/utils/date-utils';
import { datoEllerNull, NOKellerNull } from 'src/utils/string-utils';

const getForsikringEntries = (forsikring?: GjeldendeForsikring | null) => {
    if (!forsikring) {
        return {};
    }
    return {
        Forsikring: NOKellerNull(forsikring.premiegrunnlag),
        'Gyldig forsikring': formaterBoolean(forsikring.erGyldig),
        Forsikringsperiode: formaterPeriode(forsikring.forsikret)
    };
};

const getYrkesskadeEntries = (sykeMeldinger?: SykmeldingItem[]) => {
    if (!sykeMeldinger) {
        return {};
    }
    const sisteSykemelding = sykeMeldinger[0];
    if (!sisteSykemelding || !sisteSykemelding.gjelderYrkesskade) {
        return {};
    }
    const yrkesSkade = sisteSykemelding.gjelderYrkesskade;
    return {
        Yrkesskade: yrkesSkade.yrkesskadeart,
        Yrkesskadedato: datoEllerNull(yrkesSkade.skadet),
        Vedtaksdato: datoEllerNull(yrkesSkade.vedtatt)
    };
};

const getSykepengertilfelletEntries = (sykepenger: Sykepenger) => {
    return {
        'Sykemeldt fra og med': datoEllerNull(sykepenger.sykmeldtFom),
        'Forbrukte dager': sykepenger.forbrukteDager,
        'Untatt aktivitet': sykepenger.unntakAktivitet,
        'Midlertidig stans': sykepenger.midlertidigStanset,
        ...fjernEntriesUtenVerdi({
            Stansårsak: sykepenger.stansaarsak,
            Sanksjonperiode: formaterPeriode(sykepenger.sanksjon)
        }),
        Ferieperioder: formaterPeriode(sykepenger.ferie1),
        ...fjernEntriesUtenVerdi({
            Ferieperioder2: formaterPeriode(sykepenger.ferie2)
        }),
        ...getForsikringEntries(sykepenger.forsikring),
        ...getYrkesskadeEntries(sykepenger.sykmeldinger)
    };
};

const Sykepengertilfellet = ({ sykepenger }: { sykepenger: Sykepenger }) => {
    const sykepengeTilfelletEntries = getSykepengertilfelletEntries(sykepenger);

    return (
        <Card padding="4">
            <Heading as="h4" size="small">
                Sykepengertilfellet
            </Heading>
            <TitleValuePairsComponent entries={sykepengeTilfelletEntries} columns={{ xs: 2, lg: 4 }} />
        </Card>
    );
};

const Arbeidssituasjon = ({ sykepenger }: { sykepenger: Sykepenger }) => {
    const arbeidssituasjonEntries = {
        Arbeidsgiverperiode: formaterBoolean(sykepenger.erArbeidsgiverperiode),
        Arbeidskategori: sykepenger.arbeidskategori
    };

    return (
        <Card padding="4">
            <Heading as="h4" size="small">
                Arbeidssituasjon
            </Heading>
            <TitleValuePairsComponent entries={arbeidssituasjonEntries} columns={{ xs: 2, lg: 4 }} />
            <ArbeidsForholdListe arbeidsForholdList={sykepenger.arbeidsforholdListe ?? []} ytelseType="Sykepenger" />
        </Card>
    );
};

const SykemeldingListe = ({ sykmelding }: { sykmelding: SykmeldingItem }) => {
    const gradAvSykmeldingListe = sykmelding.gradAvSykmeldingListe ?? [];
    const tableEntries = gradAvSykmeldingListe.map((graderingsElement) => ({
        period: formaterPeriode(graderingsElement.gradert) || undefined,
        gradering: formaterProsent(graderingsElement.sykmeldingsgrad) || undefined
    }));
    return (
        <Table size="small" zebraStripes={true}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col" className="w-28">
                        Periode
                    </Table.HeaderCell>
                    <Table.HeaderCell scope="col" className="w-28">
                        Gradering
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {tableEntries.map((entry, i) => {
                    return (
                        <Table.Row key={i}>
                            <Table.DataCell>{entry.period}</Table.DataCell>
                            <Table.DataCell>{entry.gradering}</Table.DataCell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

const Sykemelding = ({ sykmelding }: { sykmelding: SykmeldingItem }) => {
    const sykemeldingEntries = {
        Periode: periodeEllerNull(sykmelding.sykmeldt),
        Behandlingsdato: datoEllerNull(sykmelding.behandlet),
        Sykmelder: sykmelding.sykmelder
    };

    return (
        <Card padding="4">
            <Heading as="h4" size="small">
                Sykmelding
            </Heading>
            <TitleValuePairsComponent entries={sykemeldingEntries} />
            <SykemeldingListe sykmelding={sykmelding} />
        </Card>
    );
};

export const SykepengerDetails = ({ sykepenger }: { sykepenger: Sykepenger }) => {
    const aktuellSykmelding = sykepenger.sykmeldinger?.sort(
        datoSynkende((sykmelding) => sykmelding.sykmeldt?.til ?? '')
    )?.[0];

    return (
        <VStack gap="2" minHeight="0">
            <Sykepengertilfellet sykepenger={sykepenger} />
            {aktuellSykmelding && <Sykemelding sykmelding={aktuellSykmelding} />}
            <Arbeidssituasjon sykepenger={sykepenger} />
        </VStack>
    );
};
