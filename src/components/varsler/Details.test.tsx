import { render, screen, within } from '@testing-library/react';
import type { VarselData } from 'src/components/varsler/List/utils';
import type { Varsel } from 'src/lib/types/modiapersonoversikt-api';
import { statiskVarselMock } from 'src/mock/varsler/statiskVarselMock';
import { describe, expect, test } from 'vitest';
import { VarselDetail } from './Details';

const originalVarsel = statiskVarselMock[0]!;

const createVarselData = (overrides: Partial<Varsel['eksternVarsling']> = {}): VarselData => {
    const event: Varsel = {
        ...originalVarsel,
        eksternVarsling: {
            ...originalVarsel.eksternVarsling,
            ...overrides
        }
    };

    return {
        eventId: event.varselId,
        aktiv: event.aktiv,
        datoer: [event.eksternVarsling.sendtTidspunkt],
        varslingstidspunkt: event.eksternVarsling.sendtTidspunkt,
        revarslingstidspunkt: event.eksternVarsling.renotifikasjonTidspunkt ?? '',
        kanaler: ['DITT_NAV', ...event.eksternVarsling.sendteKanaler],
        tittel: event.innhold.tekst,
        produsent: event.produsent ?? '',
        event
    };
};

const varselInnholdNavn = 'Innhold i varselet til brukeren';
const revarselInnholdNavn = 'Innhold i revarselet til brukeren';

describe('VarselDetail', () => {
    test.each(['SMS', null, undefined])('viser HTML som klartekst når kanalen er %s', (kanal) => {
        const tekst = '<p>Hei <strong>du</strong></p>';
        render(<VarselDetail valgtVarsel={createVarselData({ kanal, tekst })} />);

        const innhold = screen.getByRole('region', { name: varselInnholdNavn });
        expect(within(innhold).getByText(tekst)).toBeInTheDocument();
        expect(innhold.querySelector('strong')).toBeNull();
    });

    test('beholder klartekst i e-post uendret med linjeskift, spesialtegn og e-postadresse', () => {
        const tekst = 'Hei!\nBeløp < 100 & > 10.\nKontakt <nav@nav.no>. Vis &amp; som skrevet.';
        render(<VarselDetail valgtVarsel={createVarselData({ kanal: 'EPOST', tekst })} />);

        const innhold = screen.getByRole('region', { name: varselInnholdNavn });
        expect(within(innhold).getByText(tekst, { normalizer: (verdi) => verdi })).toHaveClass('whitespace-pre-wrap');
    });

    test('viser tittel og tekst fra eksternt varsel i en merket blokk', () => {
        render(
            <VarselDetail
                valgtVarsel={createVarselData({
                    tittel: 'Din søknad er behandlet',
                    tekst: 'Du får svar på søknaden.\nSe mer informasjon på nav.no.'
                })}
            />
        );

        const innhold = screen.getByRole('region', { name: varselInnholdNavn });
        expect(within(innhold).getByText('Tittel')).toBeInTheDocument();
        expect(within(innhold).getByText('Din søknad er behandlet')).toBeInTheDocument();
        expect(within(innhold).getByText('Tekst')).toBeInTheDocument();
        expect(
            within(innhold).getByText('Du får svar på søknaden.\nSe mer informasjon på nav.no.', {
                normalizer: (tekst) => tekst
            })
        ).toBeInTheDocument();
    });

    test.each([
        { navn: 'mangler', felter: {} },
        {
            navn: 'er null',
            felter: { tittel: null, tekst: null, renotifikasjonTittel: null, renotifikasjonTekst: null }
        },
        { navn: 'er tomme', felter: { tittel: '', tekst: '', renotifikasjonTittel: '', renotifikasjonTekst: '' } }
    ])('skjuler tomme innholdsblokker når de nye feltene $navn og beholder eksisterende innhold', ({ felter }) => {
        render(<VarselDetail valgtVarsel={createVarselData(felter)} />);

        expect(screen.queryByRole('region', { name: varselInnholdNavn })).not.toBeInTheDocument();
        expect(screen.queryByRole('region', { name: revarselInnholdNavn })).not.toBeInTheDocument();
        expect(screen.getByText(`Varsel: ${originalVarsel.innhold.tekst}`)).toBeInTheDocument();
        expect(screen.getByText('Produsert av:')).toBeInTheDocument();
        expect(screen.getByText(originalVarsel.produsent!)).toBeInTheDocument();
    });

    test('viser revarseltittel og -tekst når de avviker fra det opprinnelige varselet', () => {
        render(
            <VarselDetail
                valgtVarsel={createVarselData({
                    tittel: 'Opprinnelig tittel',
                    tekst: 'Opprinnelig tekst',
                    renotifikasjonTittel: 'Ny tittel',
                    renotifikasjonTekst: 'Ny tekst'
                })}
            />
        );

        const revarsel = screen.getByRole('region', { name: revarselInnholdNavn });
        expect(within(revarsel).getByText('Tittel')).toBeInTheDocument();
        expect(within(revarsel).getByText('Ny tittel')).toBeInTheDocument();
        expect(within(revarsel).getByText('Tekst')).toBeInTheDocument();
        expect(within(revarsel).getByText('Ny tekst')).toBeInTheDocument();
    });

    test.each([
        {
            navn: 'begge verdiene er like',
            felter: {
                tittel: 'Opprinnelig tittel',
                tekst: 'Opprinnelig tekst',
                renotifikasjonTittel: 'Opprinnelig tittel',
                renotifikasjonTekst: 'Opprinnelig tekst'
            },
            avvikendeFelt: []
        },
        {
            navn: 'bare tittelen avviker',
            felter: {
                tittel: 'Opprinnelig tittel',
                tekst: 'Opprinnelig tekst',
                renotifikasjonTittel: 'Ny tittel',
                renotifikasjonTekst: 'Opprinnelig tekst'
            },
            avvikendeFelt: [{ label: 'Tittel', verdi: 'Ny tittel' }]
        },
        {
            navn: 'bare teksten avviker',
            felter: {
                tittel: 'Opprinnelig tittel',
                tekst: 'Opprinnelig tekst',
                renotifikasjonTittel: 'Opprinnelig tittel',
                renotifikasjonTekst: 'Ny tekst'
            },
            avvikendeFelt: [{ label: 'Tekst', verdi: 'Ny tekst' }]
        }
    ])('viser bare revarselsfeltene som avviker når $navn', ({ felter, avvikendeFelt }) => {
        render(<VarselDetail valgtVarsel={createVarselData(felter)} />);

        if (avvikendeFelt.length === 0) {
            expect(screen.queryByRole('region', { name: revarselInnholdNavn })).not.toBeInTheDocument();
            return;
        }

        const revarsel = screen.getByRole('region', { name: revarselInnholdNavn });
        for (const felt of avvikendeFelt) {
            expect(within(revarsel).getByText(felt.label)).toBeInTheDocument();
            expect(within(revarsel).getByText(felt.verdi)).toBeInTheDocument();
        }

        if (avvikendeFelt[0]?.label === 'Tittel') {
            expect(within(revarsel).queryByText('Tekst')).not.toBeInTheDocument();
            expect(within(revarsel).queryByText('Opprinnelig tekst')).not.toBeInTheDocument();
        } else {
            expect(within(revarsel).queryByText('Tittel')).not.toBeInTheDocument();
            expect(within(revarsel).queryByText('Opprinnelig tittel')).not.toBeInTheDocument();
        }
    });
});
