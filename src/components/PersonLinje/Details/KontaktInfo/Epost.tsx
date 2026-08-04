import { EnvelopeClosedFillIcon } from '@navikt/aksel-icons';
import { InlineMessage } from '@navikt/ds-react';
import type { PersonData } from 'src/lib/types/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';
import { InfoElement } from '../components';
import KRRInfo from './KRRInfo';

interface Props {
    harFeilendeSystem: boolean;
    kontaktinformasjon: PersonData['kontaktInformasjon'] | null;
}

function Email({ harFeilendeSystem, kontaktinformasjon }: Props) {
    if (harFeilendeSystem) {
        return (
            <InfoElement
                title="E-post"
                icon={<EnvelopeClosedFillIcon aria-hidden fontSize="1.2rem" color="var(--ax-neutral-500)" />}
            >
                <InlineMessage status="warning" size="small">
                    Feilet ved uthenting av data fra Kontakt- og reservasjonsregisteret
                </InlineMessage>
            </InfoElement>
        );
    }
    if (!kontaktinformasjon) {
        return null;
    }
    const epost = kontaktinformasjon.epost?.value ?? null;
    const sistOppdatert = kontaktinformasjon.epost?.sistOppdatert
        ? formaterDato(kontaktinformasjon.epost.sistOppdatert)
        : null;

    return (
        <InfoElement
            title="E-post"
            icon={<EnvelopeClosedFillIcon fontSize="1.2rem" aria-hidden color="var(--ax-neutral-500)" />}
        >
            <KRRInfo
                erReservert={kontaktinformasjon.erReservert?.value}
                reservasjonOppdatert={kontaktinformasjon.erReservert?.sistOppdatert}
                kontaktinformasjonVerdi={epost}
                sistOppdatert={sistOppdatert}
            />
        </InfoElement>
    );
}

export default Email;
