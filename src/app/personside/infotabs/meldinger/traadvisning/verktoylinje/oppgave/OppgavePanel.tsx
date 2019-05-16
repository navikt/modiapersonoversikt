import * as React from 'react';
import { Traad } from '../../../../../../../models/meldinger/meldinger';
import { GsakTema } from '../../../../../../../models/meldinger/oppgave';
import Select from 'nav-frontend-skjema/lib/select';
import { ChangeEvent } from 'react';
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import Textarea from 'nav-frontend-skjema/lib/textarea';
import styled from 'styled-components';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkeKnapp } from '../../../../../../../components/common-styled-components';
import { FormEvent } from 'react';

const KnappWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

interface Props {
    gsakTema: GsakTema[];
    valgtTraad?: Traad;
}

enum Prioritet {
    HOY = 'Høy',
    NORM = 'Normal',
    LAV = 'Lav'
}

function hentValgtTema(props: Props, event: ChangeEvent<HTMLSelectElement>): GsakTema | undefined {
    return props.gsakTema.find(tema => tema.kode === event.target.value) || undefined;
}

function lagTemaOptions(props: Props) {
    return [
        <option value={''}>Velg tema</option>,
        props.gsakTema.map(gsakTema => <option value={`${gsakTema.kode}`}>{gsakTema.tekst}</option>)
    ];
}

function lagUnderkategoriOptions(valgtGsakTema?: GsakTema) {
    return valgtGsakTema
        ? [
              <option value={''}>Velg underkategori</option>,
              valgtGsakTema.underkategorier.map(underkategori => (
                  <option value={`${underkategori.kode}`}>{underkategori.tekst}</option>
              ))
          ]
        : [<option value={''}>Ingen tema valgt</option>];
}

function lagOppgavetypeOptions(valgtGsakTema?: GsakTema) {
    return valgtGsakTema
        ? [
              <option value={''}>Velg oppgavetype</option>,
              valgtGsakTema.oppgavetyper.map(oppgavetype => (
                  <option value={`${oppgavetype.kode}`}>{oppgavetype.tekst}</option>
              ))
          ]
        : [<option value={''}>Ingen tema valgt</option>];
}

function OppgavePanel(props: Props) {
    const [valgtTema, velgTema] = React.useState<GsakTema | undefined>(undefined);
    const [valgtPrioritet, velgPrioritet] = React.useState<Prioritet | undefined>(undefined);
    const [beskrivelse, settBeskrivelse] = React.useState('');

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        console.log('Skal lagre...');
    };

    function settPrioritet(event: React.SyntheticEvent<EventTarget>, value: string) {
        if (Prioritet.HOY === value) {
            velgPrioritet(Prioritet.HOY);
        } else if (Prioritet.NORM === value) {
            velgPrioritet(Prioritet.NORM);
        } else {
            velgPrioritet(Prioritet.LAV);
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <Select label={'Tema'} onChange={event => velgTema(hentValgtTema(props, event))}>
                {lagTemaOptions(props)}
            </Select>
            <Select label={'Gjelder'}>{lagUnderkategoriOptions(valgtTema)}</Select>
            <Select label={'Type oppgave'}>{lagOppgavetypeOptions(valgtTema)}</Select>
            <RadioPanelGruppe
                radios={[
                    { label: 'Høy', value: Prioritet.HOY, disabled: !valgtTema },
                    { label: 'Normal', value: Prioritet.NORM, disabled: !valgtTema },
                    { label: 'Lav', value: Prioritet.LAV, disabled: !valgtTema }
                ]}
                name={'Prioritet'}
                checked={valgtPrioritet}
                legend={'Prioritet'}
                onChange={settPrioritet}
            />
            <Textarea
                value={beskrivelse}
                label={'Beskrivelse'}
                onChange={e => settBeskrivelse((e as React.KeyboardEvent<HTMLTextAreaElement>).currentTarget.value)}
            />
            <KnappWrapper>
                <Hovedknapp role="submit">Send</Hovedknapp>
                <LenkeKnapp type="button">Avbryt</LenkeKnapp>
            </KnappWrapper>
        </form>
    );
}

export default OppgavePanel;
