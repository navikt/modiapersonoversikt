import { FieldValues, UseFormReturn } from 'react-hook-form';
import FormInput from '../../components/form/FormInput';
import FormSelect from '../../components/form/FormSelect';
import { Kjonn } from '../personside/visittkort-v2/PersondataDomain';
import { InputLinje } from './PersonsokSkjema';
import { PersonSokFormStateV3 } from './personsokUtils';

interface Props<F extends FieldValues = PersonSokFormStateV3> {
    form: UseFormReturn<F>;
}

function PersonsokAlderKjonn({ form }: Props) {
    return (
        <>
            <InputLinje>
                <FormInput name="alderFra" form={form} bredde="M" label={'Alder fra'} />
                <FormInput name="alderTil" form={form} bredde="M" label={'Alder til'} />
            </InputLinje>
            <FormSelect form={form} name="kjonn" label="Kjønn">
                <option value={''} key={''}>
                    Velg Kjønn
                </option>
                <option value={Kjonn.K}>K - Kvinne</option>
                <option value={Kjonn.M}>M - Mann</option>
            </FormSelect>
        </>
    );
}

export default PersonsokAlderKjonn;
