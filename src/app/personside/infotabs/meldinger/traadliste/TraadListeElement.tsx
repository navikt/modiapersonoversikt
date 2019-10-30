import * as React from 'react';
import { ChangeEvent, ReactNode } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Melding, Traad } from '../../../../../models/meldinger/meldinger';
import styled, { css } from 'styled-components';
import { theme } from '../../../../../styles/personOversiktTheme';
import { formatterDatoTid } from '../../../../../utils/dateUtils';
import { erDelvisBesvart, meldingstittel, nyesteMelding } from '../utils/meldingerUtils';
import Meldingsikon from '../utils/Meldingsikon';
import { EtikettAdvarsel, EtikettFokus, EtikettInfo, EtikettSuksess } from 'nav-frontend-etiketter';
import { useAppState, useOnMount } from '../../../../../utils/customHooks';
import { UnmountClosed } from 'react-collapse';
import useTildelteOppgaver from '../../../../../utils/hooks/useTildelteOppgaver';
import { useInfotabsDyplenker } from '../../dyplenker';
import { meldingerTest } from '../../dyplenkeTest/utils';
import { delAvStringMedDots } from '../../../../../utils/string-utils';
import { Temagruppe } from '../../../../../models/Temagrupper';
import { useHistory } from 'react-router';
import { HoyreChevron } from 'nav-frontend-chevron';
import { traadListeRoles } from './traadListeRoles';

interface Props {
    traad: Traad;
    erValgt: boolean;
    taFokusOnMount?: boolean;
    onClick?: (event: React.ChangeEvent) => void;
    tillegskomponent?: ReactNode;
}

const UUcustomOrder = styled.div`
    display: flex;
    flex-direction: column;
    .order-first {
        order: 0;
    }
    .order-second {
        order: 1;
    }
`;

const StyledLabel = styled.label`
    padding: ${theme.margin.layout};
    display: flex;
    cursor: pointer;
`;

const EtikettStyling = styled.div`
    > *:not(:last-child) {
        margin-bottom: 0.2rem;
        margin-right: 0.2rem;
    }
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-top: 0.2rem;
`;

const StyledLi = styled.li<{ valgt: boolean }>`
    &:focus-within {
        ${theme.focusOverlay};
    }
    ${props =>
        props.valgt &&
        css`
            background-color: ${theme.color.kategori};
        `};
    .hover-animation {
        transition: transform 0.3s;
    }
    &:hover {
        ${theme.hover};
        .hover-animation {
            transform: translateX(0.5rem);
        }
    }
`;

const ChevronStyling = styled.div`
    align-self: center;
`;

const ContentStyle = styled.div`
    /* IE11-fix*/
    flex-grow: 1;
    width: 0;
    margin-left: 0.8rem;
    overflow-wrap: break-word;
`;

function TraadListeElement(props: Props) {
    const underArbeid = useAppState(state => state.oppgaver.dialogpanelTraad === props.traad);
    const sisteMelding = nyesteMelding(props.traad);
    const datoTekst = formatterDatoTid(sisteMelding.opprettetDato);
    const tittel = meldingstittel(sisteMelding);
    const ref = React.createRef<HTMLInputElement>();
    const dyplenker = useInfotabsDyplenker();
    const id = traadListeRoles.ariaLabeledBy(props.traad);
    const history = useHistory();

    useOnMount(() => {
        if (props.taFokusOnMount) {
            ref.current && ref.current.focus();
        }
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (props.onClick) {
            props.onClick(e);
            return;
        }
        history.push(dyplenker.meldinger.link(props.traad));
    };

    return (
        <StyledLi className={meldingerTest.melding} valgt={props.erValgt}>
            <input
                className="sr-only"
                type="radio"
                aria-controls={traadListeRoles.ariaControls}
                name="traadliste"
                value={props.traad.traadId}
                id={id}
                onChange={handleChange}
                checked={props.erValgt}
                ref={ref}
            />
            <StyledLabel htmlFor={id}>
                {props.tillegskomponent}
                <Meldingsikon traad={props.traad} />
                <ContentStyle>
                    <UUcustomOrder>
                        <Element className="order-second">{tittel}</Element>
                        <Normaltekst className="order-first">{datoTekst}</Normaltekst>
                    </UUcustomOrder>
                    <Normaltekst>{delAvStringMedDots(sisteMelding.fritekst, 35)}</Normaltekst>
                    <EtikettStyling>
                        <UnmountClosed isOpened={underArbeid}>
                            <EtikettFokus>Under arbeid</EtikettFokus>
                        </UnmountClosed>
                        {erDelvisBesvart(props.traad) && <EtikettInfo>Delvis besvart</EtikettInfo>}
                        <TildeltSaksbehandlerEtikett traadId={props.traad.traadId} />
                        <SlettetEtikett melding={sisteMelding} />
                    </EtikettStyling>
                </ContentStyle>
                <ChevronStyling className="hover-animation">
                    <HoyreChevron stor={true} />
                </ChevronStyling>
            </StyledLabel>
        </StyledLi>
    );
}

function TildeltSaksbehandlerEtikett({ traadId }: { traadId: string }) {
    const tildelteOppgaver = useTildelteOppgaver();

    if (tildelteOppgaver.paaBruker.map(oppgave => oppgave.traadId).includes(traadId)) {
        return <EtikettSuksess>Tildelt meg</EtikettSuksess>;
    }

    return null;
}

function SlettetEtikett({ melding }: { melding: Melding }) {
    if (melding.temagruppe === Temagruppe.Null) {
        return <EtikettAdvarsel>Slettet</EtikettAdvarsel>;
    }

    return null;
}

export default React.memo(TraadListeElement);
