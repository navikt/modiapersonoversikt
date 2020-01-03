import * as React from 'react';
import { useClickOutside, useRestResource } from '../../../utils/customHooks';
import styled from 'styled-components/macro';
import { Knapp } from 'nav-frontend-knapper';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { loggError } from '../../../utils/frontendLogger';
import theme from '../../../styles/personOversiktTheme';
import { nyesteMelding } from '../infotabs/meldinger/utils/meldingerUtils';
import { meldingstypeTekst } from '../infotabs/meldinger/utils/meldingstekster';
import { hasData } from '../../../rest/utils/restResource';
import LazySpinner from '../../../components/LazySpinner';
import { Normaltekst } from 'nav-frontend-typografi';
import { LenkeKnapp } from '../../../components/common-styled-components';
import { createRef, useState } from 'react';
import useTildelteOppgaver from '../../../utils/hooks/useTildelteOppgaver';
import { useInfotabsDyplenker } from '../infotabs/dyplenker';
import AlertStripeInfo from 'nav-frontend-alertstriper/lib/info-alertstripe';
import { temagruppeTekst } from '../../../models/Temagrupper';
import { useHistory } from 'react-router';

const Wrapper = styled.div`
    position: relative;
`;

const OppgaveListe = styled.ul`
    text-align: left;
    position: absolute;
    right: 0;
    z-index: 1000;
    filter: drop-shadow(0 1rem 2rem rgba(0, 0, 0, 0.7));
    max-height: 50vh;
    overflow: auto;
    li {
        display: flex;
        padding: 0.5rem 1rem;
        align-items: center;
        > *:first-child {
            flex-grow: 1;
            margin-right: 1rem;
        }
        &:not(:last-child) {
            border-bottom: ${theme.border.skilleSvak};
        }
    }
    ${theme.hvittPanel}
`;

const JustifyRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

function OppgaverDropdown(props: { lukk: () => void }) {
    const traaderResource = useRestResource(resources => resources.tråderOgMeldinger);
    const dyplenker = useInfotabsDyplenker();
    const tildelteOppgaver = useTildelteOppgaver();
    const oppgaverPaaBruker = tildelteOppgaver.paaBruker;
    const history = useHistory();

    if (!hasData(traaderResource)) {
        return <LazySpinner />;
    }

    const oppgaver = oppgaverPaaBruker.map(oppgave => {
        const traad = traaderResource.data.find(traad => traad.traadId === oppgave.traadId);
        if (!traad) {
            const error = new Error(`Kunne ikke finne tråd tilknyttet oppgave: ${oppgave.oppgaveId}`);
            loggError(error);
            return <AlertStripeFeil>{error.message}</AlertStripeFeil>;
        }
        const handleClick = () => {
            history.push(dyplenker.meldinger.link(traad));
            props.lukk();
        };
        const sisteMelding = nyesteMelding(traad);
        const tittel = `${meldingstypeTekst(sisteMelding.meldingstype)} - ${temagruppeTekst(sisteMelding.temagruppe)}`;
        return (
            <li key={oppgave.oppgaveId}>
                <div>
                    <Normaltekst>{tittel}</Normaltekst>
                    <Normaltekst>OppgaveID: {oppgave.oppgaveId}</Normaltekst>
                </div>
                <Knapp onClick={handleClick}>Vis</Knapp>
            </li>
        );
    });

    return <OppgaveListe>{oppgaver}</OppgaveListe>;
}

function TildelteOppgaver() {
    const ref = createRef<HTMLDivElement>();
    const [visOppgaver, setVisOppgaver] = useState(false);
    useClickOutside(ref, () => setVisOppgaver(false));
    const tildelteOppgaver = useTildelteOppgaver();

    const oppgaverPaaBruker = tildelteOppgaver.paaBruker;

    const antallOppgaver = oppgaverPaaBruker.length;
    return (
        <Wrapper ref={ref}>
            {antallOppgaver >= 2 && <AlertStripeInfo>Flere oppgaver på bruker</AlertStripeInfo>}
            <JustifyRight>
                {antallOppgaver > 0 && (
                    <LenkeKnapp onClick={() => setVisOppgaver(!visOppgaver)}>
                        <Normaltekst>
                            Du har {antallOppgaver} {antallOppgaver === 1 ? 'tildelt oppgave' : 'tildelte oppgaver'} på
                            bruker
                        </Normaltekst>
                    </LenkeKnapp>
                )}
            </JustifyRight>
            {visOppgaver && <OppgaverDropdown lukk={() => setVisOppgaver(false)} />}
        </Wrapper>
    );
}

export default TildelteOppgaver;
