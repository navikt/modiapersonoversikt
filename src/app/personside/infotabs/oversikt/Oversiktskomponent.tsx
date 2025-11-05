import { Link, Navigate } from '@tanstack/react-router';
import { guid } from 'nav-frontend-js-utils';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { type ReactNode, useRef, useState } from 'react';
import { getOpenTabFromRouterPath } from 'src/app/personside/infotabs/utils/useOpenTab';
import { trackingEvents } from 'src/utils/analytics';
import styled from 'styled-components';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import theme, { pxToRem } from '../../../../styles/personOversiktTheme';
import { paths } from '../../../routes/routing';
import type { InfotabConfig } from '../InfoTabEnum';

interface Props {
    component: React.ComponentType<{ setHeaderContent: (content: ReactNode) => void }>;
    tittel: string;
    infotabPath: InfotabConfig;
    hurtigtast: string;
}

const StyledPanel = styled(Panel)`
    padding: 0rem 0rem 0.3rem 0rem;
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
    const path = `/${paths.personUri}/${props.infotabPath.path}`;
    const [customContent, setCustomContent] = useState<ReactNode>(null);
    const [redirect, setRedirect] = useState(false);
    const headerId = useRef(guid());

    if (redirect) {
        return (
            <Navigate
                to={path}
                state={{
                    umamiEvent: {
                        name: 'linke klikket fra oversikt',
                        data: { fane: getOpenTabFromRouterPath(path).path }
                    }
                }}
                replace
            />
        );
    }

    const handleClick = () => {
        setRedirect(true);
    };

    const Component = props.component;

    return (
        <ErrorBoundary boundaryName={`Oversikt ${props.tittel}`}>
            <article>
                <StyledPanel aria-labelledby={headerId.current}>
                    <OverskriftStyle title={`Alt + ${props.hurtigtast}`} onClick={handleClick}>
                        <Undertittel tag="h3" id={headerId.current}>
                            {props.tittel}
                        </Undertittel>
                        <CustomContent>{customContent}</CustomContent>
                        <StyledLink
                            onClick={(e) => e.stopPropagation()}
                            className="lenke"
                            to={path}
                            state={{
                                umamiEvent: {
                                    name: trackingEvents.detaljvisningKlikket,
                                    data: {
                                        fane: 'oversikt',
                                        tekst: `lenke til ${getOpenTabFromRouterPath(path).path}`
                                    }
                                }
                            }}
                        >
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
