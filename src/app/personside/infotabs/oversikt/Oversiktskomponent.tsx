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

interface Props {
    children: ReactNode;
    tittel: string;
    infotabPath: INFOTABS;
    hurtigtast: string;
}

const PanelStyle = styled.div`
    ${theme.hvittPanel};
`;

const OverskriftStyle = styled.div`
    display: flex;
    justify-content: space-between;
    padding: ${theme.margin.px10};
`;

const MainStyle = styled.div`
    > * {
        border-top: ${theme.border.skille};
    }
`;

function Oversiktskomponent(props: Props) {
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const path = `${paths.personUri}/${valgtBrukersFnr}/${props.infotabPath.toLowerCase()}/`;

    return (
        <PanelStyle>
            <OverskriftStyle>
                <Undertittel tag="h3">
                    {props.tittel} (Alt + {props.hurtigtast})
                </Undertittel>
                <Link className="lenke" to={path}>
                    <Normaltekst>Gå til {props.tittel.toLowerCase()}</Normaltekst>
                </Link>
            </OverskriftStyle>
            <MainStyle>{props.children}</MainStyle>
        </PanelStyle>
    );
}

export default Oversiktskomponent;
