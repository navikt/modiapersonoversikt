import { FigureInwardIcon, FigureOutwardIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, CopyButton, Heading, HStack, Skeleton, VStack } from '@navikt/ds-react';
import { AlertBanner } from 'src/components/AlertBanner';
import { erUbesvartHenvendelseFraBruker, useTraader } from 'src/components/Meldinger/List/utils';
import { useFilterOppgave } from 'src/components/Oppgave/List/utils';
import Statsborgerskap from 'src/components/PersonLinje/Details/Familie/Statsborgerskap';
import config from 'src/config';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { Kjonn, type KodeBeskrivelseKjonn } from 'src/lib/types/modiapersonoversikt-api';
import useHotkey from 'src/utils/hooks/use-hotkey';
import Card from '../Card';
import ErrorBoundary from '../ErrorBoundary';
import { PersonBadges } from './Badges';
import { Sikkerhetstiltak } from './Sikkerhetstiltak';

const ukjentKjonn: KodeBeskrivelseKjonn = {
    kode: Kjonn.U,
    beskrivelse: 'Ukjent kjønn'
};

export const PersonLinje = () => {
    const { errorMessages, isLoading, isError } = usePersonData();

    return (
        <ErrorBoundary boundaryName="personlinje">
            {isLoading ? (
                <Skeleton variant="rectangle" height={40} />
            ) : (
                <>{isError ? <AlertBanner alerts={errorMessages} /> : <PersonLinjeContent />}</>
            )}
        </ErrorBoundary>
    );
};

const PersonlinjeHeader = () => {
    const { data } = usePersonData();
    const { data: traader } = useTraader();
    const { data: oppgaver } = useFilterOppgave();

    const person = data?.person;
    const antallUbesvarteTraader = traader?.filter((traad) => erUbesvartHenvendelseFraBruker(traad))?.length;

    const kjonn = person?.kjonn.firstOrNull() ?? ukjentKjonn;
    const navn = person?.navn.firstOrNull();

    const dato = person?.dodsdato?.firstOrNull();
    const erDod = !!dato?.dodsdato;

    const farge = erDod
        ? 'var(--ax-text-neutral-subtle)'
        : kjonn.kode === Kjonn.K
          ? 'var(--ax-bg-meta-purple-strong-pressed)'
          : kjonn.kode === Kjonn.M
            ? 'var(--ax-text-accent-decoration)'
            : 'var(--ax-text-neutral-subtle)';

    if (!person) {
        return <></>;
    }

    return (
        <HStack
            gap="2"
            wrap={false}
            justify="space-between"
            padding="3"
            id="personlinje-header"
            className="focus:outline-0"
            tabIndex={-1}
        >
            <HStack gap="2" wrap={false} align="start">
                <Box.New borderRadius="full" borderWidth="2" style={{ borderColor: farge }}>
                    {kjonn.kode === Kjonn.K ? (
                        <FigureOutwardIcon aria-hidden color={farge} fontSize="2rem" />
                    ) : (
                        <FigureInwardIcon aria-hidden color={farge} fontSize="2rem" />
                    )}
                </Box.New>
                <VStack gap="2" className="pt-1.5">
                    <HStack gap="2" align="center">
                        <Personalia
                            navn={navn ? `${navn.fornavn} ${navn.mellomnavn ?? ''} ${navn.etternavn}` : 'UKJENT'}
                            kjonn={kjonn}
                            alder={person.alder}
                            erDod={erDod}
                            farge={farge}
                        />
                        <HStack className="cursor-[initial]" onClick={(e) => e.stopPropagation()}>
                            <CopyButton
                                aria-label={`Kopier f.nr: ${data.person.personIdent}`}
                                size="xsmall"
                                className="p-0"
                                copyText={data.person.personIdent}
                                activeText="Kopiert f.nr"
                                text={`F.nr: ${data.person.personIdent}`}
                            />
                        </HStack>
                        {data.person.kontaktInformasjon.mobil?.value && (
                            <HStack align="center" className="cursor-[initial]" onClick={(e) => e.stopPropagation()}>
                                <CopyButton
                                    className="p-0"
                                    activeText="Kopiert tlf.nr"
                                    aria-label={`Kopier tlf.nr: ${data.person.kontaktInformasjon.mobil.value}`}
                                    text={`Tlf.nr: ${data.person.kontaktInformasjon.mobil.value}`}
                                    size="xsmall"
                                    copyText={data.person.kontaktInformasjon.mobil.value}
                                />
                            </HStack>
                        )}
                        <Statsborgerskap />
                    </HStack>
                    <PersonBadges />
                    {oppgaver.length > 0 && (
                        <BodyShort visuallyHidden>{`Bruker har ${oppgaver.length} åpne oppgaver`}</BodyShort>
                    )}
                    {antallUbesvarteTraader > 0 && (
                        <BodyShort visuallyHidden>{`Bruker har ${antallUbesvarteTraader} ubesvart hendelse`}</BodyShort>
                    )}
                </VStack>
            </HStack>
        </HStack>
    );
};

const PersonLinjeContent = () => {
    const { data } = usePersonData();
    const person = data?.person;

    const lenkeNyBrukerprofil = config.isProd ? 'https://pdl-web.intern.nav.no' : 'https://pdl-web.intern.dev.nav.no';

    useHotkey(
        { char: 'b', altKey: true },
        () => window.open(lenkeNyBrukerprofil, '_blank', 'noopener noreferrer'),
        [lenkeNyBrukerprofil],
        'Visittkort'
    );

    if (!person) {
        return <></>;
    }

    return (
        <>
            <Sikkerhetstiltak sikkerhetstiltak={person.sikkerhetstiltak} />
            <Card aria-labelledby="personinformasjon-heading" as="section">
                <PersonlinjeHeader />
            </Card>
        </>
    );
};

type PersonaliaProps = {
    navn: string;
    farge: string;
    kjonn: KodeBeskrivelseKjonn;
    erDod: boolean;
    alder?: number;
};

const Personalia = ({ navn, alder, kjonn, erDod, farge }: PersonaliaProps) => {
    return (
        <HStack gap="1">
            <Heading
                id="personinformasjon-heading"
                size="xsmall"
                as="h2"
                style={{ color: farge }}
                className="capitalize font-medium"
            >
                {navn.toLowerCase()}
            </Heading>
            <BodyShort style={{ color: farge }}>
                ({kjonn.beskrivelse}, {erDod ? 'død' : (alder ?? 'Ukjent alder')})
            </BodyShort>
        </HStack>
    );
};
