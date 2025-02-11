import { ChatExclamationmarkFillIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import type { PersonData } from 'src/lib/types/modiapersonoversikt-api';
import { Group, InfoElement } from './components';

type TilrettelagtKommunikasjon = PersonData['tilrettelagtKommunikasjon']['tegnsprak' | 'talesprak'];

function tilrettelagtKommunikasjonTekst(beskrivelse: string, tilrettelagtKommunikasjon: TilrettelagtKommunikasjon) {
    return tilrettelagtKommunikasjon.map((element) => (
        <BodyShort size="small" key={element.kode}>
            {beskrivelse}: {element.beskrivelse} ({element.kode})
        </BodyShort>
    ));
}

function TilrettelagtKommunikasjon() {
    const { data } = usePersonData();
    const tilrettelagtKommunikasjon = data.person.tilrettelagtKommunikasjon;

    if (tilrettelagtKommunikasjon.tegnsprak.isEmpty() && tilrettelagtKommunikasjon.talesprak.isEmpty()) {
        return null;
    }

    return (
        <Group
            title="Tilrettelagt kommunikasjon"
            icon={<ChatExclamationmarkFillIcon className="text-[var(--ax-text-warning-icon)]" />}
        >
            <InfoElement>
                {tilrettelagtKommunikasjonTekst('Tegnspråk', tilrettelagtKommunikasjon.tegnsprak)}
                {tilrettelagtKommunikasjonTekst('Talespråk', tilrettelagtKommunikasjon.talesprak)}
            </InfoElement>
        </Group>
    );
}

export default TilrettelagtKommunikasjon;
