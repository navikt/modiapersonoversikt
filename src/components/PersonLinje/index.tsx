import { ChevronDownIcon, ChevronUpIcon, PersonIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, CopyButton, HStack, Label, Skeleton } from '@navikt/ds-react';
import { Suspense, useState } from 'react';
import { Kjonn, type KodeBeskrivelse } from 'src/app/personside/visittkort-v2/PersondataDomain';
import config from 'src/config';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import useHotkey from 'src/utils/hooks/use-hotkey';
import { twMerge } from 'tailwind-merge';
import QueryErrorBoundary from '../QueryErrorBoundary';
import { PersonBadges } from './Badges';

const ukjentKjonn: KodeBeskrivelse<Kjonn> = {
    kode: Kjonn.U,
    beskrivelse: 'Ukjent kjønn'
};

export const PersonLinje = () => (
    <Suspense fallback={<Skeleton variant="rounded" height={60} />}>
        <PersonLinjeContent />
    </Suspense>
);

const PersonLinjeContent = () => {
    const { data, error } = usePersonData();
    const [isExpanded, setIsExpanded] = useState(false);

    const lenkeNyBrukerprofil = config.isProd ? 'https://pdl-web.intern.nav.no' : 'https://pdl-web.intern.dev.nav.no';

    useHotkey({ char: 'n', altKey: true }, () => setIsExpanded((v) => !v), [setIsExpanded], 'Visittkort');
    useHotkey(
        { char: 'b', altKey: true },
        () => window.open(lenkeNyBrukerprofil, '_blank', 'noopener noreferrer'),
        [lenkeNyBrukerprofil],
        'Visittkort'
    );

    const kjonn = data.person.kjonn.firstOrNull() ?? ukjentKjonn;
    const navn = data.person.navn.firstOrNull();

    return (
        <Box
            as="section"
            aria-label="personlinje"
            borderWidth="1"
            background="bg-default"
            onClick={() => setIsExpanded((v) => !v)}
            className="border-border-subtle rounded-xl has-[:focus]:border-border-strong overflow-hidden"
        >
            <QueryErrorBoundary error={error}>
                <HStack padding="2" justify="space-between" className="hover:bg-bg-subtle cursor-pointer" wrap={false}>
                    <HStack gap="4">
                        <Personalia
                            navn={navn ? `${navn.fornavn} ${navn.mellomnavn ?? ''} ${navn.etternavn}` : 'UKJENT'}
                            kjonn={kjonn}
                            alder={data.person.alder}
                        />
                        <HStack align="center" className="cursor-[initial]" onClick={(e) => e.stopPropagation()}>
                            <BodyShort size="small">F.nr: {data.person.personIdent}</BodyShort>
                            <CopyButton size="small" copyText={data.person.personIdent} />
                        </HStack>
                        {data.person.kontaktInformasjon.mobil?.value && (
                            <HStack align="center" className="cursor-[initial]" onClick={(e) => e.stopPropagation()}>
                                <BodyShort size="small">Tlf.nr: {data.person.kontaktInformasjon.mobil.value}</BodyShort>
                                <CopyButton size="small" copyText={data.person.kontaktInformasjon.mobil.value} />
                            </HStack>
                        )}
                    </HStack>
                    <PersonBadges />
                    <Button
                        title="Åpne personlinje"
                        icon={isExpanded ? <ChevronUpIcon aria-hidden /> : <ChevronDownIcon aria-hidden />}
                        variant="tertiary-neutral"
                    />
                </HStack>
                <Box
                    marginInline="4"
                    className={twMerge(
                        'border-t border-border-subtle transition-all duration-75  h-9',
                        !isExpanded && 'h-0 invisible overflow-hidden'
                    )}
                >
                    Hei content
                </Box>
            </QueryErrorBoundary>
        </Box>
    );
};

type PersonaliaProps = {
    navn: string;
    alder?: number;
    kjonn: KodeBeskrivelse<'M' | 'K' | 'U'>;
};

const Personalia = ({ navn, alder, kjonn }: PersonaliaProps) => {
    return (
        <HStack align="center" gap="1">
            <PersonIcon fontSize="1.5rem" aria-hidden />
            <Label className="capitalize">{navn.toLowerCase()}</Label>
            <BodyShort>
                ({kjonn.beskrivelse}, {alder ?? 'Unkjent alder'})
            </BodyShort>
        </HStack>
    );
};
