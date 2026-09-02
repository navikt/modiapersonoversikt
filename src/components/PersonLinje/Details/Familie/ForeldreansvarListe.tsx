import { PersonTallShortFillIcon, PersonTallShortIcon } from '@navikt/aksel-icons';
import { BodyShort, InlineMessage } from '@navikt/ds-react';
import type { NavnOgIdent, PersonData } from 'src/lib/types/modiapersonoversikt-api';
import { hentNavn } from '../../utils';
import { InfoElement } from '../components';

type Foreldreansvar = PersonData['foreldreansvar'][0];

function kombinerNavnOgIdent(personInfo?: NavnOgIdent): string | null {
    if (!personInfo) return null;
    const navn = hentNavn(personInfo.navn);
    const ident = personInfo.ident ? personInfo.ident : 'Ukjent fnr/dnr';
    return personInfo.navn ? `${navn} (${ident})` : navn;
}

function ForeldreansvarElement({
    harFeilendeSystem,
    foreldreansvar
}: {
    harFeilendeSystem: boolean;
    foreldreansvar: Foreldreansvar;
}) {
    if (harFeilendeSystem) {
        return (
            <InfoElement title={`Ansvar: ${foreldreansvar.ansvar}`} icon={<PersonTallShortIcon aria-hidden />}>
                <InlineMessage status="warning" size="small">
                    Feilet ved uthenting av informasjon om barn
                </InlineMessage>
            </InfoElement>
        );
    }
    const ansvarlig = kombinerNavnOgIdent(foreldreansvar.ansvarlig);
    const ansvarsubject = kombinerNavnOgIdent(foreldreansvar.ansvarsubject);
    return (
        <InfoElement
            title={`Ansvar: ${foreldreansvar.ansvar}`}
            icon={<PersonTallShortFillIcon aria-hidden fontSize="1.2rem" color="var(--a-igray-400)" />}
        >
            {ansvarlig && <BodyShort size="small">Ansvarlig: {ansvarlig}</BodyShort>}
            {ansvarsubject && <BodyShort size="small">Gjelder for: {ansvarsubject}</BodyShort>}
        </InfoElement>
    );
}

function ForeldreansvarListe({
    harFeilendeSystem,
    foreldreansvar
}: {
    harFeilendeSystem: boolean;
    foreldreansvar: Foreldreansvar[];
}) {
    return (
        <>
            {foreldreansvar.map((fa, index) => (
                <ForeldreansvarElement
                    key={`${fa.ansvar}-${index}`}
                    harFeilendeSystem={harFeilendeSystem}
                    foreldreansvar={fa}
                />
            ))}
        </>
    );
}

export default ForeldreansvarListe;
