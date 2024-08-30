import setGjeldendeBrukerIRedux from '../../redux/gjeldendeBruker/actions';
import { useDispatch } from 'react-redux';
import { useFodselsnummer } from '../../utils/customHooks';
import { Query, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import featuretogglesResource from '../../rest/resources/featuretogglesResource';
import { replace } from 'connected-react-router';

interface Props {
    fnr: string;
    redirect?: string;
}

function SetFnrIRedux(props: Props) {
    const fnr = useFodselsnummer();
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    useEffect(() => {
        if (fnr !== props.fnr) {
            dispatch(setGjeldendeBrukerIRedux(props.fnr));
            props.redirect && dispatch(replace(props.redirect));
            queryClient.removeQueries({
                predicate(query: Query) {
                    // Alle queryKeys er typisk på formatet ['endepunkt', 'fnr']
                    // De med lenge større enn 1 bør derfor slettes siden disse sannsynligvis har brukerdata
                    return query.queryKey?.length > 1 || query.queryKey === featuretogglesResource.queryKey;
                }
            });
        }
    }, [dispatch, queryClient, fnr, props.fnr]);

    return null;
}

export default SetFnrIRedux;
