import { Accordion, Heading, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import { TitleValuePairsComponent } from 'src/components/ytelser/Detail';
import ArbeidsForholdListe from 'src/components/ytelser/Detail/ArbeidsforholdListe';
import { fjernEntriesUtenVerdi, periodeEllerNull, utledFraDatoForForeldrePenger } from 'src/components/ytelser/utils';
import type { ForeldrepengePeriode, Foreldrepenger } from 'src/generated/modiapersonoversikt-api';
import { convertBoolTilJaNei, datoEllerTomString, formaterDato, prosentEllerNull } from 'src/utils/string-utils';

const omsorgsovertakelseEllerTermin = (foreldrePenger: Foreldrepenger) => {
    if (foreldrePenger.termin) {
        return {
            Termindato: datoEllerTomString(foreldrePenger.termin)
        };
    }
    if (foreldrePenger.omsorgsovertakelse) {
        return {
            Omsorgsovertakelse: datoEllerTomString(foreldrePenger.omsorgsovertakelse)
        };
    }
    return {};
};

const getForeldrePengerBarnetEntries = (foreldrePenger: Foreldrepenger) => {
    return {
        ...omsorgsovertakelseEllerTermin(foreldrePenger),
        Fødselsdato: datoEllerTomString(foreldrePenger.barnetsFodselsdato),
        'Annen forelder': foreldrePenger.andreForeldersFnr,
        'Antall barn': foreldrePenger.antallBarn,
        ...fjernEntriesUtenVerdi({
            'Foreldre av samme kjønn': foreldrePenger.foreldreAvSammeKjonn
        })
    };
};

const getForeldrePengerRettenEntries = (foreldrePenger: Foreldrepenger) => {
    return {
        Foreldrepengetype: foreldrePenger.foreldrepengetype,
        Dekningsgrad: prosentEllerNull(foreldrePenger.dekningsgrad),
        'Rettighet fra dato': formaterDato(utledFraDatoForForeldrePenger(foreldrePenger)),
        ...fjernEntriesUtenVerdi({
            Graderingsdager: foreldrePenger.graderingsdager
        }),
        Restdager: foreldrePenger.restDager,
        Maksdato: foreldrePenger.slutt && formaterDato(foreldrePenger.slutt),
        Arbeidskategori: foreldrePenger.arbeidskategori,
        ...fjernEntriesUtenVerdi({
            'Mødrekvote til og med': datoEllerTomString(foreldrePenger.modrekvoteTom),
            'Fedrekvote til og med': datoEllerTomString(foreldrePenger.fedrekvoteTom)
        })
    };
};

const getForeldrePengerPeriodeEntries = (periode: ForeldrepengePeriode) => {
    return {
        ...fjernEntriesUtenVerdi({
            'Arbeidsprosent mor': prosentEllerNull(periode.arbeidsprosentMor),
            'Mors situasjon': periode.morSituasjon,
            'Disponibel gradering': prosentEllerNull(periode.disponibelGradering),
            Forskyvelsesperiode: periodeEllerNull(periode.forskyvelsesperiode1),
            Forskyvelsesårsak: periode.forskyvelsesaarsak1,
            'Andre forskyvelsesperiode': periodeEllerNull(periode.forskyvelsesperiode2),
            'Andre forskyvelsesårsak': periode.forskyvelsesaarsak2
        }),
        'Midlertidig stans': periode.midlertidigStansDato,
        ...fjernEntriesUtenVerdi({
            Stansårsak: periode.stansaarsak,
            Avslått: periode.avslaatt
        }),
        Mødrekvote: convertBoolTilJaNei(periode.erModrekvote),
        'Rett til Mødrekvote': periode.rettTilModrekvote,
        'Aleneomsorg Mor': convertBoolTilJaNei(periode.harAleneomsorgMor),
        Fedrekvote: convertBoolTilJaNei(periode.erFedrekvote),
        'Rett til Fedrekvote': periode.rettTilFedrekvote,
        'Aleneomsorg Far': convertBoolTilJaNei(periode.harAleneomsorgFar)
    };
};

const ForeldrePengerRetten = ({ foreldrePenger }: { foreldrePenger: Foreldrepenger }) => {
    return (
        <Card padding="4">
            <Heading as="h4" size="small">
                Om foreldrepengeretten
            </Heading>
            <TitleValuePairsComponent
                entries={getForeldrePengerRettenEntries(foreldrePenger)}
                columns={{ xs: 2, lg: 4 }}
            />
        </Card>
    );
};

const ForeldrePengerRettenBarnet = ({ foreldrePenger }: { foreldrePenger: Foreldrepenger }) => {
    return (
        <Card padding="4">
            <Heading as="h4" size="small">
                Om barnet
            </Heading>
            <TitleValuePairsComponent
                entries={getForeldrePengerBarnetEntries(foreldrePenger)}
                columns={{ xs: 2, lg: 4 }}
            />
        </Card>
    );
};

const ForeldrepengePerioder = ({ foreldrePenger }: { foreldrePenger: Foreldrepenger }) => {
    const perioder = foreldrePenger.periode ?? [];
    return (
        <Card padding="4">
            <Heading as="h4" size="small">
                Perioder
            </Heading>
            <Accordion size="small" headingSize="xsmall">
                {perioder.map((periode, index) => {
                    return (
                        <Accordion.Item key={index} defaultOpen>
                            <Accordion.Header>{`Periode ${index + 1} - ${datoEllerTomString(periode.foreldrepengerFom)}`}</Accordion.Header>
                            <Accordion.Content>
                                <TitleValuePairsComponent
                                    entries={getForeldrePengerPeriodeEntries(periode)}
                                    columns={{ xs: 2, lg: 4 }}
                                />
                            </Accordion.Content>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        </Card>
    );
};

const Arbeidssituasjon = ({ foreldrePenger }: { foreldrePenger: Foreldrepenger }) => {
    return (
        <Card padding="4">
            <Heading as="h4" size="small">
                Arbeidssituasjon
            </Heading>
            <ArbeidsForholdListe
                arbeidsForholdList={foreldrePenger.arbeidsforhold ?? []}
                ytelseType="ForeldrepengerRettighet"
            />
        </Card>
    );
};

export const ForeldrePengerDetails = ({ foreldrePenger }: { foreldrePenger: Foreldrepenger }) => {
    return (
        <VStack gap="1" minHeight="0">
            <ForeldrePengerRetten foreldrePenger={foreldrePenger} />
            <ForeldrePengerRettenBarnet foreldrePenger={foreldrePenger} />
            <ForeldrepengePerioder foreldrePenger={foreldrePenger} />
            <Arbeidssituasjon foreldrePenger={foreldrePenger} />
        </VStack>
    );
};
