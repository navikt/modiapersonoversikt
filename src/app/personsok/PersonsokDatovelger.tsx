import * as React from 'react';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import styled from 'styled-components/macro';
import { useRef } from 'react';
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
                <DatolabelStyle className="skjemaelement__label" htmlFor="personsok-datovelger-fra">
                    <Normaltekst>Fødselsdato fra</Normaltekst>
                </DatolabelStyle>
                <Datovelger
                    input={{ id: 'personsok-datovelger-fra', name: 'Fødselsdato fra dato' }}
                    visÅrVelger={true}
                    id="personsok-datovelger-fra"
                    {...props.form.fodselsdatoFra?.input}
                />
            </DatovelgerStyle>
            <DatovelgerStyle ref={tilRef} top={dropdownTilCoordinate.top} left={dropdownTilCoordinate.left}>
                <DatolabelStyle className="skjemaelement__label" htmlFor="personsok-datovelger-til">
                    <Normaltekst>Fødselsdato til</Normaltekst>
                </DatolabelStyle>
                <Datovelger
                    input={{ id: 'personsok-datovelger-til', name: 'Fødselsdato til dato' }}
                    visÅrVelger={true}
                    id="personsok-datovelger-til"
                    {...props.form.fodselsdatoTil?.input}
                />
            </DatovelgerStyle>
        </>
    );
}

export default PersonsokDatovelger;
