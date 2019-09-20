import * as React from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { datoSynkende } from '../../../../../utils/dateUtils';
import TraadListeElement from './TraadListeElement';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { meldingstittel, saksbehandlerTekst, sisteSendteMelding } from '../utils/meldingerUtils';
import { Input } from 'nav-frontend-skjema';

interface Props {
    traader: Traad[];
    valgtTraad?: Traad;
    sokeord: string;
    setSokeord: (newSokeord: string) => void;
}

const PanelStyle = styled.nav`
    ${theme.hvittPanel};
    ol {
        list-style: none;
    }
`;

const TraadListeStyle = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;
const InputStyle = styled.div`
    padding: ${theme.margin.layout};
`;
export function sokEtterMeldinger(traader: Traad[], query: string): Traad[] {
    const words = query.split(' ');
    return traader.filter(traad => {
        const fritekstMatch = traad.meldinger.some(melding =>
            melding.fritekst.toLowerCase().includes(words[0].toLowerCase())
        );
        const tittelMatch = traad.meldinger.some(melding =>
            meldingstittel(melding)
                .toLowerCase()
                .includes(words[0].toLowerCase())
        );
        const saksbehandlerMatch = traad.meldinger.some(melding =>
            saksbehandlerTekst(melding.skrevetAv)
                .toLowerCase()
                .includes(words[0].toLowerCase())
        );
        return fritekstMatch || tittelMatch || saksbehandlerMatch;
    });
}

function TraadListe(props: Props) {
    if (props.traader.length === 0) {
        return <AlertStripeInfo>Det finnes ingen meldinger for bruker.</AlertStripeInfo>;
    }
    const traadKomponenter = sokEtterMeldinger(props.traader, props.sokeord)
        .sort(datoSynkende(traad => sisteSendteMelding(traad).opprettetDato))
        .map(traad => <TraadListeElement traad={traad} key={traad.traadId} erValgt={traad === props.valgtTraad} />);

    return (
        <PanelStyle>
            <InputStyle>
                <Input
                    value={props.sokeord}
                    onChange={event => props.setSokeord(event.target.value)}
                    label={'Søk etter melding'}
                    className={'move-input-label'}
                />
            </InputStyle>
            <TraadListeStyle>{traadKomponenter}</TraadListeStyle>
        </PanelStyle>
    );
}

export default TraadListe;
