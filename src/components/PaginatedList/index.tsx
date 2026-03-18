import { InlineMessage, Pagination, Skeleton, VStack } from '@navikt/ds-react';
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
        <VStack as={as ?? 'div'} gap="space-4" justify="space-between" height="100%" overflow="auto" {...rest}>
            <VStack gap="space-4">
                {filterCard}
                {isLoading ? (
                    <VStack gap="space-8" marginInline="space-0 space-8">
                        {Array(8)
                            .keys()
                            .map((i) => (
                                <Skeleton key={i} variant="rectangle" height={68} />
                            ))}
                    </VStack>
                ) : items.length === 0 ? (
                    <InlineMessage status="info" role="alert">
                        Ingen resultat
                    </InlineMessage>
                ) : (
                    <VStack as="ul" gap="space-4">
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
