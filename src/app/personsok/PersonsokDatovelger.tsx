import * as React from 'react';
import { DatepickerProps as OriginalProps } from 'nav-datovelger/lib/Datepicker';
import { Datepicker, DatepickerLimitations, isISODateString } from 'nav-datovelger';
import styled from 'styled-components/macro';
import { ChangeEvent, useRef } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { pxToRem } from '../../styles/personOversiktTheme';
import useBoundingRect from '../../utils/hooks/use-bounding-rect';
import { PersonSokFormState } from './personsok-utils';
import { FieldState, Mapped, Values } from '@nutgaard/use-formstate';
import { SkjemaelementFeilmelding } from 'nav-frontend-skjema';
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

const Style = styled.div`
    display: flex;
    flex-direction: column;
`;
const Flex = styled.div`
    display: flex;
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
    avgrensninger?: DatepickerLimitations;
}

function transformProps(props: Props): OriginalProps {
    const onChange: OriginalOnChange = value => {
        const target = { name: props.input.name, value } as HTMLInputElement;
        const event = { target, currentTarget: target } as ChangeEvent<HTMLInputElement>;
        props.input.onChange(event);
    };
    return {
        inputId: props.input.id,
        inputProps: {
            name: props.input.name,
            'aria-invalid': props.input.value !== '' && isISODateString(props.input.value) === false
        },
        showYearSelector: props.visÅrVelger,
        value: props.input.value,
        limitations: props.avgrensninger,

        onChange
    };
}

function CustomDatovelger(props: Props) {
    const originalProps: OriginalProps = transformProps(props);
    return <Datepicker {...originalProps} />;
}
function getDatoFeilmelding(fra: Date, til: Date) {
    if (fra > til) {
        return <SkjemaelementFeilmelding>Fra-dato kan ikke være senere enn til-dato</SkjemaelementFeilmelding>;
    }
    if (til > new Date()) {
        return <SkjemaelementFeilmelding>Du kan ikke velge dato frem i tid</SkjemaelementFeilmelding>;
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
    const datoFeilmelding = getDatoFeilmelding(
        moment(props.form.fodselsdatoFra.input.value).toDate(),
        moment(props.form.fodselsdatoTil.input.value).toDate()
    );
    const avgrensninger = { minDate: props.form.fodselsdatoFra.input.value };
    return (
        <Style>
            <Flex>
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
                    <CustomDatovelger
                        visÅrVelger={true}
                        input={props.form.fodselsdatoTil.input}
                        avgrensninger={avgrensninger}
                    />
                </DatovelgerStyle>
            </Flex>
            <div>{datoFeilmelding}</div>
        </Style>
    );
}

export default PersonsokDatovelger;
