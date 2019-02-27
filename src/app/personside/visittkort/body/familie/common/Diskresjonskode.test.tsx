import * as React from 'react';
import { Diskresjonskode } from './Diskresjonskode';
import { Kodeverk } from '../../../../../../models/kodeverk';
import { shallow } from 'enzyme';
import { Diskresjonskoder } from '../../../../../../konstanter';

test('Viser ikke andre diskresjonskoder enn fortrolig adresse', () => {
    const militær: Kodeverk = { kodeRef: 'MILI', beskrivelse: 'Militær' };
    const result = shallow(<Diskresjonskode diskresjonskode={militær} />);
    expect(result.html()).toBeNull();
});

test('Viser diskresjonskode fortrolig adresse', () => {
    const fortroligAdresse: Kodeverk = {
        kodeRef: Diskresjonskoder.FORTROLIG_ADRESSE,
        beskrivelse: 'Fortrolig adresse'
    };
    const result = shallow(<Diskresjonskode diskresjonskode={fortroligAdresse} />);
    expect(result.html()).not.toBeNull();
});

test('Viser diskresjonskode strengt fortrolig adresse', () => {
    const strengtFortroligAdresse: Kodeverk = {
        kodeRef: Diskresjonskoder.STRENGT_FORTROLIG_ADRESSE,
        beskrivelse: 'Strengt fortrolig adresse'
    };
    const result = shallow(<Diskresjonskode diskresjonskode={strengtFortroligAdresse} />);
    expect(result.html()).not.toBeNull();
});
