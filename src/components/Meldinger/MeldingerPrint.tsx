import { BodyShort, Box, HStack, Heading, VStack } from '@navikt/ds-react';
import type { PropsWithChildren } from 'react';
import { usePersonAtomValue } from 'src/lib/state/context';
import type { Journalpost, Melding, Traad } from 'src/lib/types/modiapersonoversikt-api';
import { datoStigende, formatterDato, formatterDatoTid } from 'src/utils/date-utils';
import { formaterDato } from 'src/utils/string-utils';
import RichText, { defaultRules, HighlightRule, SladdRule } from '../RichText';
import { meldingstittel } from './List/utils';

const Element = ({ children }: PropsWithChildren) => <BodyShort weight="semibold">{children}</BodyShort>;

type Props = {
    traad: Traad;
};

function JournalposterMarkup(props: { journalposter: Journalpost[] }) {
    if (props.journalposter.isEmpty()) {
        return null;
    }
    const journalposter = props.journalposter.map((journalpost) => {
        const dato = formatterDato(journalpost.journalfortDato);
        const tema = journalpost.journalfortTemanavn;
        const saksid = journalpost.journalfortSaksid ? `saksid ${journalpost.journalfortSaksid}` : 'ukjent saksid';

        return (
            <BodyShort
                key={journalpost.journalfortDato + journalpost.journalfortSaksid}
            >{`${dato}: ${tema} (${saksid})`}</BodyShort>
        );
    });

    return (
        <>
            <Element>Journalført:</Element>
            {journalposter}
        </>
    );
}

function EnkeltMeldingMarkup({ melding }: { melding: Melding }) {
    const fnr = usePersonAtomValue();
    const tittel = meldingstittel(melding);
    const temagruppe = melding.temagruppe && <Element>Temagruppe: {melding.temagruppe}</Element>;

    const lest = melding.lestDato ? (
        <BodyShort>Lest: {formatterDatoTid(melding.lestDato)}</BodyShort>
    ) : (
        <BodyShort>Ulest</BodyShort>
    );

    return (
        <Box.New marginBlock="0 8" borderColor="neutral-subtle" className="border-b break-inside-avoid">
            <Box.New marginBlock="2">
                <Heading size="small" textColor="subtle" as="h2">
                    {tittel}
                </Heading>
            </Box.New>
            <HStack justify="space-between" marginBlock="8">
                <div>
                    <Element>Skrevet av: {melding.skrevetAvTekst}</Element>
                    <Element>Kanal: NAV_NO</Element>
                    <Element>Type: {melding.meldingstype}</Element>
                    {temagruppe}
                </div>
                <div>
                    <Element>Fødselsnummer: {fnr}</Element>
                    <BodyShort>
                        Mottatt/Sendt: {melding.ferdigstiltDato && formaterDato(melding.ferdigstiltDato)}
                    </BodyShort>
                    {lest}
                </div>
            </HStack>
            <VStack gap="2" marginBlock="0 4">
                <Element>Innhold:</Element>
                <RichText rules={[SladdRule, HighlightRule, ...defaultRules]}>{melding.fritekst}</RichText>
            </VStack>
        </Box.New>
    );
}

function MeldingerPrint(props: Props) {
    const meldinger = props.traad.meldinger.sort(datoStigende((melding) => melding.opprettetDato));
    const eldsteMelding = meldinger[0];

    const feilsendt = eldsteMelding.markertSomFeilsendtAv && (
        <Element> Markert som feilsendt av {eldsteMelding.markertSomFeilsendtAv.ident?.toUpperCase()}</Element>
    );
    const journalposter = <JournalposterMarkup journalposter={props.traad.journalposter} />;
    const enkeltmeldinger = meldinger.map((melding) => <EnkeltMeldingMarkup melding={melding} key={melding.id} />);
    return (
        <div className="print-only break-after-page">
            <Box.New marginBlock="0 8">
                {feilsendt}
                {journalposter}
            </Box.New>
            {enkeltmeldinger}
        </div>
    );
}

export default MeldingerPrint;
