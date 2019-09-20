import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import styled from 'styled-components';

interface Props {
    sporsmal: string;
    value: number;
    setValue: (newValue: number) => void;
    visFeilmelding: boolean;
}

const RadioWrapper = styled.div`
    display: flex;
    > *:not(:first-child) {
        margin-left: 1rem;
    }
`;

const StyledSpørsmål = styled(SkjemaGruppe)`
    padding: 1rem;
    > *:first-child {
        padding-bottom: 1rem;
    }
`;

function BrukerundersøkelseSpørsmål(props: Props) {
    return (
        <StyledSpørsmål feil={props.visFeilmelding ? { feilmelding: 'Du må svare på dette spørsmålet.' } : undefined}>
            <Undertittel>{props.sporsmal}</Undertittel>
            <RadioWrapper>
                {[...new Array(10)].map((_, index) => (
                    <Radio
                        onChange={() => props.setValue(index + 1)}
                        checked={props.value === index + 1}
                        label={index + 1}
                        name={props.sporsmal}
                    />
                ))}
            </RadioWrapper>
        </StyledSpørsmål>
    );
}

export default BrukerundersøkelseSpørsmål;
