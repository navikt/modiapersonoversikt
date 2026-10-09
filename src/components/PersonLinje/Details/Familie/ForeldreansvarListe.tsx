import { PersonTallShortFillIcon, PersonTallShortIcon } from '@navikt/aksel-icons';
import { BodyShort, HStack, InlineMessage, VStack } from '@navikt/ds-react';
import { KopierFnrKnapp } from 'src/components/PersonLinje/common/KopierFnrKnapp';
import type { PersonData } from 'src/lib/types/modiapersonoversikt-api';
import { hentNavn } from '../../utils';
import { InfoElement } from '../components';

type Foreldreansvar = PersonData['foreldreansvar'][0];

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
    const ansvarlig = foreldreansvar.ansvarlig;
    const ansvarsubject = foreldreansvar.ansvarsubject;

    return (
        <VStack gap="space-4" justify="start" className="items-start">
            <HStack>
                <PersonTallShortFillIcon aria-hidden fontSize="1.2rem" color="var(--a-igray-400)" />
                <BodyShort size="small">Ansvar: {foreldreansvar.ansvar} </BodyShort>
            </HStack>
            {ansvarlig?.navn && <BodyShort size="small">Ansvarlig: {hentNavn(ansvarlig.navn)}</BodyShort>}
            {ansvarlig?.ident && <KopierFnrKnapp fnr={ansvarlig?.ident} />}
            {ansvarsubject?.navn && <BodyShort size="small">Gjelder for: {hentNavn(ansvarsubject.navn)}</BodyShort>}
            {ansvarsubject?.ident && <KopierFnrKnapp fnr={ansvarsubject?.ident} />}
        </VStack>
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
        <VStack gap="space-32">
            {foreldreansvar.map((fa, index) => (
                <ForeldreansvarElement
                    key={`${fa.ansvar}-${index}`}
                    harFeilendeSystem={harFeilendeSystem}
                    foreldreansvar={fa}
                />
            ))}
        </VStack>
    );
}

export default ForeldreansvarListe;
