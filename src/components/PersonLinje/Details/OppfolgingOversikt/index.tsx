import { CheckmarkCircleIcon, ChevronRightIcon, XMarkOctagonIcon } from '@navikt/aksel-icons';
import { BodyShort, HStack, Skeleton, Tag, VStack } from '@navikt/ds-react';
import { useNavigate } from '@tanstack/react-router';
import Card from 'src/components/Card';
import { useArbeidsoppfolging, useGjeldende14aVedtak } from 'src/lib/clients/modiapersonoversikt-api';

function OppfolgingOversikt() {
    const navigate = useNavigate();
    const { data, isLoading } = useArbeidsoppfolging();
    const { data: vedtakData, isLoading: isLoadingVedtak } = useGjeldende14aVedtak();

    if (isLoading || isLoadingVedtak) {
        return <Skeleton variant="rectangle" height={80} />;
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
        <Card
            padding="space-12"
            style={{ backgroundColor: 'var(--ax-bg-warning-soft)', cursor: 'pointer' }}
            onClick={() => navigate({ to: '/new/person/oppfolging' })}
            role="button"
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    navigate({ to: '/new/person/oppfolging' });
                }
            }}
        >
            <HStack justify="space-between" align="center" wrap={false} gap="space-8">
                <VStack gap="space-24">
                    <VStack gap="space-4">
                        <BodyShort size="small" weight="semibold">
                            Arbeidsoppfølging
                        </BodyShort>
                        {veileder && (
                            <BodyShort size="small" textColor="subtle">
                                Veileder: {veileder.navn} ({veileder.ident})
                            </BodyShort>
                        )}
                    </VStack>
                    {vedtakData?.gjeldende14aVedtak ? (
                        <Tag
                            data-color="success"
                            variant="moderate"
                            size="small"
                            icon={<CheckmarkCircleIcon aria-hidden />}
                            style={{ width: 'fit-content' }}
                        >
                            § 14 a-vedtak
                        </Tag>
                    ) : (
                        <Tag
                            data-color="danger"
                            variant="moderate"
                            size="small"
                            icon={<XMarkOctagonIcon aria-hidden />}
                            style={{ width: 'fit-content' }}
                        >
                            § 14 a-vedtak
                        </Tag>
                    )}
                </VStack>
                <ChevronRightIcon fontSize="1.5rem" aria-hidden style={{ flexShrink: 0 }} />
            </HStack>
        </Card>
    );
}

export default OppfolgingOversikt;
