import { PersonTallShortIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort } from '@navikt/ds-react';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import type { NavnOgIdent, PersonData } from 'src/lib/types/modiapersonoversikt-api';
import { harFeilendeSystemer, hentNavn } from '../utils';
import { Group, InfoElement } from './components';

type Foreldreansvar = PersonData['foreldreansvar'][0];

function kombinerNavnOgIdent(personInfo?: NavnOgIdent): string | null {
    if (!personInfo) {
        return null;
    }

    const navn = hentNavn(personInfo.navn);
    const ident = personInfo.ident ? personInfo.ident : 'Ukjent fnr/dnr';

    return personInfo.navn ? `${navn} (${ident})` : navn;
}

function ForeldreansvarElement(props: {
    harFeilendeSystem: boolean;
    foreldreansvar: Foreldreansvar;
}) {
    const { foreldreansvar } = props;

    if (props.harFeilendeSystem) {
        return (
            <InfoElement title={`Ansvar: ${foreldreansvar.ansvar}`} icon={<PersonTallShortIcon />}>
                <BodyShort size="small">Ansvar: {foreldreansvar.ansvar}</BodyShort>
                <Alert variant="warning" inline>
                    Feilet ved uthenting av informasjon om barn
                </Alert>
            </InfoElement>
        );
    }
    const ansvarlig = kombinerNavnOgIdent(foreldreansvar.ansvarlig);
    const ansvarsubject = kombinerNavnOgIdent(foreldreansvar.ansvarsubject);

    return (
        <InfoElement title={`Ansvar: ${foreldreansvar.ansvar}`} icon={<PersonTallShortIcon />}>
            {ansvarlig && <BodyShort size="small">Ansvarlig: {ansvarlig}</BodyShort>}
            {ansvarsubject && <BodyShort size="small">Gjelder for: {ansvarsubject}</BodyShort>}
        </InfoElement>
    );
}

function Foreldreansvar() {
    const {
        data: { feilendeSystemer, person }
    } = usePersonData();

    const foreldreansvar = person.foreldreansvar;

    if (foreldreansvar.isEmpty()) {
        return null;
    }

    return (
        <Group title="Foreldreansvar">
            {foreldreansvar.map((foreldreansvar, index) => (
                <ForeldreansvarElement
                    key={`${foreldreansvar.ansvar}-${index}`}
                    harFeilendeSystem={harFeilendeSystemer(feilendeSystemer, 'PDL_TREDJEPARTSPERSONER')}
                    foreldreansvar={foreldreansvar}
                />
            ))}
        </Group>
    );
}
export default Foreldreansvar;
