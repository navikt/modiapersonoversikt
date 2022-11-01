import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { guid } from 'nav-frontend-js-utils';
import { InputProps, Input } from 'nav-frontend-skjema';
import React, { useRef } from 'react';
import { FieldValues, FormState, UseFormRegister } from 'react-hook-form';
import { feilmeldingReactHookForm } from '../personside/infotabs/meldinger/traadvisning/verktoylinje/oppgave/validering';
import { PersonSokFormStateV3 } from './personsokV3-utils';

interface Props<F extends FieldValues = PersonSokFormStateV3> {
    formState: FormState<F>;
    register: UseFormRegister<F>;
}

const PersonsokNavnAdresseKontonrDnr: React.FC<Props> = ({ formState, register }) => {
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

    const firstSection: { id: keyof PersonSokFormStateV3; width: InputProps['bredde']; label: InputProps['label'] }[] =
        [
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
                id: 'kontonummer',
                width: 'L',
                label: 'Kontonummer (Norske nummer)'
            },
            {
                id: 'utenlandskID',
                width: 'L',
                label: utenlandskIDTittel
            }
        ];

    const minimumsKravFeil = feilmeldingReactHookForm('_minimumskrav', formState);

    return (
        <>
            {firstSection.map((formField) => {
                const { ref: inputRef, ...nativeProps } = register(formField.id);
                return (
                    <Input
                        key={`personsok-${formField.id}`}
                        id={formField.id}
                        label={formField.label}
                        bredde={formField.width}
                        feil={feilmeldingReactHookForm(formField.id, formState) || !!minimumsKravFeil}
                        inputRef={inputRef}
                        {...nativeProps}
                    />
                );
            })}
        </>
    );
};

export default PersonsokNavnAdresseKontonrDnr;
