import { EnvelopeClosedIcon, EnvelopeOpenIcon, PersonIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Chat, HStack, VStack } from '@navikt/ds-react';
import { useAtomValue } from 'jotai';
import { type ElementType, type ReactNode, useMemo } from 'react';
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
    return (
        <Box.New
            minHeight="0"
            overflowY="scroll"
            background="sunken"
            borderColor="neutral-subtle"
            borderRadius="medium"
            borderWidth="1"
            padding="2"
        >
            <VStack gap="10" align="baseline" paddingBlock="0 16" as="section" aria-label="Meldinger">
                {meldinger.map((m) => {
                    const erFraNav = erMeldingFraNav(m.meldingstype);
                    return (
                        <Wrapper key={m.id} melding={m}>
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
                                    <RichText rules={[SladdRule, HighlightRule, highlightRule, ...defaultRules]}>
                                        {m.fritekst}
                                    </RichText>
                                    {erFraNav && (
                                        <Box.New borderColor="neutral-subtleA" borderWidth="1 0 0 0">
                                            <HStack gap="2" align="center" justify="end">
                                                <ReadStatus date={m.lestDato} />
                                            </HStack>
                                        </Box.New>
                                    )}
                                </Chat.Bubble>
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
        <>
            <BodyShort size="small">Lest</BodyShort>
            <EnvelopeOpenIcon color="var(--ax-text-success-icon)" />
            <BodyShort size="small" textColor="subtle">
                ({formatterDatoTid(date)})
            </BodyShort>
        </>
    ) : (
        <>
            <BodyShort size="small">Ikke lest</BodyShort>
            <EnvelopeClosedIcon color="var(--ax-text-warning-icon)" />
        </>
    );
