import * as React from 'react';
import { useClickOutside, useRestResource } from '../../../utils/customHooks';
import { isFinishedPosting } from '../../../rest/utils/postResource';
import styled from 'styled-components';
import { Knapp } from 'nav-frontend-knapper';
import { useDispatch } from 'react-redux';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { loggError } from '../../../utils/frontendLogger';
import { setDialogpanelTraad } from '../../../redux/oppgave/actions';
import theme from '../../../styles/personOversiktTheme';
import { settValgtTraad } from '../../../redux/meldinger/actions';
import { sisteSendteMelding } from '../infotabs/meldinger/utils/meldingerUtils';
import { meldingstypeTekst, temagruppeTekst } from '../infotabs/meldinger/utils/meldingstekster';
import { hasData } from '../../../rest/utils/restResource';
import LazySpinner from '../../../components/LazySpinner';
import { Normaltekst } from 'nav-frontend-typografi';
import { LenkeKnapp } from '../../../components/common-styled-components';
import { createRef, useState } from 'react';

const Wrapper = styled.div`
    position: relative;
`;

const InlineNormaltekst = styled(Normaltekst)`
    display: flex;
    justify-content: flex-end;
`;

const OppgaveListe = styled.ul`
    text-align: left;
    position: absolute;
    right: 0;
    z-index: 1000;
    filter: drop-shadow(0 1rem 2rem rgba(0, 0, 0, 0.7));
    li {
        display: flex;
        padding: 0.5rem 1rem;
        align-items: flex-start;
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

function TildelteOppgaver() {
    const ref = createRef<HTMLDivElement>();
    const [visOppgaver, setVisOppgaver] = useState(false);
    const oppgaveResource = useRestResource(resources => resources.oppgaver);
    const traaderResource = useRestResource(resources => resources.tråderOgMeldinger);
    const dispatch = useDispatch();
    useClickOutside(ref, () => setVisOppgaver(false));

    if (!isFinishedPosting(oppgaveResource)) {
        return null;
    }

    if (oppgaveResource.response.length === 0) {
        return null;
    }

    const tildelteOppgaver = !hasData(traaderResource) ? (
        <LazySpinner />
    ) : (
        oppgaveResource.response.map(oppgave => {
            const traad = traaderResource.data.find(traad => traad.traadId === oppgave.henvendelseid);
            if (!traad) {
                const error = new Error(`Kunne ikke finne tråd tilknyttet oppgave: ${oppgave.oppgaveid}`);
                loggError(error);
                return <AlertStripeFeil>{error.message}</AlertStripeFeil>;
            }
            const handleClick = () => {
                dispatch(settValgtTraad(traad));
                dispatch(setDialogpanelTraad(traad));
                setVisOppgaver(false);
            };
            const nyesteMelding = sisteSendteMelding(traad);
            const tittel = `${meldingstypeTekst(nyesteMelding.meldingstype)} - ${temagruppeTekst(
                nyesteMelding.temagruppe
            )}`;
            return (
                <li key={oppgave.oppgaveid}>
                    <div>
                        <Normaltekst>{tittel}</Normaltekst>
                        <Normaltekst>OppgaveID: {oppgave.oppgaveid}</Normaltekst>
                    </div>
                    <Knapp onClick={handleClick}>Vis</Knapp>
                </li>
            );
        })
    );

    return (
        <Wrapper ref={ref}>
            <InlineNormaltekst>
                <LenkeKnapp onClick={() => setVisOppgaver(!visOppgaver)}>
                    Du har {oppgaveResource.response.length} tildelte oppgaver{' '}
                </LenkeKnapp>
            </InlineNormaltekst>
            {visOppgaver && <OppgaveListe>{tildelteOppgaver}</OppgaveListe>}
        </Wrapper>
    );
}

export default TildelteOppgaver;
