import { Accordion, Alert, VStack } from '@navikt/ds-react';
import { TitleValuePairsComponent } from 'src/components/ytelser/Detail/index';
import type {
    ForeldrepengerArbeidsforhold,
    PleiepengerArbeidsforhold,
    SykmeldingArbeidsforhold
} from 'src/generated/modiapersonoversikt-api';
import { YtelseVedtakYtelseType } from 'src/generated/modiapersonoversikt-api';
import { FormatertKontonummer } from 'src/utils/FormatertKontonummer';
import { NOKellerNull, datoEllerNull } from 'src/utils/string-utils';

function ArbeidsForholdListe({
    arbeidsForholdList,
    ytelseType,
    columns
}: {
    arbeidsForholdList: (ForeldrepengerArbeidsforhold | PleiepengerArbeidsforhold | SykmeldingArbeidsforhold)[];
    ytelseType: YtelseVedtakYtelseType;
    columns?: number;
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
            case YtelseVedtakYtelseType.Foreldrepenger:
                return getArbeidsforholdEntries(arbeidsforhold);
            case YtelseVedtakYtelseType.Sykepenger:
                return getArbeidsforholdEntries(arbeidsforhold);
            case YtelseVedtakYtelseType.Pleiepenger:
                return getPleiepengerArbeidsforholdEntries(arbeidsforhold);
            case YtelseVedtakYtelseType.Tiltakspenge:
                return {};
            case YtelseVedtakYtelseType.Pensjon:
                return {};
            default:
                return {};
        }
    };

    return (
        <VStack gap="2">
            <Accordion size="small" headingSize="xsmall">
                {arbeidsForholdList.map((arbeidsForhold, index) => {
                    return (
                        <Accordion.Item key={index} defaultOpen>
                            <Accordion.Header>Arbeidsgiver: {arbeidsForhold.arbeidsgiverNavn}</Accordion.Header>
                            <Accordion.Content>
                                <TitleValuePairsComponent
                                    entries={getArbeidsForholdEntries(arbeidsForhold)}
                                    columns={columns}
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
