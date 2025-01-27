import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import AlertStripe from 'nav-frontend-alertstriper';
import { type FetchError, post } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import type { Oppgave } from '../../models/meldinger/oppgave';
import { applyDefaults, type DefaultConfig, type RendererOrConfig, useRest } from '../useRest';
import { usePersonAtomValue } from 'src/lib/state/context';

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
        const fnr = usePersonAtomValue();

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
