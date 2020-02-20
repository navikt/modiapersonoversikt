import React from 'react';
import styled from 'styled-components';

const RelativeWrapper = styled.div`
    position: relative;
`;
const AbsoluteWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`;

interface Props {
    children: React.ReactNode;
}

function ReflowBoundry(props: Props) {
    return (
        <RelativeWrapper>
            <AbsoluteWrapper>{props.children}</AbsoluteWrapper>
        </RelativeWrapper>
    );
}

export default ReflowBoundry;
