import React, { useState, FormEvent } from 'react';
import { Traad } from '../../../../../../../models/meldinger/meldinger';
import { GsakTema, GsakTemaOppgavetype, GsakTemaUnderkategori } from '../../../../../../../models/meldinger/oppgave';
import Select from 'nav-frontend-skjema/lib/select';
import { ChangeEvent } from 'react';
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import Textarea from 'nav-frontend-skjema/lib/textarea';
import styled from 'styled-components';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkeKnapp } from '../../../../../../../components/common-styled-components';

const KnappWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

interface Props {
    gsakTema: GsakTema[];
    valgtTraad?: Traad;
}

interface InternalProps extends Props {
    valgtTema?: GsakTema;
    valgtUnderkategori?: GsakTemaUnderkategori;
    valgtOppgavetype?: GsakTemaOppgavetype;
    valgtPrioritet: Prioritet;
    beskrivelse: string;
    settValgtTema(tema: GsakTema | undefined): void;
    settValgtUnderkategori(underkategori: GsakTemaUnderkategori | undefined): void;
    settValgtOppgavetype(oppgavetype: GsakTemaOppgavetype | undefined): void;
    settPrioritet(event: React.SyntheticEvent<EventTarget>, value: string): void;
    settBeskrivelse(beskrivelse: string): void;
}

enum Prioritet {
    HOY = 'Høy',
    NORM = 'Normal',
    LAV = 'Lav'
}

function hentValgtTema(props: Props, event: ChangeEvent<HTMLSelectElement>): GsakTema | undefined {
    return props.gsakTema.find(tema => tema.kode === event.target.value) || undefined;
}

function hentValgtUnderkategori(
    event: ChangeEvent<HTMLSelectElement>,
    valgtTema?: GsakTema
): GsakTemaUnderkategori | undefined {
    return valgtTema && valgtTema.underkategorier.find(underkategori => underkategori.kode === event.target.value);
}

function hentValgtOppgavetype(
    event: ChangeEvent<HTMLSelectElement>,
    valgtTema?: GsakTema
): GsakTemaOppgavetype | undefined {
    return valgtTema && valgtTema.oppgavetyper.find(oppgavetype => oppgavetype.kode === event.target.value);
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

function SkjemaElementer(props: InternalProps) {
    return (
        <>
            <Select label={'Tema'} onChange={event => props.settValgtTema(hentValgtTema(props, event))}>
                {lagTemaOptions(props)}
            </Select>
            <Select
                label={'Gjelder'}
                onChange={event => props.settValgtUnderkategori(hentValgtUnderkategori(event, props.valgtTema))}
            >
                {lagUnderkategoriOptions(props.valgtTema)}
            </Select>
            <Select
                label={'Type oppgave'}
                onChange={event => props.settValgtOppgavetype(hentValgtOppgavetype(event, props.valgtTema))}
            >
                {lagOppgavetypeOptions(props.valgtTema)}
            </Select>
            <RadioPanelGruppe
                radios={[
                    { label: 'Høy', value: Prioritet.HOY, disabled: !props.valgtTema },
                    { label: 'Normal', value: Prioritet.NORM, disabled: !props.valgtTema },
                    { label: 'Lav', value: Prioritet.LAV, disabled: !props.valgtTema }
                ]}
                name={'Prioritet'}
                checked={props.valgtPrioritet}
                legend={'Prioritet'}
                onChange={props.settPrioritet}
            />
            <Textarea
                value={props.beskrivelse}
                label={'Beskrivelse'}
                onChange={e =>
                    props.settBeskrivelse((e as React.KeyboardEvent<HTMLTextAreaElement>).currentTarget.value)
                }
            />
            <KnappWrapper>
                <Hovedknapp role="submit">Send</Hovedknapp>
                <LenkeKnapp type="button">Avbryt</LenkeKnapp>
            </KnappWrapper>
        </>
    );
}

function OpprettOppgaveSkjema(props: InternalProps) {
    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        console.log('Skal lagre...');
    };

    return (
        <form onSubmit={submitHandler}>
            <SkjemaElementer {...props} />
        </form>
    );
}

function OppgavePanel(props: Props) {
    const [valgtTema, velgTema] = useState<GsakTema | undefined>(undefined);
    const [valgtUnderkategori, settValgtUnderkategori] = useState<GsakTemaUnderkategori | undefined>(undefined);
    const [valgtOppgavetype, settValgtOppgavetype] = useState<GsakTemaOppgavetype | undefined>(undefined);
    const [valgtPrioritet, velgPrioritet] = useState(Prioritet.NORM);
    const [beskrivelse, settBeskrivelse] = useState('');

    function settPrioritet(event: React.SyntheticEvent<EventTarget>, value: string) {
        if (Prioritet.HOY === value) {
            velgPrioritet(Prioritet.HOY);
        } else if (Prioritet.NORM === value) {
            velgPrioritet(Prioritet.NORM);
        } else {
            velgPrioritet(Prioritet.LAV);
        }
    }

    function settValgtTema(tema: GsakTema | undefined) {
        velgTema(tema);
        if (!tema) {
            settValgtUnderkategori(undefined);
            settValgtOppgavetype(undefined);
        }
    }

    const internalProps: InternalProps = {
        valgtTema,
        valgtUnderkategori,
        valgtOppgavetype,
        valgtPrioritet,
        beskrivelse,
        settValgtTema,
        settValgtUnderkategori,
        settValgtOppgavetype,
        settPrioritet,
        settBeskrivelse,
        ...props
    };

    return <OpprettOppgaveSkjema {...internalProps} />;
}

export default OppgavePanel;
