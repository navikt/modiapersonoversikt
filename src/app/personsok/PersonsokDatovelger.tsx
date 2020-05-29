import * as React from 'react';
import Datovelger, { Props as OriginalProps } from 'nav-datovelger/dist/datovelger/Datovelger';
import styled from 'styled-components/macro';
import { ChangeEvent, useRef } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { pxToRem } from '../../styles/personOversiktTheme';
import useBoundingRect from '../../utils/hooks/use-bounding-rect';
import { PersonSokFormState } from './personsokUtils';
import { FieldState, Mapped, Values } from '@nutgaard/use-formstate';
import { SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { isValidDate } from '../../utils/dateUtils';
import moment from 'moment';

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
interface Props extends Omit<OriginalProps, 'onChange'> {
    onChange(event: ChangeEvent<HTMLInputElement>): void;
}

function transformProps(props: Props): OriginalProps {
    const onChange: OriginalOnChange = value => {
        const target = { name: props.input.name, value } as HTMLInputElement;
        const event = { target, currentTarget: target } as ChangeEvent<HTMLInputElement>;
        props.onChange(event);
    };
    return {
        ...props,
        onChange
    };
}

function CustomDatovelger(props: Props) {
    const originalProps: OriginalProps = transformProps(props);
    return <Datovelger {...originalProps} />;
}
function getDatoFeilmelding(fra: Date, til: Date) {
    if (fra > til) {
        return <SkjemaelementFeilmelding>Fra-dato kan ikke være senere enn til-dato</SkjemaelementFeilmelding>;
    }
    if (til > new Date()) {
        return <SkjemaelementFeilmelding>Du kan ikke velge dato frem i tid</SkjemaelementFeilmelding>;
    }
    if (!isValidDate(fra) || !isValidDate(til)) {
        return <SkjemaelementFeilmelding>Du må velge gyldige datoer</SkjemaelementFeilmelding>;
    }
    return null;
}

function PersonsokDatovelger(props: { form: Mapped<Values<PersonSokFormState>, FieldState> }) {
    const fraRef = useRef(React.createRef<HTMLDivElement>()).current;
    const tilRef = useRef(React.createRef<HTMLDivElement>()).current;
    const datovelgerFraRect = useBoundingRect(fraRef);
    const datovelgerTilRect = useBoundingRect(tilRef);
    const dropdownFraCoordinate = beregnDropdownCoordinate(datovelgerFraRect);
    const dropdownTilCoordinate = beregnDropdownCoordinate(datovelgerTilRect);
    const periodeFeilmelding = getDatoFeilmelding(
        moment(props.form.fodselsdatoFra.input.value).toDate(),
        moment(props.form.fodselsdatoTil.input.value).toDate()
    );

    return (
        <>
            <DatovelgerStyle ref={fraRef} top={dropdownFraCoordinate.top} left={dropdownFraCoordinate.left}>
                <DatolabelStyle className="skjemaelement__label" htmlFor="personsok-datovelger-fra">
                    <Normaltekst>Fødselsdato fra</Normaltekst>
                </DatolabelStyle>
                <CustomDatovelger
                    input={{ id: 'personsok-datovelger-fra', name: 'Fødselsdato fra dato' }}
                    visÅrVelger={true}
                    id="personsok-datovelger-fra"
                    {...props.form.fodselsdatoFra.input}
                />
            </DatovelgerStyle>
            <DatovelgerStyle ref={tilRef} top={dropdownTilCoordinate.top} left={dropdownTilCoordinate.left}>
                <DatolabelStyle className="skjemaelement__label" htmlFor="personsok-datovelger-til">
                    <Normaltekst>Fødselsdato til</Normaltekst>
                </DatolabelStyle>
                <CustomDatovelger
                    input={{ id: 'personsok-datovelger-til', name: 'Fødselsdato til dato' }}
                    visÅrVelger={true}
                    id="personsok-datovelger-til"
                    {...props.form.fodselsdatoTil.input}
                />
            </DatovelgerStyle>
            {periodeFeilmelding}
        </>
    );
}

export default PersonsokDatovelger;
