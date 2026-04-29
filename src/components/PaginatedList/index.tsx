import { InlineMessage, Pagination, Skeleton, VStack } from '@navikt/ds-react';
import { chunk } from 'lodash';
import {
    type ComponentProps,
    type ComponentPropsWithRef,
    type JSX,
    type ReactNode,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import { usePiltasterIListe } from 'src/components/sakVelger/keyboardHooks';

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
    onSelectItem?: (item: T) => void;
    selectedItem?: T;
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
    onSelectItem,
    selectedItem,
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

    const listRef = useRef<HTMLDivElement>(null);
    usePiltasterIListe(listRef, [selectedItem, items], items, (item) => onSelectItem?.(item), selectedItem);

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
                    <div ref={listRef} tabIndex={!selectedItem && !!onSelectItem ? 0 : -1}>
                        <VStack as="ul" gap="space-4">
                            {renderItems?.map((item, i) => (
                                <RenderComp item={item} key={`${i}-${keyExtractor(item)}`} />
                            ))}
                        </VStack>
                    </div>
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
