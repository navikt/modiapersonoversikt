import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Fragment } from 'react';

type DescriptionlistEntryType = string | number | null;

interface DescriptionListEntry {
    [name: string]: DescriptionlistEntryType;
}

export function getDescriptionlistEntry(term: string, description: DescriptionlistEntryType) {
    return (
        <Fragment key={term}>
            <Normaltekst tag="dt">{term}</Normaltekst>
            <Normaltekst tag="dd">{description}</Normaltekst>
        </Fragment>
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
