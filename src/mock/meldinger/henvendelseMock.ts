import { OpprettHenvendelseResponse } from '../../models/meldinger/meldinger';
import navfaker from 'nav-faker';

export const henvendelseResponseMock: OpprettHenvendelseResponse = {
    behandlingsId: '890',
    oppgaveId: navfaker.random.vektetSjanse(0.5) ? '123' : undefined
};
