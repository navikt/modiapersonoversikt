import React from 'react';
import { Select as NavFrontendSelect } from 'nav-frontend-skjema';
import styled from 'styled-components';
import * as Domain from './domain';
import { FieldState } from '../../../../../utils/hooks/use-field-state';
import { localeString } from './domain';
import theme from '../../../../../styles/personOversiktTheme';

interface Props {
    tekst?: Domain.Tekst;
    valgt: FieldState;
}

const Select = styled(NavFrontendSelect)`
    .skjemaelement__label {
        ${theme.visuallyHidden}
    }
`;

function LocaleVelger(props: Props) {
    if (props.tekst === undefined) {
        return null;
    }
    const locales = Object.keys(props.tekst.innhold);

    if (locales.length < 2) {
        return null;
    }
    const options = locales.map(locale => (
        <option value={locale} key={locale}>
            {localeString[locale]}
        </option>
    ));

    return (
        <Select label={<span className="sr-only">Språk</span>} {...props.valgt.input}>
            {options}
        </Select>
    );
}

export default LocaleVelger;
