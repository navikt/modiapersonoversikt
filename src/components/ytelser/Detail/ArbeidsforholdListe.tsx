import { Accordion, Alert, VStack } from '@navikt/ds-react';
import { TitleValuePairsComponent } from 'src/components/ytelser/Detail/index';
import type { SykmeldingArbeidsforhold } from 'src/generated/modiapersonoversikt-api';
import { formatertKontonummerString } from 'src/utils/FormatertKontonummer';
import { datoEllerNull, NOKellerNull } from 'src/utils/string-utils';

function ArbeidsForholdListe({ arbeidsForholdList }: { arbeidsForholdList: SykmeldingArbeidsforhold[] }) {
    if (!arbeidsForholdList || arbeidsForholdList.length === 0) {
        return <Alert variant="info">Ingen arbeidsgiver er registrert.</Alert>;
    }

    const getArbeidsforholdEntries = (arbeidsforhold: SykmeldingArbeidsforhold) => {
        return {
            Arbeidsgiver: arbeidsforhold.arbeidsgiverNavn,
            Kontonummer:
                arbeidsforhold.arbeidsgiverKontonr && formatertKontonummerString(arbeidsforhold.arbeidsgiverKontonr),
            Inntekstsperiode: arbeidsforhold.inntektsperiode,
            'Inntekt for perioden': NOKellerNull(arbeidsforhold.inntektForPerioden),
            Refusjonstype: arbeidsforhold.refusjonstype,
            'Refusjon til dato': datoEllerNull(arbeidsforhold.refusjonTom),
            'Sykepenger fra og med': datoEllerNull(arbeidsforhold.sykepengerFom)
        };
    };

    return (
        <VStack gap="space-4">
            <Accordion size="small">
                {arbeidsForholdList.map((arbeidsForhold, index) => {
                    return (
                        <Accordion.Item key={index} defaultOpen>
                            <Accordion.Header>Arbeidsgiver: {arbeidsForhold.arbeidsgiverNavn}</Accordion.Header>
                            <Accordion.Content>
                                <TitleValuePairsComponent
                                    entries={getArbeidsforholdEntries(arbeidsForhold)}
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
