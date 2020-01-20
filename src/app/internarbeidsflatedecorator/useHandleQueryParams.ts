import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useQueryParams } from '../../utils/urlUtils';
import { useRestResource } from '../../rest/consumer/useRestResource';
import { useInfotabsDyplenker } from '../personside/infotabs/dyplenker';
import { setValgtTraadDialogpanel } from '../../redux/oppgave/actions';
import { setNyBrukerIPath } from '../routes/routing';
import { useOnMount } from '../../utils/customHooks';
import { loggEvent } from '../../utils/frontendLogger';

enum StatesEnum {
    SlaaOppFnr,
    GosysOppgaveOppslag,
    GosysOppgaveOppslagDel2,
    None
}
interface LagOppgaveParams {
    oppgaveId: string;
    behandlingsId: string;
    fnr: string;
}
interface SlaaOpp {
    state: StatesEnum.SlaaOppFnr;
    fnr: string;
}

interface SlaaOppGosysOppgave extends LagOppgaveParams {
    state: StatesEnum.GosysOppgaveOppslag;
}

interface SlaaOppGosysOppgave2 extends LagOppgaveParams {
    state: StatesEnum.GosysOppgaveOppslagDel2;
}

interface None {
    state: StatesEnum.None;
}

type States = SlaaOpp | SlaaOppGosysOppgave | SlaaOppGosysOppgave2 | None | undefined;

function useHandleQueryParams() {
    const [state, setState] = useState<States>();
    const history = useHistory();
    const dispatch = useDispatch();
    const queryParams = useQueryParams<{ sokFnr?: string; oppgaveid?: string; behandlingsid?: string }>();
    const sokFnr = queryParams.behandlingsid ? undefined : queryParams.sokFnr === '0' ? '' : queryParams.sokFnr;
    const traaderResources = useRestResource(resources => resources.tråderOgMeldinger);
    const dyplenker = useInfotabsDyplenker();

    useOnMount(() => {
        if (queryParams.behandlingsid && queryParams.sokFnr && queryParams.oppgaveid) {
            setState({
                state: StatesEnum.GosysOppgaveOppslag,
                behandlingsId: queryParams.behandlingsid,
                fnr: queryParams.sokFnr,
                oppgaveId: queryParams.oppgaveid
            });
        } else if (queryParams.sokFnr) {
            setState({ state: StatesEnum.SlaaOppFnr, fnr: queryParams.sokFnr });
            loggEvent('Oppslag', 'Puzzle');
        } else {
            setState({ state: StatesEnum.None });
        }
    });

    useEffect(() => {
        if (!state) {
            return;
        }
        if (state.state === StatesEnum.GosysOppgaveOppslag) {
            setNyBrukerIPath(history, state.fnr);
            setState({
                state: StatesEnum.GosysOppgaveOppslagDel2,
                fnr: state.fnr,
                behandlingsId: state.behandlingsId,
                oppgaveId: state.oppgaveId
            });
            console.log(queryParams);
        } else if (state.state === StatesEnum.SlaaOppFnr) {
            setNyBrukerIPath(history, state.fnr);
            console.log('Slår opp fnr');
            setState({ state: StatesEnum.None });
        }
        if (state.state === StatesEnum.GosysOppgaveOppslagDel2) {
            const traadTilknyttetOppgave = traaderResources.data?.find(traad => traad.traadId === state.behandlingsId);
            if (traadTilknyttetOppgave) {
                dispatch(setValgtTraadDialogpanel(traadTilknyttetOppgave));
                history.push(dyplenker.meldinger.link(traadTilknyttetOppgave));
                console.log('fant tråd tilknyttet oppgave');
                setState({ state: StatesEnum.None });
            }
        }
    }, [traaderResources, dyplenker, queryParams, history, dispatch, state]);
    return { queryParams, sokFnr };
}

export default useHandleQueryParams;
