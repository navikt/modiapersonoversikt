import * as React from 'react';
import {Undertittel} from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';
import {Temagruppe} from '../../../../models/meldinger/meldinger';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import {useClickOutside, useFocusOnMount, useFocusOutside} from '../../../../utils/customHooks';

interface Props {
    handleVelgTemagruppe: (temagruppe: Valg) => void;
    lukk: () => void;
}

export interface Valg {
    kodeverk: string;
    beskrivelse: string;
}

const muligetemagruppevalg: Valg[] = [
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

const FocusableSpan = styled.span`
  &:focus {
    ${theme.focus};
  }
`;

function TemaGruppeValg(props: Props) {
    const headerRef = React.createRef<HTMLElement>();
    const wrapperRef = React.createRef<HTMLDivElement>();
    useFocusOnMount(headerRef);
    useClickOutside(wrapperRef, props.lukk);
    useFocusOutside(wrapperRef, props.lukk);
    return (
        <TemagruppeWrapper ref={wrapperRef}>
            <HvittPanel>
                <Undertittel tag="h4">
                    <FocusableSpan ref={headerRef} tabIndex={-1}>
                        Velg temagruppe
                    </FocusableSpan>
                </Undertittel>
                <ul>
                    {muligetemagruppevalg.map(tema => (
                        <li key={tema.kodeverk}>
                            <KnappBase type="standard" onClick={() => props.handleVelgTemagruppe(tema)}>
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
