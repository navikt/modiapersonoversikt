import * as React from 'react';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Select } from 'nav-frontend-skjema';
import { LenkeKnapp } from '../../components/common-styled-components';
import styled from 'styled-components';
import { usePrevious } from '../customHooks';

interface PagineringsData<T> {
    currentPage: T[];
    pageSelect: ReactNode;
    prevNextButtons: ReactNode;
}

const KnappStyling = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const getRange = (index: number, pageSize: number, list: any[]) => {
    return {
        fra: index * pageSize,
        til: Math.min((index + 1) * pageSize - 1, list.length - 1)
    };
};

const PrevNextButton = (props: {
    index: number;
    pageSize: number;
    list: any[];
    itemLabel: string;
    setCurrentPage: (newPage: number) => void;
    className?: string;
}) => {
    const range = getRange(props.index, props.pageSize, props.list);
    if (range.til < 0 || range.fra >= props.list.length) {
        return null;
    }
    return (
        <LenkeKnapp onClick={() => props.setCurrentPage(props.index)} className={props.className}>
            Vis {props.itemLabel} {range.fra + 1} til {range.til + 1}
        </LenkeKnapp>
    );
};

const HoyrejustertPrevNextButton = styled(PrevNextButton)`
    margin-left: auto;
`;

function usePaginering<T>(list: T[], pageSize: number, itemLabel: string, selectedItem?: T): PagineringsData<T> {
    const selectRef = useRef<HTMLSelectElement | null>();
    const [currentPage, setCurrentPage] = useState(0);

    const numberOfPages = Math.ceil(list.length / pageSize);

    useEffect(() => {
        // Dersom listen blir kortet inn og man står på en side som ikke har innhold lenger flyttes man til første side
        if (currentPage >= numberOfPages) {
            setCurrentPage(0);
        }
    }, [numberOfPages, currentPage]);

    const prevSelectedItem = usePrevious(selectedItem);
    useEffect(() => {
        // skifter til riktig side dersom selected-item settes programatisk, og viser riktig side ved mount
        if (selectedItem && prevSelectedItem !== selectedItem) {
            const index = list.findIndex(item => item === selectedItem);
            const newPage = Math.floor(index / pageSize);
            setCurrentPage(newPage);
        }
    }, [selectedItem, prevSelectedItem, setCurrentPage, pageSize, list]);

    const prevPage = usePrevious(currentPage);
    useEffect(() => {
        // Dersom man har byttet side med prevNextButton flyttes fokus til pageSelect for å komme til toppen av listen
        if (prevPage !== undefined && prevPage !== currentPage) {
            selectRef.current && selectRef.current.focus();
        }
    }, [currentPage, selectRef, prevPage]);

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
                value={currentPage}
                // @ts-ignore
                selectRef={ref => (selectRef.current = ref)}
                label="Velg paginering"
                onChange={e => setCurrentPage(parseInt(e.target.value))}
            >
                {options}
            </Select>
        );
    }, [list, pageSize, currentPage, numberOfPages, itemLabel]);

    const prevNextButtons = useMemo(() => {
        if (list.length <= pageSize) {
            return null;
        }
        return (
            <KnappStyling>
                <PrevNextButton
                    index={currentPage - 1}
                    pageSize={pageSize}
                    list={list}
                    itemLabel={itemLabel}
                    setCurrentPage={setCurrentPage}
                />
                <HoyrejustertPrevNextButton
                    index={currentPage + 1}
                    pageSize={pageSize}
                    list={list}
                    itemLabel={itemLabel}
                    setCurrentPage={setCurrentPage}
                />
            </KnappStyling>
        );
    }, [setCurrentPage, currentPage, itemLabel, pageSize, list]);

    const currentRange = useMemo(() => getRange(currentPage, pageSize, list), [list, pageSize, currentPage]);

    return useMemo(
        () => ({
            currentPage: list.slice(currentRange.fra, currentRange.til + 1),
            pageSelect: pageSelect,
            prevNextButtons: prevNextButtons
        }),
        [list, currentRange, pageSelect, prevNextButtons]
    );
}

export default usePaginering;
