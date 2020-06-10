import * as React from 'react';
import { ReactNode, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import theme, { pxToRem } from '../../../../styles/personOversiktTheme';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/reducers';
import { paths } from '../../../routes/routing';
import { INFOTABS } from '../InfoTabEnum';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import { guid } from 'nav-frontend-js-utils';
import Panel from 'nav-frontend-paneler';

interface Props {
    component: React.ComponentType<{ setHeaderContent: (content: ReactNode) => void }>;
    tittel: string;
    infotabPath: INFOTABS;
    hurtigtast: string;
}

const StyledPanel = styled(Panel)`
    padding-bottom: 0.3rem;
`;

const OverskriftStyle = styled.div`
    display: flex;
    background-color: white;
    border-top-left-radius: ${theme.borderRadius.layout};
    border-top-right-radius: ${theme.borderRadius.layout};
    justify-content: space-between;
    padding: ${theme.margin.px10};
    cursor: pointer;
    border-bottom: ${theme.color.navGra40} ${pxToRem(2)} solid;
    &:hover {
        ${theme.hover};
    }
`;

const MainStyle = styled.div`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

const StyledLink = styled(Link)`
    text-align: right;
`;

const CustomContent = styled.div`
    flex-grow: 1;
    display: inline-flex;
    align-items: flex-end;
    padding: 0 1rem;
`;

function Oversiktskomponent(props: Props) {
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const path = `${paths.personUri}/${valgtBrukersFnr}/${props.infotabPath.toLowerCase()}/`;
    const [customContent, setCustomContent] = useState<ReactNode>(null);
    const [redirect, setRedirect] = useState(false);
    const headerId = useRef(guid());

    if (redirect) {
        return <Redirect to={path} />;
    }

    const handleClick = () => {
        setRedirect(true);
    };

    const Component = props.component;

    return (
        <ErrorBoundary boundaryName={'Oversikt ' + props.tittel}>
            <article>
                <StyledPanel aria-labelledby={headerId.current}>
                    <OverskriftStyle title={'Alt + ' + props.hurtigtast} onClick={handleClick}>
                        <Undertittel tag="h3" id={headerId.current}>
                            {props.tittel}
                        </Undertittel>
                        <CustomContent>{customContent}</CustomContent>
                        <StyledLink className="lenke" to={path}>
                            <Normaltekst>Gå til {props.tittel.toLowerCase()}</Normaltekst>
                        </StyledLink>
                    </OverskriftStyle>
                    <MainStyle>
                        <Component setHeaderContent={setCustomContent} />
                    </MainStyle>
                </StyledPanel>
            </article>
        </ErrorBoundary>
    );
}

export default React.memo(Oversiktskomponent);
