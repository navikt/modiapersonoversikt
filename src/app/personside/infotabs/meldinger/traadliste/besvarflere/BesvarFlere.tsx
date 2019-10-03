import * as React from 'react';
import { SlaaSammenMelding, SlaaSammenRequest, Traad } from '../../../../../../models/meldinger/meldinger';
import TraadListeElement from '../TraadListeElement';
import styled from 'styled-components';
import theme from '../../../../../../styles/personOversiktTheme';
import { Checkbox } from 'nav-frontend-skjema';
import { useState } from 'react';
import EnkeltMelding from '../../traadvisning/Enkeltmelding';
import { Ingress } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../../redux/reducers';

interface Props {
    traader: Traad[];
}

const Style = styled.article`
    display: flex;
    flex-direction: column;
    width: 80vw;
    height: 80vh;
    max-width: 100rem;
    max-height: 100rem;
    > *:not(:last-child) {
        border-bottom: ${theme.border.skilleSvak};
    }
    > *:nth-child(2) {
        flex-grow: 1;
        background-color: ${theme.color.navGra20};
    }
    > *:last-child {
        background-color: ${theme.color.navLysGra};
        padding: ${theme.margin.layout};
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
    label {
        ${theme.visuallyHidden}
    }
`;

const TittelWrapper = styled.div`
    background-color: ${theme.color.navLysGra};
    padding: 1.25rem ${theme.margin.layout};
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

function BesvarFlere(props: Props) {
    const dispatch = useDispatch();
    const slaaSammenResource = useSelector((state: AppState) => state.restResources.slaaSammen);
    const [valgteTraader, setValgteTraader] = useState<Traad[]>([]);
    const [traadSomSkalVises, setTraadSomSkalVises] = useState<Traad>(props.traader[0]);

    function onCheckTraad(traad: Traad) {
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
                label={'Velg tråd'}
                checked={valgteTraader.map(traad => traad.traadId).includes(traad.traadId)}
                onChange={() => onCheckTraad(traad)}
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

    const clickHandler = () => {
        const request: SlaaSammenRequest = {
            temagruppe: getTemagruppeForTraader(valgteTraader),
            meldinger: getMeldingerSomSkalSlaasSammen(valgteTraader)
        };
        dispatch(slaaSammenResource.actions.post(request));
    };

    return (
        <Style>
            <TittelWrapper>
                <Ingress>Slå sammen tråder</Ingress>
            </TittelWrapper>

            <TraadStyle>
                <TraadlistStyle>{traadkomponenter}</TraadlistStyle>
                <Meldingsvisning traad={traadSomSkalVises} />
            </TraadStyle>

            <div>
                <KnappBase type={'hoved'} onClick={clickHandler}>
                    Slå sammen
                </KnappBase>
            </div>
        </Style>
    );
}

export default BesvarFlere;
