import * as React from 'react';
import styled from 'styled-components';
import { Normaltekst } from 'nav-frontend-typografi';
import { pxToRem } from '../../styles/personOversiktTheme';
import { PersonSokFormStateV3 } from './personsokUtils';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { InputLinje } from './PersonsokSkjema';
import { feilmeldingReactHookForm } from '../personside/infotabs/meldinger/traadvisning/verktoylinje/oppgave/feilmeldingReactHookForm';
import { SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import FormDatePicker from '../../components/form/FormDatePicker';

const DatovelgerStyle = styled.div`
    margin-right: 0.5em;
    margin-bottom: 1em;
    line-height: ${pxToRem(22)};

    .nav-datovelger__kalenderPortal {
        position: absolute;
        width: fit-content;
        top: 40px;
        left: -150px;
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

const Relative = styled.div`
    display: relative;
`;

interface Props<F extends FieldValues = PersonSokFormStateV3> {
    form: UseFormReturn<F>;
}

function PersonsokDatovelger({ form }: Props) {
    const fodselsdatoFra = form.watch('fodselsdatoFra');
    const fodselsdatoTil = form.watch('fodselsdatoTil');

    const feilmeldingFraDato = feilmeldingReactHookForm(form, 'fodselsdatoFra');
    const feilmeldingTilDato = feilmeldingReactHookForm(form, 'fodselsdatoTil');

    const limitations = { minDate: fodselsdatoFra };

    return (
        <InputLinje>
            <Style>
                <Flex>
                    <Relative>
                        <DatovelgerStyle>
                            <DatolabelStyle className="skjemaelement__label" htmlFor="fodselsdatoFra">
                                <Normaltekst>Fødselsdato fra</Normaltekst>
                            </DatolabelStyle>
                            <FormDatePicker form={form} name="fodselsdatoFra" showYearSelector value={fodselsdatoFra} />
                        </DatovelgerStyle>
                    </Relative>
                    <Relative>
                        <DatovelgerStyle>
                            <DatolabelStyle className="skjemaelement__label" htmlFor="fodselsdatoTil">
                                <Normaltekst>Fødselsdato til</Normaltekst>
                            </DatolabelStyle>
                            <FormDatePicker
                                form={form}
                                name="fodselsdatoTil"
                                showYearSelector
                                limitations={limitations}
                                value={fodselsdatoTil}
                            />
                        </DatovelgerStyle>
                    </Relative>
                </Flex>
                <SkjemaelementFeilmelding>{feilmeldingFraDato ?? feilmeldingTilDato}</SkjemaelementFeilmelding>
            </Style>
        </InputLinje>
    );
}

export default PersonsokDatovelger;
