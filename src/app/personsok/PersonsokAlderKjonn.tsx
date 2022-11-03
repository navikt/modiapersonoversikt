import { Input, Select } from 'nav-frontend-skjema';
import React from 'react';
import { FieldValues, FormState, UseFormRegister } from 'react-hook-form';
import { feilmeldingReactHookForm } from '../personside/infotabs/meldinger/traadvisning/verktoylinje/oppgave/validering';
import { Kjonn } from '../personside/visittkort-v2/PersondataDomain';
import { InputLinje } from './PersonsokSkjemaV3';
import { PersonSokFormStateV3 } from './personsokV3-utils';

interface Props<F extends FieldValues = PersonSokFormStateV3> {
    formState: FormState<F>;
    register: UseFormRegister<F>;
}

function PersonsokAlderKjonn({ formState, register }: Props) {
    const { ref: kjonnSelectorRef, ...kjonnProps } = register('kjonn');

    return (
        <>
            <InputLinje>
                <Input
                    bredde={'M'}
                    label={'Alder fra'}
                    {...register('alderFra')}
                    feil={feilmeldingReactHookForm('alderFra', formState)}
                />
                <Input
                    bredde={'M'}
                    label={'Alder til'}
                    {...register('alderTil')}
                    feil={feilmeldingReactHookForm('alderTil', formState)}
                />
            </InputLinje>
            <Select label={'Kjønn'} selectRef={kjonnSelectorRef as any} {...kjonnProps}>
                <option value={''} key={''}>
                    Velg Kjønn
                </option>
                <option value={Kjonn.K}>K - Kvinne</option>
                <option value={Kjonn.M}>M - Mann</option>
            </Select>
        </>
    );
}

export default PersonsokAlderKjonn;
