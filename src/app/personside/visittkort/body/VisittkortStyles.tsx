import * as React from 'react';
import styled from 'styled-components';
import { ReactNode } from 'react';
import TittelOgIkon from './IkonOgTittel';
import { theme } from '../../../../styles/personOversiktTheme';
import { Undertittel } from 'nav-frontend-typografi';

export const VisittkortBodyWrapper = styled.section`
    ${theme.hvittPanel};
    padding: ${theme.margin.px20};
    display: flex;
    margin-top: 0.2rem;
    &:focus {
        ${theme.focus}
    }
    > * {
        flex: 1 1 50%;
    }
`;

export const Kolonne = styled.div`
    display: flex;
    flex-flow: column nowrap;
    margin-left: ${theme.margin.px50};
    margin-right: ${theme.margin.px50};
    &:last-child {
        margin-right: ${theme.margin.px20};
    }
    > *:not(:last-child) {
        margin-bottom: ${theme.margin.px40};
    }
`;

export const FormFieldSet = styled.fieldset`
    margin: 0;
    padding: 0;
    border: 0;
`;

interface Props {
    children: ReactNode;
    tittel: string;
    ikon?: JSX.Element;
}

const Luft = styled.div`
    margin-bottom: 1rem;
`;

export function VisittkortGruppe(props: Props) {
    const tittel = <Undertittel tag="h3">{props.tittel}</Undertittel>;
    return (
        <section>
            <TittelOgIkon tittel={tittel} ikon={props.ikon} />
            <Luft />
            {props.children}
        </section>
    );
}
