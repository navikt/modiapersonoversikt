import { BodyShort, LinkCard, Skeleton, VStack } from '@navikt/ds-react';
import { Link } from '@tanstack/react-router';
import { getPeriodFromOption } from 'src/components/DateFilters/DatePeriodSelector';
import { PeriodType } from 'src/components/DateFilters/types';
import { useTemaerForPeriode } from 'src/components/Dokumenter/utils';
import { Link as AkselLink } from 'src/components/Link';
import { errorPlaceholder, responseErrorMessage } from 'src/components/ytelser/utils';
import { useSakerDokumenter } from 'src/lib/clients/modiapersonoversikt-api';
import { trackGenereltUmamiEvent, trackingEvents } from 'src/utils/analytics';
import { SeksjonFeil } from '../components';

const DATE_FORMAT = 'DD.MM.YYYY';

const MAKS_ANTALL_TEMAER = 3;

function DokumenterTemaOversikt() {
    const sakerDokumenterResponse = useSakerDokumenter();
    const { isLoading } = sakerDokumenterResponse;
    const dateRange = getPeriodFromOption(PeriodType.LAST_30_DAYS);

    const temaer = useTemaerForPeriode(dateRange);

    if (isLoading) {
        return (
            <VStack gap="space-8">
                <Skeleton variant="rectangle" height={40} />
                <Skeleton variant="rectangle" height={40} />
            </VStack>
        );
    }

    const feilmeldinger = [
        errorPlaceholder(sakerDokumenterResponse, responseErrorMessage('saker og dokumenter'))
    ].filter(Boolean);

    if (feilmeldinger.length > 0) {
        return <SeksjonFeil feilmeldinger={feilmeldinger} />;
    }

    if (temaer.length === 0) {
        return (
            <BodyShort size="small" textColor="subtle">
                Ingen dokumenter siste 30 dager
            </BodyShort>
        );
    }

    const synligeTemaer = temaer.slice(0, MAKS_ANTALL_TEMAER);
    const antallResterendeTemaer = temaer.length - synligeTemaer.length;

    return (
        <VStack gap="space-8">
            <VStack gap="space-8" as="ul" className="list-none p-0 m-0">
                {synligeTemaer.map((tema) => (
                    <li key={tema.temakode}>
                        <LinkCard size="small" className="bg-ax-bg-brand-magenta-soft">
                            <LinkCard.Title as="span">
                                <LinkCard.Anchor asChild>
                                    <Link
                                        title={`Gå til dokumenter med tema ${tema.temanavn.toLowerCase()} siste 30 dager`}
                                        to="/new/person/dokumenter"
                                        search={{
                                            tema: [tema.temakode],
                                            fra: dateRange.from?.format(DATE_FORMAT),
                                            til: dateRange.to?.format(DATE_FORMAT)
                                        }}
                                        onClick={() =>
                                            trackGenereltUmamiEvent(trackingEvents.lenkeKlikketFraHjem, {
                                                kort: 'dokumenttema',
                                                tekst: tema.temanavn
                                            })
                                        }
                                    >
                                        {tema.temanavn}
                                    </Link>
                                </LinkCard.Anchor>
                            </LinkCard.Title>
                        </LinkCard>
                    </li>
                ))}
            </VStack>
            {antallResterendeTemaer > 0 && (
                <AkselLink
                    className="text-ax-medium"
                    to="/new/person/dokumenter"
                    search={{
                        tema: [],
                        fra: dateRange.from?.format(DATE_FORMAT),
                        til: dateRange.to?.format(DATE_FORMAT)
                    }}
                    onClick={() =>
                        trackGenereltUmamiEvent(trackingEvents.lenkeKlikketFraHjem, {
                            kort: 'dokumenttema',
                            tekst: 'vis flere temaer'
                        })
                    }
                >
                    Bruker har {antallResterendeTemaer} flere {antallResterendeTemaer === 1 ? 'tema' : 'temaer'} siste
                    30 dager
                </AkselLink>
            )}
        </VStack>
    );
}

export default DokumenterTemaOversikt;
