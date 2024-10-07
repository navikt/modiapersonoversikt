import setGjeldendeBrukerIRedux from '../../redux/gjeldendeBruker/actions';
import { useDispatch } from 'react-redux';
import { Query, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import featuretogglesResource from '../../rest/resources/featuretogglesResource';
import { replace } from 'connected-react-router';
import { useQueryParams } from '../../utils/url-utils';

interface Props {
    fnr: string;
    redirect?: string;
}

function SetFnrIRedux(props: Props) {
    const queryClient = useQueryClient();
    const queryParams = useQueryParams<Record<string, string>>();
    const dispatch = useDispatch();
    useEffect(() => {
        if (queryParams.henvendelseid) {
            queryParams.behandlingsid = queryParams.henvendelseid;
        }
        const newQueryParams = new URLSearchParams(queryParams).toString();
        dispatch(setGjeldendeBrukerIRedux(props.fnr));
        const redirectUri = `${props.redirect}?${newQueryParams}`;
        props.redirect && dispatch(replace(redirectUri));
        queryClient.removeQueries({
            predicate(query: Query) {
                // Alle queryKeys er typisk på formatet ['endepunkt', 'fnr']
                // De med lenge større enn 1 bør derfor slettes siden disse sannsynligvis har brukerdata
                return query.queryKey?.length > 1 || query.queryKey === featuretogglesResource.queryKey;
            }
        });
    }, [dispatch, queryClient, props.fnr]);

    return null;
}

export default SetFnrIRedux;
