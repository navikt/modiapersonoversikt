import { PersonIcon } from '@navikt/aksel-icons';
import { BodyLong, Box, Chat, HStack, VStack } from '@navikt/ds-react';
import { useAtomValue } from 'jotai';
import { type ElementType, type ReactNode, useLayoutEffect, useMemo, useRef } from 'react';
import RichText, { createDynamicHighlightingRule, defaultRules, SladdRule } from 'src/components/RichText';
import { themeAtom } from 'src/lib/state/theme';
import type { Traad } from 'src/lib/types/modiapersonoversikt-api';
import NavLogoBlack from 'src/svg/NavLogoBlack.svg';
import NavLogoWhite from 'src/svg/NavLogoWhite.svg';
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
const DefaultWrapper: Props['wrapper'] = ({ children, melding }) => {
    return <li className={erMeldingFraNav(melding.meldingstype) ? 'self-end' : undefined}>{children}</li>;
};

export const Meldinger = ({ meldinger, wrapper: Wrapper = DefaultWrapper }: Props) => {
    const { search } = useAtomValue(meldingerFilterAtom);
    const highlightRule = useMemo(() => createDynamicHighlightingRule((search ?? '').split(' ')), [search]);
    const theme = useAtomValue(themeAtom);

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
            tabIndex={0}
        >
            <VStack gap="space-32" align="baseline" paddingBlock="space-32 space-32" as="ol" aria-label="Meldinger">
                {meldinger.map((m) => {
                    const erFraNav = erMeldingFraNav(m.meldingstype);
                    return (
                        <Wrapper key={m.id} as="li" melding={m}>
                            <Chat
                                size="small"
                                name={erFraNav ? m.skrevetAvTekst : undefined}
                                avatar={
                                    erFraNav ? (
                                        <Box aria-hidden className="justify-items-center align-middle bg-ax-text-logo">
                                            {theme === 'light' ? (
                                                <NavLogoWhite className="min-w-[8rem] max-h-[8rem]" />
                                            ) : (
                                                <NavLogoBlack className="min-w-[8rem] max-h-[8rem]" />
                                            )}
                                        </Box>
                                    ) : (
                                        <PersonIcon />
                                    )
                                }
                                timestamp={formatterDatoTid(m.opprettetDato)}
                                position={erFraNav ? 'right' : 'left'}
                                data-color={erFraNav ? 'brand-blue' : 'neutral'}
                            >
                                <Chat.Bubble className="text-wrap border-0">
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
        <BodyLong as="span" size="small" className="aksel-inline-message" data-color="success">
            Lest ({formatterDatoTid(date)})
        </BodyLong>
    ) : (
        <BodyLong as="span" size="small" className="aksel-inline-message" data-color="danger">
            Ikke lest
        </BodyLong>
    );
