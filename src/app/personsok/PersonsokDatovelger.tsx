import * as React from 'react';
import styled from 'styled-components/macro';
import { Normaltekst } from 'nav-frontend-typografi';
import { pxToRem } from '../../styles/personOversiktTheme';
import { PersonSokFormStateV3 } from './personsokV3-utils';
import { FieldValues, FormState, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { CustomDatovelger } from './datovelger/CustomDatovelger';
import { InputLinje } from './PersonsokSkjemaV3';
import { feilmeldingReactHookForm } from '../personside/infotabs/meldinger/traadvisning/verktoylinje/oppgave/validering';
import { SkjemaelementFeilmelding } from 'nav-frontend-skjema';

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
    formState: FormState<F>;
    register: UseFormRegister<F>;
    watch: UseFormWatch<F>;
}

function PersonsokDatovelger({ watch, register, formState }: Props) {
    const fodselsdatoFra = watch('fodselsdatoFra');
    const fodselsdatoTil = watch('fodselsdatoTil');

    const feilmeldingFraDato = feilmeldingReactHookForm('fodselsdatoFra', formState);
    const feilmeldingTilDato = feilmeldingReactHookForm('fodselsdatoTil', formState);

    const avgrensninger = { minDate: fodselsdatoFra };

    return (
        <InputLinje>
            <Style>
                <Flex>
                    <Relative>
                        <DatovelgerStyle>
                            <DatolabelStyle className="skjemaelement__label" htmlFor="fodselsdatoFra">
                                <Normaltekst>Fødselsdato fra</Normaltekst>
                            </DatolabelStyle>
                            <CustomDatovelger
                                id="fodselsdatoFra"
                                showYearSelector
                                register={register}
                                value={fodselsdatoFra}
                                hasError={!!feilmeldingFraDato}
                            />
                        </DatovelgerStyle>
                    </Relative>
                    <Relative>
                        <DatovelgerStyle>
                            <DatolabelStyle className="skjemaelement__label" htmlFor="fodselsdatoTil">
                                <Normaltekst>Fødselsdato til</Normaltekst>
                            </DatolabelStyle>
                            <CustomDatovelger
                                id="fodselsdatoTil"
                                showYearSelector
                                limitations={avgrensninger}
                                register={register}
                                value={fodselsdatoTil}
                                hasError={!!feilmeldingTilDato}
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
