import { type Query, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { aktivBrukerAtom } from 'src/lib/state/context';
import featuretogglesResource from '../../rest/resources/featuretogglesResource';
import { useQueryParams } from '../../utils/url-utils';

interface Props {
    fnr: string;
    redirect?: string;
}

function SetFnrIRedux(props: Props) {
    const queryClient = useQueryClient();
    const queryParams = useQueryParams<Record<string, string>>();
    const navigate = useNavigate();
    const setAktivBruker = useSetAtom(aktivBrukerAtom);

    useEffect(() => {
        if (queryParams.henvendelseid) {
            queryParams.behandlingsid = queryParams.henvendelseid;
        }
        const newQueryParams = new URLSearchParams(queryParams).toString();
        setAktivBruker(props.fnr);
        const redirectUri = `${props.redirect}?${newQueryParams}`;
        queryClient.removeQueries({
            predicate(query: Query) {
                // Alle queryKeys er typisk på formatet ['endepunkt', 'fnr']
                // De med lenge større enn 1 bør derfor slettes siden disse sannsynligvis har brukerdata
                return query.queryKey?.length > 1 || query.queryKey === featuretogglesResource.queryKey;
            }
        });
        if (props.redirect) navigate({ to: redirectUri, replace: true });
    }, [setAktivBruker, queryClient, props.fnr]);

    return null;
}

export default SetFnrIRedux;
