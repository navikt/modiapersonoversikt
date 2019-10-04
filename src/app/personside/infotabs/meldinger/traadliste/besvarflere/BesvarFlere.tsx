import * as React from 'react';
import {
    SlaaSammenMelding,
    SlaaSammenRequest,
    SlaaSammenResponse,
    Traad
} from '../../../../../../models/meldinger/meldinger';
import TraadListeElement from '../TraadListeElement';
import styled from 'styled-components';
import theme from '../../../../../../styles/personOversiktTheme';
import { Checkbox } from 'nav-frontend-skjema';
import { FormEvent, useState } from 'react';
import EnkeltMelding from '../../traadvisning/Enkeltmelding';
import { Ingress } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../../redux/reducers';
import { isPosting } from '../../../../../../rest/utils/postResource';
import { useRestResource } from '../../../../../../utils/customHooks';
import { setValgtTraadDialogpanel } from '../../../../../../redux/oppgave/actions';
import { loggError } from '../../../../../../utils/frontendLogger';
import { useInfotabsDyplenker } from '../../../dyplenker';
import { RouteComponentProps, withRouter } from 'react-router';

interface Props {
    traader: Traad[];
    lukkModal: () => void;
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
        flex: 30% 1 1;
    }
    > *:last-child {
        flex: 70% 1 1;
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

const TraadVisningStyle = styled.section`
    padding: ${theme.margin.layout};
    flex-grow: 1;
`;

const StyledCheckbox = styled(Checkbox)`
    padding: 1rem;
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
`;

function getTemagruppeForTraader(traader: Traad[]) {
    return traader[0].meldinger[0].temagruppe.toString();
}

function getMeldingerSomSkalSlaasSammen(traader: Traad[]): SlaaSammenMelding[] {
    return traader.reduce((acc: SlaaSammenMelding[], traad: Traad) => {
        return acc.concat(
            traad.meldinger.map(melding => ({
                oppgaveId: melding.oppgaveId!,
                henvendelsesId: traad.traadId,
                meldingsId: melding.id
            }))
        );
    }, []);
}

function Meldingsvisning({ traad }: { traad: Traad }) {
    const meldinger = traad.meldinger.map(melding => <EnkeltMelding melding={melding} sokeord={''} />);

    return <TraadVisningStyle>{meldinger}</TraadVisningStyle>;
}

function BesvarFlere(props: Props & RouteComponentProps) {
    const dispatch = useDispatch();
    const slaaSammenResource = useSelector((state: AppState) => state.restResources.slaaSammen);
    const setTråderITråderResource = useRestResource(resources => resources.tråderOgMeldinger.actions.setData);
    const resetPlukkOppgave = useRestResource(resources => resources.plukkNyeOppgaver.actions.reset);
    const reloadTildelteOppgaver = useRestResource(resources => resources.tildelteOppgaver.actions.reload);
    const [valgteTraader, setValgteTraader] = useState<Traad[]>([]);
    const [traadSomSkalVises, setTraadSomSkalVises] = useState<Traad>(props.traader[0]);
    const dyplenker = useInfotabsDyplenker();

    function handleCheckboxChange(traad: Traad) {
        if (valgteTraader.includes(traad)) {
            const nyListe = valgteTraader.filter(t => t.traadId !== traad.traadId);
            setValgteTraader(nyListe);
        } else {
            const nyListe = [...valgteTraader, traad];
            setValgteTraader(nyListe);
        }
    }

    const traadkomponenter = props.traader.map(traad => {
        const checkbox = (
            <StyledCheckbox
                label={''}
                aria-label={'Velg tråd'}
                checked={valgteTraader.map(traad => traad.traadId).includes(traad.traadId)}
                onChange={() => handleCheckboxChange(traad)}
            />
        );
        return (
            <TraadListeElement
                traad={traad}
                key={traad.traadId}
                erValgt={traadSomSkalVises.traadId === traad.traadId}
                onClick={() => setTraadSomSkalVises(traad)}
                tillegskomponent={checkbox}
            />
        );
    });

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (isPosting(slaaSammenResource)) {
            return;
        }
        const request: SlaaSammenRequest = {
            temagruppe: getTemagruppeForTraader(valgteTraader),
            meldinger: getMeldingerSomSkalSlaasSammen(valgteTraader)
        };
        const callback = (response: SlaaSammenResponse) => {
            dispatch(setTråderITråderResource(response.traader));
            dispatch(resetPlukkOppgave);
            dispatch(reloadTildelteOppgaver);

            const nyValgtTråd = response.traader.find(traad => traad.traadId === response.nyTraadId);
            if (nyValgtTråd) {
                dispatch(setValgtTraadDialogpanel(nyValgtTråd));
                props.history.push(dyplenker.meldinger.link(nyValgtTråd));
            } else {
                loggError(Error('Besvar flere: Kunne ikke finne tråd som matcher trådId: ' + response.nyTraadId));
            }
            props.lukkModal();
        };
        dispatch(slaaSammenResource.actions.post(request, callback));
    };

    return (
        <FormStyle onSubmit={handleSubmit}>
            <TittelWrapper>
                <Ingress>Slå sammen tråder</Ingress>
            </TittelWrapper>
            <TraadStyle>
                <TraadlistStyle>{traadkomponenter}</TraadlistStyle>
                <Meldingsvisning traad={traadSomSkalVises} />
            </TraadStyle>
            <KnappWrapper>
                <KnappBase type={'hoved'} spinner={isPosting(slaaSammenResource)}>
                    Slå sammen
                </KnappBase>
            </KnappWrapper>
        </FormStyle>
    );
}

export default withRouter(BesvarFlere);
