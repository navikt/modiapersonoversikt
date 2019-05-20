import React, { useState, FormEvent } from 'react';
import { Traad } from '../../../../../../../models/meldinger/meldinger';
import {
    GsakTema,
    GsakTemaOppgavetype,
    GsakTemaUnderkategori,
    OpprettOppgaveRequest
} from '../../../../../../../models/meldinger/oppgave';
import Select from 'nav-frontend-skjema/lib/select';
import { ChangeEvent } from 'react';
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import Textarea from 'nav-frontend-skjema/lib/textarea';
import styled from 'styled-components';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkeKnapp } from '../../../../../../../components/common-styled-components';
import { getSaksbehandlerEnhet } from '../../../../../../../utils/loggInfo/saksbehandlersEnhetInfo';
import { eldsteMelding } from '../../../utils/meldingerUtils';
import moment from 'moment';
import { PostResource } from '../../../../../../../rest/utils/postResource';
import { InnloggetSaksbehandler } from '../../../../../../../models/innloggetSaksbehandler';

const KnappWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const SkjemaStyle = styled.div`
    .inputPanelGruppe__inner {
        display: flex;
    }
`;

interface StateProps {
    gsakTema: GsakTema[];
    valgtTraad?: Traad;
    gjeldendeBrukerFnr: string;
    innloggetSaksbehandler: InnloggetSaksbehandler;
    opprettOppgaveResource: PostResource<OpprettOppgaveRequest>;
}

type Props = StateProps;

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
    HOY = 'HOY',
    NORM = 'NORM',
    LAV = 'LAV'
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
        <option value={''} key={''}>
            Velg tema
        </option>,
        props.gsakTema.map(gsakTema => (
            <option value={`${gsakTema.kode}`} key={gsakTema.kode}>
                {gsakTema.tekst}
            </option>
        ))
    ];
}

function lagUnderkategoriOptions(valgtGsakTema?: GsakTema) {
    return valgtGsakTema
        ? [
              <option value={''} key={''}>
                  Velg underkategori
              </option>,
              valgtGsakTema.underkategorier.map(underkategori => (
                  <option value={`${underkategori.kode}`} key={underkategori.kode}>
                      {underkategori.tekst}
                  </option>
              ))
          ]
        : [
              <option value={''} key={''}>
                  Ingen tema valgt
              </option>
          ];
}

function lagOppgavetypeOptions(valgtGsakTema?: GsakTema) {
    return valgtGsakTema
        ? [
              <option value={''} key={''}>
                  Velg oppgavetype
              </option>,
              valgtGsakTema.oppgavetyper.map(oppgavetype => (
                  <option value={`${oppgavetype.kode}`} key={oppgavetype.kode}>
                      {oppgavetype.tekst}
                  </option>
              ))
          ]
        : [
              <option value={''} key={''}>
                  Ingen tema valgt
              </option>
          ];
}

function SkjemaElementer(props: InternalProps) {
    return (
        <SkjemaStyle>
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
                <Hovedknapp role="submit" disabled={!props.valgtTema || !props.valgtOppgavetype}>
                    Send
                </Hovedknapp>
                <LenkeKnapp type="button">Avbryt</LenkeKnapp>
            </KnappWrapper>
        </SkjemaStyle>
    );
}

function OpprettOppgaveSkjema(props: InternalProps) {
    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        const request = lagOppgaveRequest(props);
        console.log('Skal lagre ', request);
        props.opprettOppgaveResource.actions.post(request);
    };

    return (
        <form onSubmit={submitHandler}>
            <SkjemaElementer {...props} />
        </form>
    );
}

function lagOppgaveRequest(props: InternalProps): OpprettOppgaveRequest {
    const saksbehandlerEnhet = getSaksbehandlerEnhet();
    const temakode = props.valgtTema ? props.valgtTema.kode : 'UKJENT';

    return {
        valgtEnhetId: saksbehandlerEnhet ? saksbehandlerEnhet : '2820',
        henvendelseId: props.valgtTraad ? eldsteMelding(props.valgtTraad).id : 'UKJENT',
        dagerFrist: props.valgtOppgavetype ? props.valgtOppgavetype.dagerFrist : 0,
        ansvarligIdent: props.innloggetSaksbehandler.ident,
        beskrivelse: lagBeskrivelse(props.beskrivelse, props.innloggetSaksbehandler, saksbehandlerEnhet),
        temakode: temakode,
        underkategorikode: props.valgtUnderkategori && props.valgtUnderkategori.kode,
        brukerid: props.gjeldendeBrukerFnr,
        oppgaveTypeKode: props.valgtOppgavetype ? props.valgtOppgavetype.kode : 'UKJENT',
        prioritetKode: props.valgtPrioritet + '_' + temakode
    };
}

function lagBeskrivelse(
    beskrivelse: string,
    innloggetSaksbehandler: InnloggetSaksbehandler,
    saksbehandlerEnhet?: string
) {
    const formattedDate = moment().format('DD.MM.YYYY HH:mm');

    return `--- ${formattedDate} ${innloggetSaksbehandler.navn} (${
        innloggetSaksbehandler.ident
    } ${saksbehandlerEnhet}) ---\n${beskrivelse}`;
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
