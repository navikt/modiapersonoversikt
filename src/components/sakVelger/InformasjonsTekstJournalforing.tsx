import { BodyLong, BodyShort, InlineMessage, Lookup, ReadMore, VStack } from '@navikt/ds-react';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Bold } from 'src/components/common-styled-components';
import { nyesteMelding } from 'src/components/Meldinger/List/utils';
import type { Traad } from 'src/lib/types/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';

export const InformasjonsTekstJournalforing = ({ traad }: { traad?: Traad }) => {
    const melding = traad && nyesteMelding(traad);
    const avsluttetDato = traad?.avsluttetDato ?? melding?.avsluttetDato;
    const traadAvsluttetIdag = avsluttetDato && dayjs(avsluttetDato).isSame(dayjs().toDate(), 'day');
    const journalposter = traad?.journalposter;

    const visAdvarselOmAutomatiskJournalforing = traadAvsluttetIdag && journalposter?.length;

    const journalfortSakerTekst = useMemo(() => {
        const saksbeskrivelser = (journalposter ?? []).map(
            (post) =>
                `${post.journalfortTemanavn?.toLowerCase() ?? 'ukjent'}${post.journalfortSaksid ? ` (${post.journalfortSaksid})` : ''}`
        );
        const prefiks = saksbeskrivelser.length === 1 ? 'sak' : 'saker';
        const listeTekst = new Intl.ListFormat('nb-NO', { style: 'long', type: 'conjunction' }).format(
            saksbeskrivelser
        );
        return `${prefiks} med tema ${listeTekst}`;
    }, [journalposter]);

    return (
        <VStack paddingBlock="space-0 space-8" gap="space-16">
            <ReadMore header="Hva skjer når en dialog journalføres?">
                <BodyShort className="font-ax-bold">Journalføring generelt: </BodyShort>
                Ved journalføring blir det umiddelbart opprettet et dokument tilknyttet saken i{' '}
                <Lookup word="Joark">Navs fagarkiv. Benyttes for alle saksrelevante dokumenter.</Lookup>. Dokumentet
                inneholder de meldingene som finnes i samtalen på det tidspunktet dialogen journalføres. Det blir ikke
                sendt til bruker, men du kan finne dokumentet igjen i dokumentoversikten i Modia personoversikt eller i
                Gosys. Så lenge dialogen ikke er avsluttet kan du trigge ny journalføring både på eksisterende og nye
                saker og nytt dokument blir umiddelbart opprettet. Når dialogen avsluttes vil det skje en automatisk
                journalføring av dialogen. Dette skjer på natten etter at dialogen er avsluttet, og dokumentet blir
                synlig både internt og for bruker dagen etter.
                <BodyShort className="font-ax-bold">Forskjell på samtale, infomelding og referat: </BodyShort>
                <BodyLong spacing>
                    Ved start av en ny samtale eller infomelding så må dialogen tilknyttes en sak. Dette betyr at et
                    dokument med den første meldingen blir opprettet. Deretter gjelder informasjonen over. For referat
                    må en huske å manuelt legge til en sak senere for at dialogen skal journalføres.
                </BodyLong>
            </ReadMore>
            {visAdvarselOmAutomatiskJournalforing && (
                <InlineMessage size="small" status="warning">
                    <Bold>Automatisk journalføring iverksatt:</Bold> Denne tråden ble avsluttet i dag
                    {avsluttetDato ? ` (${formaterDato(avsluttetDato)})` : ''}. Det skjer en automatisk journalføring i
                    natt på {journalfortSakerTekst}. Du kan journalføre på en ny sak og dokumentet blir umiddelbart
                    opprettet, men om du journalfører på samme {journalposter.length > 1 ? 'saker' : 'sak'} vil det
                    uansett ikke bli opprettet {journalposter.length > 1 ? 'dokumenter ' : 'et dokument '}
                    før i natt.
                </InlineMessage>
            )}
        </VStack>
    );
};
