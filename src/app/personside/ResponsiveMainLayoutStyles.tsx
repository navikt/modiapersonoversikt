import * as React from 'react';
import styled from 'styled-components/macro';
import PilKnapp from '../../components/pilknapp';
import { HoyreKolonne as HoyreKolonneBase, VenstreKolonne as VenstreKolonneBase } from './MainLayoutStyles';
import { Undertittel } from 'nav-frontend-typografi';
import theme from '../../styles/personOversiktTheme';
import { useDialogpanelState } from '../../context/dialogpanel-state';

export const VenstreKolonne = styled(VenstreKolonneBase)`
    @media (${theme.media.smallScreen}) {
        ${(props) => (props.dialogPanelEkspandert ? theme.visuallyHidden : 'flex-grow: 1;')}
    }
    order: 1;
`;

export const HoyreKolonne = styled(HoyreKolonneBase)`
    @media (${theme.media.smallScreen}) {
        ${(props) => (props.dialogPanelEkspandert ? 'flex-grow: 1;' : theme.visuallyHidden)}
        > *:last-child {
            display: none;
        }
    }
    order: 2;
`;

const SideKnappContainer = styled.nav<{ stickToRight: boolean }>`
    display: flex;
    @media not all and (${theme.media.smallScreen}) {
        display: none;
    }
    @media print {
        display: none;
    }
    order: ${(props) => (props.stickToRight ? 4 : 0)};
    align-items: center;
    background-color: #7f7f7f;
    padding: 0.5em;
    overflow: hidden;
    cursor: pointer;
`;

const KnappWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
`;

const Tittel = styled.div`
    writing-mode: vertical-rl;
    text-transform: uppercase;
    text-orientation: mixed;
    margin-bottom: 1em;
`;

export function SmallScreenToggleButton() {
    const dialogpanel = useDialogpanelState();
    return (
        <SideKnappContainer onClick={() => dialogpanel.toggle()} stickToRight={!dialogpanel.apent}>
            <KnappWrapper>
                <Tittel>
                    <Undertittel>{dialogpanel.apent ? 'Oversikt' : 'Oppgavepanel'}</Undertittel>
                </Tittel>
                <PilKnapp
                    width="30px"
                    beskrivelse={dialogpanel.apent ? 'Vis oversikt' : 'Vis oppgavepanel'}
                    direction={dialogpanel.apent ? 'right' : 'left'}
                    onClick={() => () => null}
                />
            </KnappWrapper>
        </SideKnappContainer>
    );
}
