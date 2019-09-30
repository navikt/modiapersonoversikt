import * as React from 'react';
import { Traad } from '../../../../../../models/meldinger/meldinger';
import TraadListeElement from '../TraadListeElement';
import styled from 'styled-components';
import theme from '../../../../../../styles/personOversiktTheme';
import { Checkbox } from 'nav-frontend-skjema';
import { useState } from 'react';
import EnkeltMelding from '../../traadvisning/Enkeltmelding';
import { Normaltekst } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';

interface Props {
    traader: Traad[];
}

const Style = styled.article``;

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

function Meldingsvisning({ traad }: { traad: Traad }) {
    const meldinger = traad.meldinger.map(melding => <EnkeltMelding melding={melding} sokeord={''} />);

    return <TraadVisningStyle>{meldinger}</TraadVisningStyle>;
}

function BesvarFlere(props: Props) {
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

    return (
        <Style>
            <Normaltekst>Besvar flere tråder</Normaltekst>
            <TraadStyle>
                <TraadlistStyle>{traadkomponenter}</TraadlistStyle>
                <Meldingsvisning traad={traadSomSkalVises} />
            </TraadStyle>
            <KnappBase type={'hoved'} onClick={() => {}}>
                Besvar flere
            </KnappBase>
        </Style>
    );
}

export default BesvarFlere;
