import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import theme from '../../../../styles/personOversiktTheme';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/reducers';
import { paths } from '../../../routes/routing';
import { INFOTABS } from '../InfoTabEnum';
import ErrorBoundary from '../../../../components/ErrorBoundary';

interface Props {
    children: ReactNode;
    tittel: string;
    infotabPath: INFOTABS;
    hurtigtast: string;
}

const PanelStyle = styled.section`
    ${theme.hvittPanel};
`;

const OverskriftStyle = styled.div`
    display: flex;
    background-color: ${theme.color.bakgrunn};
    box-shadow: 0 0 0.1rem gray;
    border-top-left-radius: ${theme.borderRadius.layout};
    border-top-right-radius: ${theme.borderRadius.layout};
    justify-content: space-between;
    padding: ${theme.margin.px10};
`;

const MainStyle = styled.div`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

const StyledLink = styled(Link)`
    text-align: right;
`;

function Oversiktskomponent(props: Props) {
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const path = `${paths.personUri}/${valgtBrukersFnr}/${props.infotabPath.toLowerCase()}/`;

    return (
        <ErrorBoundary boundaryName={props.tittel}>
            <PanelStyle>
                <OverskriftStyle title={'Alt + ' + props.hurtigtast}>
                    <Undertittel tag="h3">{props.tittel}</Undertittel>
                    <StyledLink className="lenke" to={path}>
                        <Normaltekst>Gå til {props.tittel.toLowerCase()}</Normaltekst>
                    </StyledLink>
                </OverskriftStyle>
                <MainStyle>{props.children}</MainStyle>
            </PanelStyle>
        </ErrorBoundary>
    );
}

export default Oversiktskomponent;
