import { Heading, VStack } from '@navikt/ds-react';
import type { OppdateringsloggInnslag } from './OppdateringsloggContainer';

interface Props {
    enOppdateringslogg: OppdateringsloggInnslag;
}

function OppdateringsloggBilde({ src }: { src?: string }) {
    if (!src) {
        return null;
    }
    return <img src={src} alt="" className="rounded-[var(--ax-radius-12)] max-h-[480px]" />;
}

export default function EnkeltOppdateringslogg({ enOppdateringslogg }: Props) {
    return (
        <VStack gap="space-28" className="h-full">
            <OppdateringsloggBilde src={enOppdateringslogg.src} />
            <VStack>
                <Heading size="small" level="3">
                    {enOppdateringslogg.tittel}
                </Heading>
                {enOppdateringslogg.ingress}
                {enOppdateringslogg.beskrivelse}
            </VStack>
        </VStack>
    );
}
