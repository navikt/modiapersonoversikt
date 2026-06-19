import { Element } from 'nav-frontend-typografi';
import { memo } from 'react';
import type { Sakstema } from 'src/generated/modiapersonoversikt-api';
import styled from 'styled-components';

const CheckboksElement = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    .checkbox {
        label {
            font-weight: bold;
        }
    }
`;

interface CheckboksProps {
    sakstema: Sakstema;
}

function SakstemaListeElementCheckboks(props: CheckboksProps) {
    return (
        <CheckboksElement>
            <Element>{props.sakstema.temanavn}</Element>
        </CheckboksElement>
    );
}

export default memo(SakstemaListeElementCheckboks);
