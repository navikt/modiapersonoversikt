import * as React from 'react';
import Diskresjonskode from './Diskresjonskode';
import { shallow } from 'enzyme';
import { AdresseBeskyttelse, KodeBeskrivelse } from '../../../PersondataDomain';

test('Viser ikke andre diskresjonskoder enn fortrolig adresse', () => {
    const militer: KodeBeskrivelse<AdresseBeskyttelse>[] = [
        { kode: AdresseBeskyttelse.UGRADERT, beskrivelse: 'Militær' }
    ];
    const result = shallow(<Diskresjonskode adressebeskyttelse={militer} />);
    expect(result.html()).toBeNull();
});

test('Viser diskresjonskode fortrolig adresse', () => {
    const fortroligAdresse: KodeBeskrivelse<AdresseBeskyttelse>[] = [
        { kode: AdresseBeskyttelse.KODE7, beskrivelse: 'Sperret adresse, fortrolig' }
    ];
    const result = shallow(<Diskresjonskode adressebeskyttelse={fortroligAdresse} />);
    expect(result.html()).not.toBeNull();
});

test('Viser diskresjonskode strengt fortrolig adresse', () => {
    const strengtFortroligAdresse: KodeBeskrivelse<AdresseBeskyttelse>[] = [
        { kode: AdresseBeskyttelse.KODE6, beskrivelse: 'Sperret adresse, strengt fortrolig' }
    ];
    const result = shallow(<Diskresjonskode adressebeskyttelse={strengtFortroligAdresse} />);
    expect(result.html()).not.toBeNull();
});
