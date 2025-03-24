import NavFrontendSpinner from 'nav-frontend-spinner';
import styled, { css } from 'styled-components';
import theme from '../styles/personOversiktTheme';
import DelayRender from './DelayRender';
import FillCenterAndFadeIn from './FillCenterAndFadeIn';

interface Props {
    delay?: number;
    type?: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
    padding?: string;
    className?: string;
}

const Styling = styled.span<{ padding?: string }>`
    overflow: hidden;
    display: flex;
    justify-content: center;
    ${theme.animation.fadeIn};
    ${(props) =>
        props.padding
            ? css`
                  padding: ${props.padding};
              `
            : ''};
`;

export function CenteredLazySpinner(props: Props) {
    return (
        <FillCenterAndFadeIn>
            <LazySpinner {...props} />
        </FillCenterAndFadeIn>
    );
}

function LazySpinner(props: Props) {
    const { delay, padding, className, type, ...rest } = props;
    return (
        <DelayRender delay={delay || 300}>
            <Styling padding={padding} className={className}>
                <NavFrontendSpinner type={type || 'L'} {...rest} />
            </Styling>
        </DelayRender>
    );
}

export default LazySpinner;
