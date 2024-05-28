import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { guid } from 'nav-frontend-js-utils';
import { InputProps } from 'nav-frontend-skjema';
import React, { useRef } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import FormInput from '../../components/form/FormInput';
import { PersonSokFormStateV3 } from './personsokUtils';

interface Props<F extends FieldValues = PersonSokFormStateV3> {
    form: UseFormReturn<F>;
}

function PersonsokNavnAdresseKontonrDnr({ form }: Props) {
    const hjelpetekstID = useRef(guid());

    const utenlandskIDTittel = [
        'Utenlandsk ID ',
        <Hjelpetekst id={hjelpetekstID.current} key={hjelpetekstID.current}>
            Husk å inkludere alle tegn. Eksempel: 010101-12345
        </Hjelpetekst>
    ];

    const navnTittel = [
        'Navn (Fonetisk søk) ',
        <Hjelpetekst id={hjelpetekstID.current} key={hjelpetekstID.current}>
            Dersom du er helt sikker på hvordan deler av ett navn staves så kan en benytte "" rundt det ordet du er
            sikker på og søkeløsningen vil prøve å finne eksakt match for dette ordet
        </Hjelpetekst>
    ];

    const adresseTittel = [
        'Adresse ',
        <Hjelpetekst id={hjelpetekstID.current} key={hjelpetekstID.current}>
            Dersom du er helt sikker på hvordan deler av en adresse staves så kan en benytte "" rundt det ordet for å si
            at nøyaktig dette ordet må være med i adressen for å gi treff
        </Hjelpetekst>
    ];

    const formFields: { id: keyof PersonSokFormStateV3; width: InputProps['bredde']; label: InputProps['label'] }[] = [
        {
            id: 'navn',
            width: 'XL',
            label: navnTittel
        },
        {
            id: 'adresse',
            width: 'XL',
            label: adresseTittel
        },
        {
            id: 'utenlandskID',
            width: 'L',
            label: utenlandskIDTittel
        }
    ];

    return (
        <>
            {formFields.map((formField) => (
                <FormInput
                    key={`personsok-${formField.id}`}
                    name={formField.id}
                    form={form}
                    id={formField.id}
                    label={formField.label}
                    bredde={formField.width}
                    feil={!!form.formState.errors['_minimumskrav']}
                />
            ))}
        </>
    );
}

export default PersonsokNavnAdresseKontonrDnr;
