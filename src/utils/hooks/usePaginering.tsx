import * as React from 'react';
import { ReactNode, useEffect, useState } from 'react';
import { Select } from 'nav-frontend-skjema';

interface Returns<T> {
    currentPage: T[];
    pageSelect: ReactNode;
}

function usePaginering<T>(list: T[], pageSize: number): Returns<T> {
    const [currentPage, setCurrentPage] = useState(0);

    const numberOfPages = Math.ceil(list.length / pageSize);

    useEffect(() => {
        if (currentPage >= numberOfPages) {
            setCurrentPage(0);
        }
    }, [list, numberOfPages, currentPage]);

    if (list.length <= pageSize) {
        return {
            currentPage: list,
            pageSelect: null
        };
    }

    const getRange = (index: number) => {
        return {
            fra: index * pageSize,
            til: (index + 1) * pageSize < list.length ? (index + 1) * pageSize - 1 : list.length - 1
        };
    };

    const options = [...new Array(numberOfPages)].map((_, index) => {
        const optionRange = getRange(index);
        const selected = index === currentPage;
        return (
            <option key={index} value={index}>
                {selected ? 'Viser' : 'Vis'} {optionRange.fra + 1} til {optionRange.til + 1}
            </option>
        );
    });

    const pageSelect = (
        <Select label="Velg paginering" selected={currentPage} onChange={e => setCurrentPage(parseInt(e.target.value))}>
            {options}
        </Select>
    );

    const currentRange = getRange(currentPage);
    return {
        currentPage: list.slice(currentRange.fra, currentRange.til + 1),
        pageSelect: pageSelect
    };
}

export default usePaginering;
