import * as React from 'react';
import { FormEvent, useState } from 'react';
import { Traad } from '../../../../../../models/meldinger/meldinger';
import TraadListeElement from '../TraadListeElement';
import styled from 'styled-components/macro';
import theme from '../../../../../../styles/personOversiktTheme';
import { Checkbox, SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import EnkeltMelding from '../../traadvisning/Enkeltmelding';
import { Ingress } from 'nav-frontend-typografi';
import KnappBase, { Hovedknapp } from 'nav-frontend-knapper';
import { useDispatch } from 'react-redux';
import { useAppState, useOnMount } from '../../../../../../utils/customHooks';
import { setValgtTraadDialogpanel } from '../../../../../../redux/oppgave/actions';
import { loggError, loggEvent } from '../../../../../../utils/logger/frontendLogger';
import { useInfotabsDyplenker } from '../../../dyplenker';
import { RouteComponentProps, withRouter } from 'react-router';
import { AlertStripeFeil, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { runIfEventIsNotInsideRef } from '../../../../../../utils/reactRef-utils';
import { useRestResource } from '../../../../../../rest/consumer/useRestResource';
import { apiBaseUri, postConfig } from '../../../../../../api/config';
import { useGjeldendeBruker } from '../../../../../../redux/gjeldendeBruker/types';
import { FetchResponse, fetchToJson, hasData, hasError } from '../../../../../../utils/fetchToJson';
import { Temagruppe } from '../../../../../../models/temagrupper';
import { selectValgtEnhet } from '../../../../../../redux/session/session';

interface Props {
    traader: Traad[];
    lukkModal: () => void;
}

export interface SlaaSammenRequest {
    enhet: String;
    traader: SlaaSammenTraad[];
    temagruppe: Temagruppe;
}

export interface SlaaSammenTraad {
    oppgaveId: string;
    traadId: string;
}

export interface SlaaSammenResponse {
    nyTraadId: string;
    traader: Traad[];
}

const FormStyle = styled.form`
    background-color: ${theme.color.navGra20};
    width: 80vw;
    height: 80vh;
    max-width: 100rem;
    max-height: 100rem;
    display: -ms-grid;
    display: grid;
    -ms-grid-rows: auto minmax(0, 1fr) auto;
    grid-template-rows: auto minmax(0, 1fr) auto;
    -ms-grid-columns: 1fr;
    grid-template-columns: 1fr;
    > *:nth-child(1) {
        -ms-grid-row: 1;
    }
    > *:nth-child(2) {
        -ms-grid-row: 2;
    }
    > *:nth-child(3) {
        -ms-grid-row: 3;
    }
`;

const TraadStyle = styled.div`
    display: flex;
    > *:first-child {
        flex: 35% 1 1;
    }
    > *:last-child {
        flex: 65% 1 1;
    }
    > * {
        overflow: auto;
    }
`;

const TraadlistStyle = styled.ol`
    display: flex;
    background-color: white;
    flex-direction: column;
    list-style: none;
    > * {
        border-bottom: ${theme.border.skilleSvak};
    }
`;

const TraadVisningStyle = styled.ol`
    padding: ${theme.margin.layout};
    flex-grow: 1;
`;

const CheckboxWrapper = styled.div`
    margin: 0 0.5rem;
    align-self: center;
    transform: translateY(-0.5rem);
`;

const TittelWrapper = styled.div`
    background-color: ${theme.color.navLysGra};
    padding: 1.25rem ${theme.margin.layout};
`;

const KnappWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    background-color: ${theme.color.navLysGra};
    padding: ${theme.margin.layout};
    > * {
        margin-left: 1rem;
    }
`;

const KvitteringStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    background-color: ${theme.color.navLysGra};
    padding: 4rem 1rem 1rem;
    > *:not(:last-child) {
        margin-bottom: 1rem;
    }
`;

function getTemagruppeForTraader(traader: Traad[]) {
    return traader[0].meldinger[0].temagruppe;
}

function getTraaderSomSkalSlaasSammen(traader: Traad[]): SlaaSammenTraad[] {
    return traader.map(traad => {
        const sporsmaal = traad.meldinger.find(melding => melding.id === traad.traadId);

        return {
            oppgaveId: sporsmaal!.oppgaveId!,
            traadId: traad.traadId
        };
    });
}

function Meldingsvisning({ traad }: { traad: Traad }) {
    const meldinger = traad.meldinger.map((melding, index) => {
        const meldingnummer = traad.meldinger.length - index;
        return <EnkeltMelding key={melding.id} melding={melding} sokeord={''} meldingsNummer={meldingnummer} />;
    });

    return <TraadVisningStyle role="tabpanel">{meldinger}</TraadVisningStyle>;
}

function ListeElement(props: {
    traad: Traad;
    shown: boolean;
    checked: boolean;
    handleCheck: () => void;
    visTraad: () => void;
}) {
    const checkBoxRef = React.createRef<HTMLDivElement>();
    const checkbox = (
        <CheckboxWrapper ref={checkBoxRef}>
            <Checkbox label={''} aria-label={'Velg tråd'} checked={props.checked} onChange={props.handleCheck} />
        </CheckboxWrapper>
    );

    return (
        <TraadListeElement
            traad={props.traad}
            key={props.traad.traadId}
            erValgt={props.shown}
            onClick={runIfEventIsNotInsideRef(checkBoxRef, props.visTraad)}
            tillegskomponent={checkbox}
            listeId="traadliste-slaa-sammen"
        />
    );
}

function BesvarFlere(props: Props & RouteComponentProps) {
    const dispatch = useDispatch();
    const fnr = useGjeldendeBruker();
    const [isPosting, setIsPosting] = useState(false);
    const [response, setResponse] = useState<FetchResponse<SlaaSammenResponse> | undefined>(undefined);
    const setTråderITråderResource = useRestResource(resources => resources.traader).actions.setData;
    const reloadTildelteOppgaver = useRestResource(resources => resources.tildelteOppgaver).actions.reload;
    const [valgteTraader, setValgteTraader] = useState<Traad[]>([]);
    const [traadSomSkalVises, setTraadSomSkalVises] = useState<Traad>(props.traader[0]);
    const [feilmelding, setFeilmelding] = useState<string | undefined>(undefined);
    const dyplenker = useInfotabsDyplenker();
    const valgtEnhet = useAppState(selectValgtEnhet);

    useOnMount(() => {
        loggEvent('Åpnet', 'BesvarFlere');
    });

    function handleCheckboxChange(traad: Traad) {
        setFeilmelding(undefined);
        if (valgteTraader.includes(traad)) {
            const nyListe = valgteTraader.filter(t => t.traadId !== traad.traadId);
            setValgteTraader(nyListe);
        } else {
            const nyListe = [...valgteTraader, traad];
            setValgteTraader(nyListe);
        }
    }

    const traadkomponenter = props.traader.map(traad => (
        <ListeElement
            checked={valgteTraader.includes(traad)}
            handleCheck={() => handleCheckboxChange(traad)}
            shown={traadSomSkalVises === traad}
            traad={traad}
            visTraad={() => setTraadSomSkalVises(traad)}
            key={traad.traadId}
        />
    ));

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (isPosting) {
            return;
        }

        if (valgteTraader.length <= 1) {
            setFeilmelding('Du må minst velge to tråder');
            return;
        }
        const temagruppe = getTemagruppeForTraader(valgteTraader);
        const traaderSomSkalSlaasSammen = getTraaderSomSkalSlaasSammen(valgteTraader);
        if (!temagruppe) {
            const message = 'Kunne ikke finne temagruppe for tråder, kontakt brukerstøtte';
            setFeilmelding(message);
            loggError(Error(message), 'Kunne ikke finne temagruppe for tråder som skulle slåes sammen', {
                traader: JSON.stringify(traaderSomSkalSlaasSammen)
            });
            return;
        }

        const request: SlaaSammenRequest = {
            enhet: valgtEnhet,
            temagruppe: temagruppe,
            traader: traaderSomSkalSlaasSammen
        };

        setIsPosting(true);
        fetchToJson<SlaaSammenResponse>(`${apiBaseUri}/dialog/${fnr}/slaasammen`, postConfig(request))
            .then(response => {
                setIsPosting(false);
                setResponse(response);
                if (hasData(response)) {
                    loggEvent('OppgaverSlåttSammen', 'BesvarFlere', undefined, { antall: request.traader.length });
                    dispatch(setTråderITråderResource(response.data.traader));
                    dispatch(reloadTildelteOppgaver);

                    const nyValgtTråd = response.data.traader.find(traad => traad.traadId === response.data.nyTraadId);
                    if (nyValgtTråd) {
                        dispatch(setValgtTraadDialogpanel(nyValgtTråd));
                        props.history.push(dyplenker.meldinger.link(nyValgtTråd));
                    } else {
                        loggError(
                            Error('Besvar flere: Kunne ikke finne tråd som matcher trådId: ' + response.data.nyTraadId)
                        );
                    }
                }
            })
            .catch((e: Error) => {
                loggError(e);
            });
    };

    if (response && hasData(response)) {
        return (
            <KvitteringStyle>
                <AlertStripeInfo>Oppgavene ble slått sammen</AlertStripeInfo>
                <Hovedknapp htmlType="button" onClick={props.lukkModal}>
                    Lukk
                </Hovedknapp>
            </KvitteringStyle>
        );
    }

    if (response && hasError(response)) {
        return <AlertStripeFeil>Det skjedde en feil i baksystemene: {response.message}</AlertStripeFeil>;
    }

    return (
        <FormStyle onSubmit={handleSubmit}>
            <TittelWrapper>
                <Ingress>Slå sammen oppgaver</Ingress>
            </TittelWrapper>
            <TraadStyle>
                <TraadlistStyle role="tablist">{traadkomponenter}</TraadlistStyle>
                <Meldingsvisning traad={traadSomSkalVises} />
            </TraadStyle>
            <KnappWrapper>
                {feilmelding && <SkjemaelementFeilmelding>{feilmelding}</SkjemaelementFeilmelding>}
                <KnappBase type={'hoved'} spinner={isPosting}>
                    Slå sammen {valgteTraader.length > 1 ? `${valgteTraader.length} ` : 'oppgaver'}
                </KnappBase>
            </KnappWrapper>
        </FormStyle>
    );
}

export default withRouter(BesvarFlere);
