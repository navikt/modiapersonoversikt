import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';
import { Temagruppe } from '../../../../models/meldinger/meldinger';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';

interface Props {
    handleSend: (temagruppe: string) => void;
}

interface Valg {
    kodeverk: string;
    beskrivelse: string;
}

const temagrupper: Valg[] = [
    {
        kodeverk: Temagruppe.Arbeid,
        beskrivelse: 'Arbeid'
    },
    {
        kodeverk: Temagruppe.Familie,
        beskrivelse: 'Familie'
    },
    {
        kodeverk: Temagruppe.Hjelpemiddel,
        beskrivelse: 'Hjelpemiddel'
    },
    {
        kodeverk: Temagruppe.Pensjon,
        beskrivelse: 'Pensjon'
    },
    {
        kodeverk: Temagruppe.Øvrig,
        beskrivelse: 'Øvrig'
    }
];

const TemagruppeWrapper = styled.div`
    position: relative;
`;

const HvittPanel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    ${theme.hvittPanel};
    z-index: 999;
    position: absolute;
    right: 0;
    filter: drop-shadow(0 1rem 2rem rgba(0, 0, 0, 0.7));
    > *:first-child {
        margin-bottom: 0.5rem;
    }
    li {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        margin-bottom: 0.3rem;
    }
`;

function TemaGruppeValg(props: Props) {
    return (
        <TemagruppeWrapper>
            <HvittPanel>
                <Undertittel tag="h4">Temagruppe</Undertittel>
                <ul>
                    {temagrupper.map(tema => (
                        <li key={tema.kodeverk}>
                            <KnappBase type="standard" onClick={() => props.handleSend(tema.kodeverk)}>
                                {tema.beskrivelse}
                            </KnappBase>
                        </li>
                    ))}
                </ul>
            </HvittPanel>
        </TemagruppeWrapper>
    );
}

export default TemaGruppeValg;
