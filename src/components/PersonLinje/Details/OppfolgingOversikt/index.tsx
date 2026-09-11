import { CheckmarkCircleIcon, XMarkOctagonIcon } from '@navikt/aksel-icons';
import { BodyShort, LinkCard, Skeleton, Tag, VStack } from '@navikt/ds-react';
import { Link } from '@tanstack/react-router';
import { useArbeidsoppfolging, useGjeldende14aVedtak } from 'src/lib/clients/modiapersonoversikt-api';
import { trackGenereltUmamiEvent, trackingEvents } from 'src/utils/analytics';
import { twMerge } from 'tailwind-merge';
import { SeksjonFeil } from '../components';

function OppfolgingOversikt() {
    const { data, isLoading, errorMessages: oppfolgingFeil } = useArbeidsoppfolging();
    const { data: vedtakData, isLoading: isLoadingVedtak, errorMessages: vedtakFeil } = useGjeldende14aVedtak();

    if (isLoading || isLoadingVedtak) {
        return <Skeleton variant="rectangle" height={80} />;
    }

    if (oppfolgingFeil.length > 0) {
        return <SeksjonFeil feilmeldinger={oppfolgingFeil} />;
    }

    const oppfolging = data?.oppfolging;

    if (!oppfolging?.erUnderOppfolging) {
        return (
            <BodyShort size="small" textColor="subtle">
                Ikke under arbeidsrettet oppfølging
            </BodyShort>
        );
    }

    const veileder = oppfolging.veileder;

    return (
        <VStack gap="space-8">
            {vedtakFeil.length > 0 && <SeksjonFeil feilmeldinger={vedtakFeil} />}
            <LinkCard size="small" className={twMerge('rounded-(--ax-radius-8)!', 'bg-ax-bg-warning-soft!')}>
                <LinkCard.Title as="span">
                    <LinkCard.Anchor asChild>
                        <Link
                            to="/new/person/oppfolging"
                            aria-label="Arbeidsoppfølging – gå til oppfølging"
                            onClick={() =>
                                trackGenereltUmamiEvent(trackingEvents.lenkeKlikketFraHjem, {
                                    fane: 'hjem',
                                    kort: 'oppfølging',
                                    tekst: 'lenke til oppfolging'
                                })
                            }
                        >
                            Arbeidsoppfølging
                        </Link>
                    </LinkCard.Anchor>
                </LinkCard.Title>
                {veileder && (
                    <LinkCard.Description>
                        <BodyShort size="small" textColor="subtle">
                            Veileder: {veileder.navn} ({veileder.ident})
                        </BodyShort>
                    </LinkCard.Description>
                )}
                {vedtakFeil.length === 0 && (
                    <LinkCard.Footer>
                        {vedtakData?.gjeldende14aVedtak ? (
                            <Tag
                                data-color="success"
                                variant="moderate"
                                size="small"
                                icon={<CheckmarkCircleIcon aria-hidden />}
                            >
                                § 14 a-vedtak
                            </Tag>
                        ) : (
                            <Tag
                                data-color="danger"
                                variant="moderate"
                                size="small"
                                icon={<XMarkOctagonIcon aria-hidden />}
                            >
                                Ikke § 14 a-vedtak
                            </Tag>
                        )}
                    </LinkCard.Footer>
                )}
            </LinkCard>
        </VStack>
    );
}

export default OppfolgingOversikt;
