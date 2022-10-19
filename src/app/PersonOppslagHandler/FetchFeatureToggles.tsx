import { useEffect } from 'react';
import { useGjeldendeBruker } from '../../redux/gjeldendeBruker/types';
import * as featuretoggles from '../../rest/resources/featuretogglesResource';
import { useQueryClient } from '@tanstack/react-query';

export function useFetchFeatureTogglesOnNewFnr() {
    const queryClient = useQueryClient();
    const fnr = useGjeldendeBruker();

    useEffect(() => {
        queryClient.invalidateQueries(featuretoggles.queryKey);
    }, [fnr, queryClient]);
}
