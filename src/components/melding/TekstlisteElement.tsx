import Tekstomrade, { LinebreakRule, ParagraphRule } from 'nav-frontend-tekstomrade';
import React from 'react';
import type * as StandardTekster from 'src/app/personside/dialogpanel/sendMelding/standardTekster/domain.ts';

interface Props {
    tekst: StandardTekster.Tekst;
    valgt: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    locale: StandardTekster.Locale;
    index: number;
}

function TekstListeElement(props: Props) {
    return (
        <li>
            <input
                type="radio"
                name="tekstvalg"
                id={props.tekst.id}
                value={props.tekst.id}
                onChange={props.onChange}
                checked={props.valgt}
            />
            <label htmlFor={props.tekst.id}>
                <span className="sr-only">{props.index + 1}</span>
                <Tekstomrade as="span">{props.tekst.overskrift}</Tekstomrade>
                <Tekstomrade className="sr-only" rules={[LinebreakRule, ParagraphRule]}>
                    {props.tekst?.innhold[props.locale] || ''}
                </Tekstomrade>
            </label>
        </li>
    );
}

export default React.memo(TekstListeElement);
