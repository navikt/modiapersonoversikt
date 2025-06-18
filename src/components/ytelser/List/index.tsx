import { VStack } from '@navikt/ds-react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useCallback } from 'react';
import { PaginatedList } from 'src/components/PaginatedList';
import { YtelseItem } from 'src/components/ytelser/List/YtelseItem';
import { getUnikYtelseKey, useFilterYtelser } from 'src/components/ytelser/utils';
import { YtelserListFilter } from './Filter';

export const YtelserList = () => (
    <VStack minHeight="0" gap="2">
        <YtelserListFilter />
        <YtelseList />
    </VStack>
);

const YtelseList = () => {
    const ytelser = useFilterYtelser();
    const navigate = useNavigate({ from: '/new/person/ytelser' });

    const handleClick = useCallback(
        (id: string) => {
            navigate({ search: { id } });
        },
        [navigate]
    );

    const selectedKey = useSearch({
        from: '/new/person/ytelser',
        select: (p) => p.id
    });

    return (
        <>
            <PaginatedList
                selectedKey={selectedKey}
                items={ytelser}
                keyExtractor={getUnikYtelseKey}
                renderItem={({ item }) => <YtelseItem ytelse={item} handleClick={handleClick} />}
            />
        </>
    );
};
