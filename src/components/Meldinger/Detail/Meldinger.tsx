import { EnvelopeClosedIcon, EnvelopeOpenIcon, PersonIcon } from '@navikt/aksel-icons';
import { Box, Chat, Detail, HStack, VStack } from '@navikt/ds-react';
import { useAtomValue } from 'jotai';
import { type ElementType, type ReactNode, useLayoutEffect, useMemo, useRef } from 'react';
import RichText, { createDynamicHighlightingRule, defaultRules, SladdRule } from 'src/components/RichText';
import type { Traad } from 'src/lib/types/modiapersonoversikt-api';
import { formatterDatoTid } from 'src/utils/date-utils';
import { meldingerFilterAtom } from '../List/Filter';
import { erMeldingFraNav } from '../List/utils';

type Props = {
    meldinger: Traad['meldinger'];
    wrapper?: ElementType<{
        children: ReactNode;
        melding: Traad['meldinger'][number];
    }>;
};

const DefaultWrapper: Props['wrapper'] = ({ children }) => {
    return <>{children}</>;
};

export const Meldinger = ({ meldinger, wrapper: Wrapper = DefaultWrapper }: Props) => {
    const { search } = useAtomValue(meldingerFilterAtom);
    const highlightRule = useMemo(() => createDynamicHighlightingRule((search ?? '').split(' ')), [search]);

    const chatAreaRef = useRef<HTMLDivElement>(null);
    const setChatAreaRef = (node: HTMLDivElement | null) => {
        if (node) {
            node.scrollTop = node.scrollHeight;
        }
        chatAreaRef.current = node;
    };

    // Scroll til siste melding
    useLayoutEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [meldinger]);

    return (
        <Box
            ref={setChatAreaRef}
            height="100%"
            overflowX="auto"
            borderColor="neutral-subtle"
            borderWidth="2 0 2 0"
            marginBlock="space-8"
            padding="space-16"
        >
            <VStack gap="space-32" align="baseline" paddingBlock="space-32 space-32" as="ol" aria-label="Meldinger">
                {meldinger.map((m) => {
                    const erFraNav = erMeldingFraNav(m.meldingstype);
                    return (
                        <Wrapper key={m.id} as="li" melding={m}>
                            <Chat
                                size="small"
                                avatar={erFraNav ? 'nav' : <PersonIcon />}
                                name={m.skrevetAvTekst}
                                timestamp={formatterDatoTid(m.opprettetDato)}
                                position={erFraNav ? 'right' : 'left'}
                                className={erFraNav ? 'self-end' : undefined}
                                variant={erFraNav ? 'info' : 'neutral'}
                            >
                                <Chat.Bubble className="text-wrap">
                                    <RichText
                                        className="wrap-anywhere"
                                        rules={[SladdRule, highlightRule, ...defaultRules]}
                                    >
                                        {m.fritekst}
                                    </RichText>
                                </Chat.Bubble>
                                {erFraNav && (
                                    <HStack align="center" justify="end">
                                        <ReadStatus date={m.lestDato} />
                                    </HStack>
                                )}
                            </Chat>
                        </Wrapper>
                    );
                })}
            </VStack>
        </Box>
    );
};

const ReadStatus = ({ date }: { date?: string }) =>
    date ? (
        <HStack gap="space-4">
            <EnvelopeOpenIcon color="var(--ax-text-success-icon)" />
            <Detail>Lest</Detail>
            <Detail textColor="subtle">({formatterDatoTid(date)})</Detail>
        </HStack>
    ) : (
        <HStack gap="space-4">
            <EnvelopeClosedIcon color="var(--ax-text-warning-icon)" />
            <Detail>Ikke lest</Detail>
        </HStack>
    );
