import { Skeleton } from '@navikt/ds-react';
import { useNavigate } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { Suspense, useCallback } from 'react';
import { PaginatedList } from 'src/components/PaginatedList';
import { $api } from 'src/lib/clients/modiapersonoversikt-api';
import { aktivEnhetAtom, usePersonAtomValue } from 'src/lib/state/context';
import { TraadItem } from './TraadItem';

export const TraadList = () => (
    <Suspense fallback={Array(8).map((i) => <Skeleton key={i} variant="rounded" height={62} />)}>
        <Traader />
    </Suspense>
);

const Traader = () => {
    const fnr = usePersonAtomValue();
    const enhet = useAtomValue(aktivEnhetAtom) as string;

    const { data: traader } = $api.useSuspenseQuery('post', '/rest/v2/dialog/meldinger', {
        body: { fnr },
        params: { query: { enhet } }
    });

    const navigate = useNavigate({ from: '/person/meldinger' });

    const handleClick = useCallback(
        (traadId: string) => {
            navigate({ search: { traadId } });
        },
        [navigate]
    );

    return (
        <PaginatedList
            items={traader}
            keyExtractor={(item) => item.traadId}
            renderItem={({ item }) => <TraadItem traad={item} handleClick={handleClick} />}
        />
    );
};
