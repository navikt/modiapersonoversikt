import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components/macro';
import theme, { pxToRem } from '../styles/personOversiktTheme';
import { Element, Normaltekst } from 'nav-frontend-typografi';

const ListStyling = styled.dl`
    display: flex;
    flex-wrap: wrap;
    dt {
        color: ${theme.color.gråSkrift};
    }
    > div {
        margin: ${pxToRem(9)} 0;
        padding-right: 0.7rem;
        width: 13rem;
        overflow-wrap: break-word;
    }
`;

interface Props {
    entries: DescriptionListEntries;
}

type DescriptionlistEntry = string | number | null | ReactNode;

export interface DescriptionListEntries {
    [name: string]: DescriptionlistEntry;
}

export function fjernEntriesUtenVerdi(entries: DescriptionListEntries): DescriptionListEntries {
    const keys = Object.keys(entries);
    return keys.reduce((acc, key) => {
        if (!entries[key]) {
            return acc;
        }
        return {
            ...acc,
            [key]: entries[key]
        };
    }, {});
}

function getDescriptionlistEntry(term: string, description: DescriptionlistEntry) {
    if (typeof description === 'boolean') {
        console.log('Vet ikke hvordan boolsk verdi skal vises for: ', term);
    }
    return (
        <div key={term}>
            <Normaltekst tag="dt">{term || ''}</Normaltekst>
            <Element tag="dd">{description || (description === 0 && '0') || '\u2014'}</Element>
        </div>
    );
}

function createDescriptionListEntries(valuePairs: DescriptionListEntries) {
    return Object.keys(valuePairs).map(key => getDescriptionlistEntry(key, valuePairs[key]));
}

function DescriptionList(props: Props) {
    return <ListStyling>{createDescriptionListEntries(props.entries)}</ListStyling>;
}

export default DescriptionList;
