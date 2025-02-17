import { Pagination, VStack } from '@navikt/ds-react';
import { chunk } from 'lodash';
import { type JSX, useMemo, useState } from 'react';

type Props<T> = {
    items: T[];
    pageSize?: number;
    renderItem: ({ item }: { item: T }) => JSX.Element;
    keyExtractor: (item: T) => string | number;
};

export const PaginatedList = <T,>({ items, pageSize = 10, renderItem: RenderComp, keyExtractor }: Props<T>) => {
    const [page, setPage] = useState(0);
    const pages = useMemo(() => chunk(items, pageSize), [items, pageSize]);
    const pageCount = useMemo(() => pages.length, [pages]);
    const renderItems = useMemo(() => pages[page > pageCount - 1 ? pageCount - 1 : page], [pages, page, pageCount]);
    return (
        <VStack gap="2" justify="space-between" flexGrow="1" minHeight="0">
            <VStack gap="2" marginBlock="4" paddingInline="0 2" overflowY="scroll">
                {renderItems.map((item) => (
                    <RenderComp item={item} key={keyExtractor(item)} />
                ))}
            </VStack>
            <Pagination
                size="small"
                page={page + 1}
                siblingCount={0}
                count={pageCount}
                onPageChange={(page) => setPage(page - 1)}
                prevNextTexts={false}
            />
        </VStack>
    );
};
