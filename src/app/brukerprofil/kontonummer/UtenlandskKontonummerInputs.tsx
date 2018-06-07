import * as React from 'react';
import Input from 'nav-frontend-skjema/lib/input';
import Select from 'nav-frontend-skjema/lib/select';

class UtenlandskKontonrInputs extends React.Component<{}, {}> {
    render() {
        return (
            <>
                <Select label="Velg land">
                    <option value="norge" key="norge">Norge</option>
                </Select>
                <Input
                    label="Bankens navn"
                />
                <Input
                    label="Bankens adresse"
                />
                <Input
                    label=""
                />
                <Input
                    label=""
                />
                <Input
                    label="Kontonummer eller IBAN"
                />
                <Input
                    label="BC/SWIFT-kode"
                />
                <Input
                    label="BankKode"
                />
                <Select label="Valutta">
                    <option value="norske kroner" key="norkse kroner">NOK</option>
                </Select>
            </>
        );
    }
}

export default UtenlandskKontonrInputs;
