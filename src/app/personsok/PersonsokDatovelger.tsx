import * as React from 'react';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import styled from 'styled-components';
import { useRef, useState } from 'react';
import { DatovelgerAvgrensninger } from 'nav-datovelger';
import { PersonsokSkjemaProps } from './PersonsokSkjema';
import { Normaltekst } from 'nav-frontend-typografi';
import { pxToRem } from '../../styles/personOversiktTheme';
import useBoundingRect from '../../utils/hooks/use-bounding-rect';

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

function PersonsokDatovelger(props: { form: PersonsokSkjemaProps }) {
    const fraRef = useRef(React.createRef<HTMLDivElement>()).current;
    const tilRef = useRef(React.createRef<HTMLDivElement>()).current;
    const datovelgerFraRect = useBoundingRect(fraRef);
    const datovelgerTilRect = useBoundingRect(tilRef);
    const dropdownFraCoordinate = beregnDropdownCoordinate(datovelgerFraRect);
    const dropdownTilCoordinate = beregnDropdownCoordinate(datovelgerTilRect);

    const [tilAvgrensing, settTilAvgrensing] = useState<DatovelgerAvgrensninger | undefined>(undefined);
    const datoChanger = (dato?: string) => {
        props.form.actions.settFodselsdatoFra(dato);
        settTilAvgrensing({ minDato: dato });
    };

    return (
        <>
            <DatovelgerStyle ref={fraRef} top={dropdownFraCoordinate.top} left={dropdownFraCoordinate.left}>
                <DatolabelStyle className="skjemaelement__label" htmlFor="personsok-datovelger-fra">
                    <Normaltekst>Fødselsdato fra</Normaltekst>
                </DatolabelStyle>
                <Datovelger
                    input={{ id: 'personsok-datovelger-fra', name: 'Fødselsdato fra dato' }}
                    visÅrVelger={true}
                    valgtDato={props.form.state.fodselsdatoFra}
                    onChange={datoChanger}
                    id="personsok-datovelger-fra"
                />
            </DatovelgerStyle>
            <DatovelgerStyle ref={tilRef} top={dropdownTilCoordinate.top} left={dropdownTilCoordinate.left}>
                <DatolabelStyle className="skjemaelement__label" htmlFor="personsok-datovelger-til">
                    <Normaltekst>Fødselsdato til</Normaltekst>
                </DatolabelStyle>
                <Datovelger
                    input={{ id: 'personsok-datovelger-til', name: 'Fødselsdato til dato' }}
                    visÅrVelger={true}
                    valgtDato={props.form.state.fodselsdatoTil}
                    onChange={dato => props.form.actions.settFodselsdatoTil(dato)}
                    id="personsok-datovelger-til"
                    avgrensninger={tilAvgrensing}
                />
            </DatovelgerStyle>
        </>
    );
}

export default PersonsokDatovelger;
