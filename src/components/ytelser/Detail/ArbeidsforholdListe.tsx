import { Accordion, Alert, VStack } from '@navikt/ds-react';
import { TitleValuePairsComponent } from 'src/components/ytelser/Detail/index';
import type {
    ForeldrepengerArbeidsforhold,
    PleiepengerArbeidsforhold,
    SykmeldingArbeidsforhold
} from 'src/generated/modiapersonoversikt-api';
import { FormatertKontonummer } from 'src/utils/FormatertKontonummer';
import { datoEllerNull, NOKellerNull } from 'src/utils/string-utils';

function ArbeidsForholdListe({
    arbeidsForholdList,
    ytelseType
}: {
    arbeidsForholdList: (ForeldrepengerArbeidsforhold | PleiepengerArbeidsforhold | SykmeldingArbeidsforhold)[];
    ytelseType: 'ForeldrepengerRettighet' | 'Pleiepenger' | 'Sykepenger';
}) {
    if (!arbeidsForholdList || arbeidsForholdList.length === 0) {
        return <Alert variant="info">Ingen arbeidsgiver er registrert.</Alert>;
    }

    const getPleiepengerArbeidsforholdEntries = (pleiepengerArbeidsforhold: PleiepengerArbeidsforhold) => {
        return {
            Arbeidsgiver: pleiepengerArbeidsforhold.arbeidsgiverNavn,
            Arbeidskategori: pleiepengerArbeidsforhold.arbeidskategori,
            Inntekstsperiode: pleiepengerArbeidsforhold.inntektsperiode,
            Kontonummer: pleiepengerArbeidsforhold.arbeidsgiverKontonr && (
                <FormatertKontonummer kontonummer={pleiepengerArbeidsforhold.arbeidsgiverKontonr} />
            ),
            Refusjonstype: pleiepengerArbeidsforhold.refusjonstype,
            'Inntekt for perioden': NOKellerNull(pleiepengerArbeidsforhold.inntektForPerioden),
            'Refusjon til dato': datoEllerNull(pleiepengerArbeidsforhold.refusjonTom)
        };
    };

    const getArbeidsforholdEntries = (arbeidsforhold: ForeldrepengerArbeidsforhold | SykmeldingArbeidsforhold) => {
        return {
            Arbeidsgiver: arbeidsforhold.arbeidsgiverNavn,
            Kontonummer: arbeidsforhold.arbeidsgiverKontonr && (
                <FormatertKontonummer kontonummer={arbeidsforhold.arbeidsgiverKontonr} />
            ),
            Inntekstsperiode: arbeidsforhold.inntektsperiode,
            'Inntekt for perioden': NOKellerNull(arbeidsforhold.inntektForPerioden),
            Refusjonstype: arbeidsforhold.refusjonstype,
            'Refusjon til dato': datoEllerNull(arbeidsforhold.refusjonTom),
            'Sykepenger fra og med': datoEllerNull(arbeidsforhold.sykepengerFom)
        };
    };

    const getArbeidsForholdEntries = (
        arbeidsforhold: ForeldrepengerArbeidsforhold | PleiepengerArbeidsforhold | SykmeldingArbeidsforhold
    ) => {
        switch (ytelseType) {
            case 'ForeldrepengerRettighet':
                return getArbeidsforholdEntries(arbeidsforhold);
            case 'Sykepenger':
                return getArbeidsforholdEntries(arbeidsforhold);
            case 'Pleiepenger':
                return getPleiepengerArbeidsforholdEntries(arbeidsforhold);
            default:
                return {};
        }
    };

    return (
        <VStack gap="1">
            <Accordion size="small" headingSize="xsmall">
                {arbeidsForholdList.map((arbeidsForhold, index) => {
                    return (
                        <Accordion.Item key={index} defaultOpen>
                            <Accordion.Header>Arbeidsgiver: {arbeidsForhold.arbeidsgiverNavn}</Accordion.Header>
                            <Accordion.Content>
                                <TitleValuePairsComponent
                                    entries={getArbeidsForholdEntries(arbeidsForhold)}
                                    columns={{ xs: 2, lg: 4 }}
                                />
                            </Accordion.Content>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        </VStack>
    );
}

export default ArbeidsForholdListe;
