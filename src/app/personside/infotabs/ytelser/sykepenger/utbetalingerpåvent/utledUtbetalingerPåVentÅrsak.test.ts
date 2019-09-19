import { utledUtbetalingPåVentÅrsak } from './utledUtbetalingerPåVentÅrsak';
import { UtbetalingPåVent } from '../../../../../../models/ytelse/ytelse-utbetalinger';

const utbetalingUtenPåventÅrsak: UtbetalingPåVent = {
    vedtak: null,
    utbetalingsgrad: 62,
    oppgjørstype: 'Oppgjørstype',
    arbeidskategori: null,
    stansårsak: null,
    ferie1: null,
    ferie2: null,
    sanksjon: null,
    sykmeldt: null
};

describe('utledUtbetalingPåVentÅrsak()', () => {
    it('returnerer tom streng dersom det ikke finnes noen årsak', () => {
        const resultat = utledUtbetalingPåVentÅrsak(utbetalingUtenPåventÅrsak);
        expect(resultat).toEqual('');
    });
    it('returnerer "Inntektsopplysninger mangler" dersom arbeidskategori === 99', () => {
        const utbetaling = {
            ...utbetalingUtenPåventÅrsak,
            arbeidskategori: 'Inntektsopplysninger mangler'
        };
        const resultat = utledUtbetalingPåVentÅrsak(utbetaling);
        expect(resultat).toEqual('Inntektsopplysninger mangler');
    });
    it('returnerer stansårsak dersom utbetaling har stansårsak', () => {
        const utbetaling: UtbetalingPåVent = {
            ...utbetalingUtenPåventÅrsak,
            stansårsak: 'Pga zombieapokalypse'
        };

        const resultat = utledUtbetalingPåVentÅrsak(utbetaling);

        expect(resultat).toEqual('Pga zombieapokalypse');
    });
    it('returnerer "Sanksjon" dersom sanksjon varer lenger enn vedtak', () => {
        const utbetalingMedSanksjonUtoverPerioden: UtbetalingPåVent = {
            ...utbetalingUtenPåventÅrsak,
            stansårsak: null,
            sanksjon: {
                fra: '2010-01-01',
                til: '2010-01-03'
            },
            vedtak: {
                fra: '2010-01-01',
                til: '2010-01-02'
            }
        };
        const resultat = utledUtbetalingPåVentÅrsak(utbetalingMedSanksjonUtoverPerioden);

        expect(resultat).toEqual('Sanksjon');
    });
    it('returnerer tom streng dersom sanksjon ikke varer lenger enn vedtak', () => {
        const utbetalingMedSanksjonUtoverPerioden: UtbetalingPåVent = {
            ...utbetalingUtenPåventÅrsak,
            stansårsak: null,
            sanksjon: {
                fra: '2010-01-01',
                til: '2010-01-02'
            },
            vedtak: {
                fra: '2010-01-01',
                til: '2010-01-03'
            }
        };
        const resultat = utledUtbetalingPåVentÅrsak(utbetalingMedSanksjonUtoverPerioden);

        expect(resultat).toEqual('');
    });
    it('returnerer "Sanksjon" dersom sanksjon er innenfor vedtaksperioden og ikke har slutt', () => {
        const utbetalingMedSanksjonUtoverPerioden: UtbetalingPåVent = {
            ...utbetalingUtenPåventÅrsak,
            stansårsak: null,
            sanksjon: {
                fra: '2010-01-01',
                til: null
            },
            vedtak: {
                fra: '2010-01-01',
                til: '2010-01-03'
            }
        };
        const resultat = utledUtbetalingPåVentÅrsak(utbetalingMedSanksjonUtoverPerioden);

        expect(resultat).toEqual('Sanksjon');
    });
    it('returnerer "Sanksjon" dersom sanksjon er etter vedtaksperioden og ikke har slutt', () => {
        const utbetalingMedSanksjonUtoverPerioden: UtbetalingPåVent = {
            ...utbetalingUtenPåventÅrsak,
            stansårsak: null,
            sanksjon: {
                fra: '2010-01-04',
                til: null
            },
            vedtak: {
                fra: '2010-01-01',
                til: '2010-01-03'
            }
        };
        const resultat = utledUtbetalingPåVentÅrsak(utbetalingMedSanksjonUtoverPerioden);

        expect(resultat).toEqual('');
    });
    it('returnerer "Sykmelding mangler for perioden" dersom sykemelding finnes men sykmelding løper ut før vedtaksperioden', () => {
        const utbetalingMedManglendeSykmelding: UtbetalingPåVent = {
            ...utbetalingUtenPåventÅrsak,
            vedtak: {
                fra: '2010-01-01',
                til: '2010-01-03'
            },
            sykmeldt: {
                fra: '2010-01-01',
                til: '2010-01-01'
            }
        };
        const resultat = utledUtbetalingPåVentÅrsak(utbetalingMedManglendeSykmelding);

        expect(resultat).toEqual('Sykmelding mangler for perioden');
    });
    it('returnerer "Ferie" dersom bruker er på ferie utover vedtaksperioden', () => {
        const utbetalingMedManglendeSykmelding: UtbetalingPåVent = {
            ...utbetalingUtenPåventÅrsak,
            vedtak: {
                fra: '2010-01-01',
                til: '2010-01-03'
            },
            ferie1: {
                fra: '2010-01-01',
                til: '2010-01-04'
            }
        };
        const resultat = utledUtbetalingPåVentÅrsak(utbetalingMedManglendeSykmelding);

        expect(resultat).toEqual('Ferie');
    });
    it('returnerer "Ferie" dersom bruker er på to ferier og en av de går utover vedtaksperioden', () => {
        const utbetalingMedManglendeSykmelding: UtbetalingPåVent = {
            ...utbetalingUtenPåventÅrsak,
            vedtak: {
                fra: '2010-01-01',
                til: '2010-01-03'
            },
            ferie1: {
                fra: '2010-01-01',
                til: '2010-01-02'
            },
            ferie2: {
                fra: '2010-01-03',
                til: '2010-01-04'
            }
        };
        const resultat = utledUtbetalingPåVentÅrsak(utbetalingMedManglendeSykmelding);

        expect(resultat).toEqual('Ferie');
    });
});
