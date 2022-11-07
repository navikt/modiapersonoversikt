import * as React from 'react';
import { SladdeComponentProps } from './Sladdevalg';
import { Hovedknapp } from 'nav-frontend-knapper';
import MeldIPortenAdvarsel from './MeldIPortenAdvarsel';
import FormSelect from '../../../../../../../../components/form/FormSelect';

function SladdTradMedArsak({ arsaker, form }: SladdeComponentProps) {
    return (
        <>
            <div>
                <MeldIPortenAdvarsel />
                <FormSelect name="arsak" aria-label="årsak" defaultValue="" form={form}>
                    <>
                        <option value="" disabled>
                            Velg årsak
                        </option>
                        {arsaker.map((it) => (
                            <option value={it} key={it}>
                                {it}
                            </option>
                        ))}
                    </>
                </FormSelect>
            </div>
            <Hovedknapp>Send til sladding</Hovedknapp>
        </>
    );
}

export default SladdTradMedArsak;
