import * as React from 'react';
import Datovelger, { Props as OriginalProps } from 'nav-datovelger/dist/datovelger/Datovelger';
import styled from 'styled-components/macro';
import { ChangeEvent, useRef } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { pxToRem } from '../../styles/personOversiktTheme';
import useBoundingRect from '../../utils/hooks/use-bounding-rect';
import { PersonSokFormState } from './personsokUtils';
import { FieldState, Mapped, Values } from '@nutgaard/use-formstate';

const DatovelgerStyle = styled.div<{ top: number; left: number }>`
    margin-right: 0.5em;
    margin-bottom: 1em;
    line-height: ${pxToRem(22)};

    .nav-datovelger__kalenderPortal {
        position: fixed;
        top: ${props => props.top}px;
        left: ${props => props.left}px;
        transform: translateX(-85%);
    }
`;

const DatolabelStyle = styled.label`
    margin-bottom: 0.5em;
`;

function beregnDropdownCoordinate(clientRect: ClientRect) {
    return {
        top: clientRect.top + clientRect.height,
        left: clientRect.left + clientRect.width
    };
}
type OriginalOnChange = OriginalProps['onChange'];
interface Props extends Pick<FieldState, 'input'> {
    visÅrVelger: boolean;
}

function transformProps(props: Props): OriginalProps {
    const onChange: OriginalOnChange = value => {
        const target = { name: props.input.name, value } as HTMLInputElement;
        const event = { target, currentTarget: target } as ChangeEvent<HTMLInputElement>;
        props.input.onChange(event);
    };
    return {
        id: props.input.id,
        input: { id: props.input.id, name: props.input.name },
        visÅrVelger: props.visÅrVelger,
        valgtDato: props.input.value,
        onChange
    };
}

function CustomDatovelger(props: Props) {
    const originalProps: OriginalProps = transformProps(props);
    return <Datovelger {...originalProps} />;
}

function PersonsokDatovelger(props: { form: Mapped<Values<PersonSokFormState>, FieldState> }) {
    const fraRef = useRef(React.createRef<HTMLDivElement>()).current;
    const tilRef = useRef(React.createRef<HTMLDivElement>()).current;
    const datovelgerFraRect = useBoundingRect(fraRef);
    const datovelgerTilRect = useBoundingRect(tilRef);
    const dropdownFraCoordinate = beregnDropdownCoordinate(datovelgerFraRect);
    const dropdownTilCoordinate = beregnDropdownCoordinate(datovelgerTilRect);

    return (
        <>
            <DatovelgerStyle ref={fraRef} top={dropdownFraCoordinate.top} left={dropdownFraCoordinate.left}>
                <DatolabelStyle className="skjemaelement__label" htmlFor="fodselsdatoFra">
                    <Normaltekst>Fødselsdato fra</Normaltekst>
                </DatolabelStyle>
                <CustomDatovelger visÅrVelger={true} input={props.form.fodselsdatoFra.input} />
            </DatovelgerStyle>
            <DatovelgerStyle ref={tilRef} top={dropdownTilCoordinate.top} left={dropdownTilCoordinate.left}>
                <DatolabelStyle className="skjemaelement__label" htmlFor="fodselsdatoTil">
                    <Normaltekst>Fødselsdato til</Normaltekst>
                </DatolabelStyle>
                <CustomDatovelger visÅrVelger={true} input={props.form.fodselsdatoTil.input} />
            </DatovelgerStyle>
        </>
    );
}

export default PersonsokDatovelger;
