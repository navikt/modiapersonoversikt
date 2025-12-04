import { EnvelopeClosedIcon, EnvelopeOpenIcon, PersonIcon } from '@navikt/aksel-icons';
import { Box, Chat, Detail, HStack, VStack } from '@navikt/ds-react';
import { useAtomValue } from 'jotai';
import { type ElementType, type ReactNode, useLayoutEffect, useMemo, useRef } from 'react';
import RichText, {
    createDynamicHighlightingRule,
    defaultRules,
    HighlightRule,
    SladdRule
} from 'src/components/RichText';
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
        <Box.New
            ref={setChatAreaRef}
            height="100%"
            overflowX="scroll"
            borderColor="neutral-subtle"
            borderWidth="2 0 2 0"
            marginBlock="2"
            padding="4"
        >
            <VStack gap="8" align="baseline" paddingBlock="8 8" as="ol" aria-label="Meldinger">
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
                                        rules={[SladdRule, HighlightRule, highlightRule, ...defaultRules]}
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
        </Box.New>
    );
};

const ReadStatus = ({ date }: { date?: string }) =>
    date ? (
        <HStack gap="1">
            <EnvelopeOpenIcon color="var(--ax-text-success-icon)" />
            <Detail>Lest</Detail>
            <Detail textColor="subtle">({formatterDatoTid(date)})</Detail>
        </HStack>
    ) : (
        <HStack gap="1">
            <EnvelopeClosedIcon color="var(--ax-text-warning-icon)" />
            <Detail>Ikke lest</Detail>
        </HStack>
    );
