import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import AlertStripe from 'nav-frontend-alertstriper';
import { type FetchError, post } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import type { Oppgave } from '../../models/meldinger/oppgave';
import { useFodselsnummer } from '../../utils/customHooks';
import { type DefaultConfig, type RendererOrConfig, applyDefaults, useRest } from '../useRest';

function queryKey(fnr: string): [string, string] {
    return ['tildelteoppgaver', fnr];
}

function urlUtenFnrIPath(): string {
    return `${apiBaseUri}/v2/oppgaver/tildelt`;
}

const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn oppgaver</AlertStripe>
};

const resource = {
    useFetch(): UseQueryResult<Oppgave[], FetchError> {
        const fnr = useFodselsnummer();

        return useQuery({
            queryKey: queryKey(fnr),
            queryFn: () => post(urlUtenFnrIPath(), { fnr })
        });
    },
    useRenderer(renderer: RendererOrConfig<Oppgave[]>) {
        const response = this.useFetch();
        return useRest(response, applyDefaults(defaults, renderer));
    }
};
export default resource;
