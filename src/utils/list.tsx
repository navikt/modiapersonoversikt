import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import EtikettGrå from '../components/EtikettGrå';

type DescriptionlistEntryType = string | number | null;

interface DescriptionListEntry {
    [name: string]: DescriptionlistEntryType;
}

export function getDescriptionlistEntry(term: string, description: DescriptionlistEntryType) {
    return (
        <div key={term}>
            <EtikettGrå tag="dt">{term}</EtikettGrå>
            <Normaltekst tag="dd">{description}</Normaltekst>
        </div>
    );
}

export function createDescriptionList(valuePairs: DescriptionListEntry) {
    const entries = Object.keys(valuePairs).map(key =>
        getDescriptionlistEntry(key, valuePairs[key])
    );
    return (
        <dl>
            {entries}
        </dl>
    );
}
