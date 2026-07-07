import { Heading, VStack } from '@navikt/ds-react';
import type { OppdateringsloggInnslag } from './OppdateringsloggContainer';

interface Props {
    enOppdateringslogg: OppdateringsloggInnslag;
}

function OppdateringsloggBilde({ src }: { src?: string }) {
    if (!src) {
        return null;
    }
    return <img src={src} alt="" className="oppdateringslogg__bilde" />;
}

export default function EnkeltOppdateringslogg({ enOppdateringslogg }: Props) {
    return (
        <VStack gap="space-16" className="oppdateringslogg__enkelt">
            <OppdateringsloggBilde src={enOppdateringslogg.src} />
            <Heading size="small" level="3">
                {enOppdateringslogg.tittel}
            </Heading>
            {enOppdateringslogg.ingress}
            {enOppdateringslogg.beskrivelse}
        </VStack>
    );
}
