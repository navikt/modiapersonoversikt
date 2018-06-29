import { erImorgenEllerSenere, formaterDato } from './dateUtils';

it('Formaterer dato på backend-format til ønsket visningsformat', () => {
    const rawDate = '2014-02-10T08:09:36.000+0000';
    const formatertDato = formaterDato(rawDate);

    expect(formatertDato).toEqual('10.02.2014');
});

describe('dato erImorgenEllerSenere', () => {

    it('Dagens dato', () => {
        expect(erImorgenEllerSenere(new Date())).toEqual(false);
    });

    it('Fremtidens dato', () => {
        const date = new Date();
        date.setFullYear(3000);
        expect(erImorgenEllerSenere(date)).toEqual(true);
    });

});
