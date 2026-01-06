import { Pagination, VStack } from '@navikt/ds-react';
import { chunk } from 'lodash';
import { type ComponentProps, type ComponentPropsWithRef, type JSX, useEffect, useMemo, useState } from 'react';

type Props<T, KeyType> = Omit<ComponentPropsWithRef<typeof VStack>, 'as'> & {
    items: T[];
    pageSize?: number;
    renderItem: ({ item }: { item: T }) => JSX.Element;
    keyExtractor: (item: T) => KeyType;
    selectedKey?: KeyType;
    as?: ComponentPropsWithRef<typeof VStack>['as'];
    paginationSrHeading?: ComponentProps<typeof Pagination>['srHeading'];
};

export const PaginatedList = <T, KeyType extends string | number>({
    items,
    pageSize = 10,
    renderItem: RenderComp,
    keyExtractor,
    selectedKey,
    as,
    paginationSrHeading,
    ...rest
}: Props<T, KeyType>) => {
    const [page, setPage] = useState(0);
    const pages = useMemo(() => chunk(items, pageSize), [items, pageSize]);
    const pageCount = useMemo(() => pages.length, [pages]);
    const renderItems = useMemo(() => pages[page > pageCount - 1 ? pageCount - 1 : page], [pages, page, pageCount]);

    useEffect(() => {
        if (selectedKey) {
            const pageWithItem = pages.findIndex((p) => p.map(keyExtractor).includes(selectedKey));
            if (pageWithItem >= 0) {
                setPage(pageWithItem);
                return;
            }
        }
        setPage(0);
    }, [selectedKey, pages, keyExtractor]);

    return (
        <VStack as={as ?? 'div'} gap="2" justify="space-between" flexGrow="1" minHeight="0" {...rest}>
            <VStack as="ul" gap="2" paddingInline="0 2" overflowY="auto">
                {renderItems?.map((item) => (
                    <RenderComp item={item} key={keyExtractor(item)} />
                ))}
            </VStack>
            {pages.length > 1 && (
                <Pagination
                    srHeading={paginationSrHeading}
                    size="xsmall"
                    page={page + 1}
                    siblingCount={0}
                    count={pageCount}
                    onPageChange={(page) => setPage(page - 1)}
                    prevNextTexts={false}
                />
            )}
        </VStack>
    );
};
