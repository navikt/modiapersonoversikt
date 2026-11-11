import { render } from '@testing-library/react';
import { AdresseBeskyttelse, type KodeBeskrivelse } from 'src/models/person/persondata';
import Diskresjonskode from './Diskresjonskode';

test('Viser ikke andre diskresjonskoder enn fortrolig adresse', () => {
    const militer: KodeBeskrivelse<AdresseBeskyttelse>[] = [
        { kode: AdresseBeskyttelse.UGRADERT, beskrivelse: 'Militær' }
    ];
    const { container } = render(<Diskresjonskode adressebeskyttelse={militer} />);
    expect(container).toHaveTextContent('');
});

test('Viser diskresjonskode fortrolig adresse', () => {
    const fortroligAdresse: KodeBeskrivelse<AdresseBeskyttelse>[] = [
        { kode: AdresseBeskyttelse.KODE7, beskrivelse: 'Sperret adresse, fortrolig' }
    ];
    const { container } = render(<Diskresjonskode adressebeskyttelse={fortroligAdresse} />);
    expect(container).toHaveTextContent(fortroligAdresse[0].beskrivelse);
});

test('Viser diskresjonskode strengt fortrolig adresse', () => {
    const strengtFortroligAdresse: KodeBeskrivelse<AdresseBeskyttelse>[] = [
        { kode: AdresseBeskyttelse.KODE6, beskrivelse: 'Sperret adresse, strengt fortrolig' }
    ];
    const { container } = render(<Diskresjonskode adressebeskyttelse={strengtFortroligAdresse} />);
    expect(container).toHaveTextContent(strengtFortroligAdresse[0].beskrivelse);
});
