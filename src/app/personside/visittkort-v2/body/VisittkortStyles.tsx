import { Undertittel } from 'nav-frontend-typografi';
import type { JSX, ReactNode } from 'react';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import TittelOgIkon from './IkonOgTittel';

export const VisittkortBodyWrapper = styled.section`
    background-color: white;
    padding: ${theme.margin.layout};
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
