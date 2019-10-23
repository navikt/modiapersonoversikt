import * as React from 'react';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Select } from 'nav-frontend-skjema';

interface PagineringsData<T> {
    currentPage: T[];
    pageSelect: ReactNode;
}

const getRange = (index: number, pageSize: number, list: any[]) => {
    return {
        fra: index * pageSize,
        til: Math.min((index + 1) * pageSize - 1, list.length - 1)
    };
};

function usePaginering<T>(list: T[], pageSize: number, itemLabel: string): PagineringsData<T> {
    const [currentPage, setCurrentPage] = useState(0);

    const numberOfPages = Math.ceil(list.length / pageSize);

    useEffect(() => {
        if (currentPage >= numberOfPages) {
            setCurrentPage(0);
        }
    }, [numberOfPages, currentPage]);

    const pageSelect = useMemo(() => {
        const options = new Array(numberOfPages).fill(0).map((_, index) => {
            const optionRange = getRange(index, pageSize, list);
            const selected = index === currentPage;
            return (
                <option key={index} value={index}>
                    {selected ? 'Viser' : 'Vis'} {itemLabel} {optionRange.fra + 1} til {optionRange.til + 1}
                </option>
            );
        });
        return list.length <= pageSize ? null : (
            <Select
                label="Velg paginering"
                selected={currentPage}
                onChange={e => setCurrentPage(parseInt(e.target.value))}
            >
                {options}
            </Select>
        );
    }, [list, pageSize, currentPage, numberOfPages, itemLabel]);

    const currentRange = useMemo(() => getRange(currentPage, pageSize, list), [list, pageSize, currentPage]);

    return useMemo(
        () => ({
            currentPage: list.slice(currentRange.fra, currentRange.til + 1),
            pageSelect: pageSelect
        }),
        [list, currentRange, pageSelect]
    );
}

export default usePaginering;
