import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import theme, { pxToRem } from '../../../../../styles/personOversiktTheme';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';

interface Props {
    entries: DescriptionListEntries;
}

type DescriptionlistEntry = string | number | null | ReactNode;

export interface DescriptionListEntries {
    [name: string]: DescriptionlistEntry;
}

function getDescriptionlistEntry(term: string, description: DescriptionlistEntry) {
    if (typeof description === 'boolean') {
        console.log('Vet ikke hvordan boolsk verdi skal vises for: ', term);
    }
    return (
        <div key={term}>
            <EtikettLiten tag="dt">{term || ''}</EtikettLiten>
            <Normaltekst tag="dd">{description || '\u2014'}</Normaltekst>
        </div>
    );
}

function createDescriptionListEntries(valuePairs: DescriptionListEntries) {
    return Object.keys(valuePairs).map(key => getDescriptionlistEntry(key, valuePairs[key]));
}

const ListStyling = styled.dl`
    display: flex;
    flex-wrap: wrap;
    dt {
        color: ${theme.color.gråSkrift};
    }
    dd {
        font-weight: bold;
        margin-top: 0.3rem;
    }
    > div {
        margin: ${pxToRem(15)} 0;
        padding-right: 1rem;
        min-width: 13rem;
    }
`;

function DescriptionList(props: Props) {
    return <ListStyling>{createDescriptionListEntries(props.entries)}</ListStyling>;
}

export default DescriptionList;
