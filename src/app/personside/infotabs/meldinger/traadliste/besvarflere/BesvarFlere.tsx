import * as React from 'react';
import { SlaaSammenOppgave, SlaaSammenRequest, Traad } from '../../../../../../models/meldinger/meldinger';
import TraadListeElement from '../TraadListeElement';
import styled from 'styled-components';
import theme from '../../../../../../styles/personOversiktTheme';
import { Checkbox } from 'nav-frontend-skjema';
import { useState } from 'react';
import EnkeltMelding from '../../traadvisning/Enkeltmelding';
import { Normaltekst } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../../redux/reducers';

interface Props {
    traader: Traad[];
}

const Style = styled.article`
    width: 80vw;
    height: 80vh;
    max-width: 100rem;
    max-height: 100rem;
`;

const TraadStyle = styled.div`
    display: flex;
    > *:first-child {
        flex: 30% 1 1;
    }
    > *:last-child {
        flex: 70% 1 1;
    }
`;

const ElementStyle = styled.div`
    display: flex;
`;

const TraadlistStyle = styled.ol`
    list-style: none;
`;

const TraadVisningStyle = styled.section`
    padding: ${theme.margin.layout};
    flex-grow: 1;
    > *:last-child {
        margin-top: ${theme.margin.layout};
    }
`;

function hentTemagruppe(traader: Traad[]) {
    return traader[0].meldinger[0].temagruppe.toString();
}

function hentSlaasammenOppgaver(traader: Traad[]): SlaaSammenOppgave[] {
    return traader.reduce((acc: SlaaSammenOppgave[], traad: Traad) => {
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

    const traadkomponenter = props.traader.map(traad => (
        <ElementStyle>
            <Checkbox
                label={''}
                checked={valgteTraader.map(traad => traad.traadId).includes(traad.traadId)}
                onChange={() => onCheckTraad(traad)}
            />
            <TraadListeElement
                traad={traad}
                key={traad.traadId}
                erValgt={traadSomSkalVises.traadId === traad.traadId}
                onClick={() => setTraadSomSkalVises(traad)}
            />
        </ElementStyle>
    ));

    const clickHandler = () => {
        const request: SlaaSammenRequest = {
            temagruppe: hentTemagruppe(valgteTraader),
            oppgaver: hentSlaasammenOppgaver(valgteTraader)
        };
        dispatch(slaaSammenResource.actions.post(request));
    };

    return (
        <Style>
            <Normaltekst>Besvar flere tråder</Normaltekst>
            <TraadStyle>
                <TraadlistStyle>{traadkomponenter}</TraadlistStyle>
                <Meldingsvisning traad={traadSomSkalVises} />
            </TraadStyle>
            <KnappBase type={'hoved'} onClick={clickHandler}>
                Besvar flere
            </KnappBase>
        </Style>
    );
}

export default BesvarFlere;
