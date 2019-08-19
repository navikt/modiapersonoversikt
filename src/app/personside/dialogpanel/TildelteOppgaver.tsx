import * as React from 'react';
import { useRestResource } from '../../../utils/customHooks';
import { isFinishedPosting } from '../../../rest/utils/postResource';
import styled from 'styled-components';
import { Knapp } from 'nav-frontend-knapper';
import { hasData } from '../../../rest/utils/restResource';
import { useDispatch } from 'react-redux';
import { Undertittel } from 'nav-frontend-typografi';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { loggError } from '../../../utils/frontendLogger';
import { setDialogpanelTraad } from '../../../redux/oppgave/actions';
import theme from '../../../styles/personOversiktTheme';
import { settValgtTraad } from '../../../redux/meldinger/actions';
import { sisteSendteMelding } from '../infotabs/meldinger/utils/meldingerUtils';
import { meldingstypeTekst, temagruppeTekst } from '../infotabs/meldinger/utils/meldingstekster';

const OppgaveListe = styled.ul`
    li {
        display: flex;
        margin-top: 0.5rem;
        > * {
            flex-grow: 1;
        }
    }
    padding: ${theme.margin.layout};
`;

function TildelteOppgaver() {
    const oppgaveResource = useRestResource(resources => resources.oppgaver);
    const traaderResource = useRestResource(resources => resources.tråderOgMeldinger);
    const dispatch = useDispatch();

    if (!isFinishedPosting(oppgaveResource) || !hasData(traaderResource)) {
        return null;
    }

    if (oppgaveResource.response.length === 0) {
        return null;
    }

    return (
        <OppgaveListe>
            <Undertittel>Tildelte oppgaver:</Undertittel>
            {oppgaveResource.response.map(oppgave => {
                const traad = traaderResource.data.find(traad => traad.traadId === oppgave.henvendelseid);
                if (!traad) {
                    const error = new Error(`Kunne ikke finne tråd tilknyttet oppgave: ${oppgave.oppgaveid}`);
                    loggError(error);
                    return <AlertStripeFeil>{error.message}</AlertStripeFeil>;
                }
                const handleClick = () => {
                    dispatch(settValgtTraad(traad));
                    dispatch(setDialogpanelTraad(traad));
                };
                const nyesteMelding = sisteSendteMelding(traad);
                const tittel = `${meldingstypeTekst(nyesteMelding.meldingstype)} - ${temagruppeTekst(
                    nyesteMelding.temagruppe
                )}`;
                return (
                    <li>
                        <Knapp onClick={handleClick}>{tittel}</Knapp>
                    </li>
                );
            })}
        </OppgaveListe>
    );
}

export default TildelteOppgaver;
