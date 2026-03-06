import { Pagination, Skeleton, VStack } from '@navikt/ds-react';
import { chunk } from 'lodash';
import {
    type ComponentProps,
    type ComponentPropsWithRef,
    type JSX,
    type ReactNode,
    useEffect,
    useMemo,
    useState
} from 'react';

type Props<T, KeyType> = Omit<ComponentPropsWithRef<typeof VStack>, 'as'> & {
    items: T[];
    pageSize?: number;
    renderItem: ({ item }: { item: T }) => JSX.Element;
    keyExtractor: (item: T) => KeyType;
    selectedKey?: KeyType;
    as?: ComponentPropsWithRef<typeof VStack>['as'];
    paginationSrHeading?: ComponentProps<typeof Pagination>['srHeading'];
    filterCard?: ReactNode;
    isLoading?: boolean;
};

export const PaginatedList = <T, KeyType extends string | number>({
    items,
    pageSize = 10,
    renderItem: RenderComp,
    keyExtractor,
    selectedKey,
    as,
    paginationSrHeading,
    filterCard,
    isLoading,
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
        <VStack as={as ?? 'div'} gap="1" justify="space-between" height="100%" overflow="auto" {...rest}>
            <VStack gap="1">
                {filterCard}
                {isLoading ? (
                    <VStack gap="2" marginInline="0 2">
                        {Array(8)
                            .keys()
                            .map((i) => (
                                <Skeleton key={i} variant="rectangle" height={68} />
                            ))}
                    </VStack>
                ) : (
                    <VStack as="ul" gap="1">
                        {renderItems?.map((item) => (
                            <RenderComp item={item} key={keyExtractor(item)} />
                        ))}
                    </VStack>
                )}
            </VStack>
            {pages.length > 1 && (
                <Pagination
                    className="mb-1"
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
