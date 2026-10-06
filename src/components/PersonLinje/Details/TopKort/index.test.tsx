import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DodsboSkifteform, type PersonData, PersonDataFeilendeSystemer } from 'src/lib/types/modiapersonoversikt-api';
import { createPersonData } from 'src/test/createPersonData';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TopKort from './index';

let person: PersonData;
let feilendeSystemer: string[] = [];

vi.mock('src/lib/clients/modiapersonoversikt-api', () => ({
    usePersonData: () => ({ data: { person, feilendeSystemer } })
}));

beforeEach(() => {
    feilendeSystemer = [];
    person = createPersonData();
});

describe('TopKort', () => {
    it('viser eksisterende kontaktverdier, prioritert Nav-telefon og bostedsadresse', () => {
        render(<TopKort />);

        expect(screen.getByText('99 99 99 99')).toBeInTheDocument();
        expect(screen.getByText('test@example.no')).toBeInTheDocument();
        expect(screen.getByText('77 77 77 77')).toBeInTheDocument();
        expect(screen.queryByText('88 88 88 88')).not.toBeInTheDocument();
        expect(screen.getByText('Testgata 1')).toBeInTheDocument();
    });

    it('viser landskode for prioritert Nav-telefon og formaterer KRR-telefonen', () => {
        person.telefonnummer[1].retningsnummer = { kode: '+47', beskrivelse: 'Norge' };
        render(<TopKort />);

        expect(screen.getByText('+47 77 77 77 77')).toBeInTheDocument();
        expect(screen.getByText('99 99 99 99')).toBeInTheDocument();
    });

    it('beholder landskode som er del av KRR-telefonnummeret', () => {
        person.kontaktInformasjon.mobil = { value: '+4799999999', sistOppdatert: '2024-01-02' };
        render(<TopKort />);

        expect(screen.getByText('+47 99 99 99 99')).toBeInTheDocument();
    });

    it('viser etiketten over verdien og endringsdatoen med avstand mellom feltene', () => {
        render(<TopKort />);

        const telefonFelt = screen.getByText('Telefon').parentElement;
        const kontaktKolonne = telefonFelt?.parentElement;
        expect(telefonFelt).toHaveClass('aksel-vstack');
        expect(telefonFelt).toHaveTextContent('99 99 99 99');
        expect(telefonFelt).toHaveTextContent('Endret 02.01.2024');
        expect(kontaktKolonne?.style.getPropertyValue('--__axc-stack-gap-xs')).toBe('var(--ax-space-16)');
        expect(kontaktKolonne?.children).toHaveLength(4);
    });

    it('plasserer kontonummer før adresse og tolkebehov etter adresse', () => {
        person.tilrettelagtKommunikasjon = {
            tegnsprak: [{ kode: 'NO', beskrivelse: 'Norsk' }],
            talesprak: [{ kode: 'EN', beskrivelse: 'Engelsk' }]
        };
        render(<TopKort />);

        const kontonummer = screen.getByText('0000.00.00000');
        const adresse = screen.getByText('Testgata 1');
        const tolk = screen.getByText('Tegnspråk: Norsk (NO)');
        expect(kontonummer.compareDocumentPosition(adresse) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(adresse.compareDocumentPosition(tolk) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(screen.getByText('Talespråk: Engelsk (EN)')).toBeInTheDocument();
    });

    it('viser bare tilgjengelige endringsdatoer med riktig kilde', () => {
        person.telefonnummer[1].sistEndret = {
            tidspunkt: '2024-01-04T12:00:00',
            ident: 'system',
            system: 'Nav',
            kilde: 'bruker'
        };
        person.bankkonto = {
            ...person.bankkonto,
            kontonummer: '00000000000',
            opprettetAv: 'system',
            sistEndret: {
                tidspunkt: '2024-01-05T12:00:00',
                ident: 'system',
                system: 'bank',
                kilde: 'bruker'
            }
        };
        render(<TopKort />);

        expect(screen.getByText('Endret 02.01.2024 i Kontakt- og reservasjonsregisteret')).toBeInTheDocument();
        expect(screen.getByText('Endret 03.02.2024 i Kontakt- og reservasjonsregisteret')).toBeInTheDocument();
        expect(screen.getByText(/Endret 04.01.2024 av Nav/)).toBeInTheDocument();
        expect(screen.getByText(/Endret 05.01.2024 av bank/)).toBeInTheDocument();
        expect(screen.queryByText(/Endret null|Endret undefined/)).not.toBeInTheDocument();
    });

    it('viser reservert telefonnummer og e-post med reservasjonsdato', () => {
        person.kontaktInformasjon.erReservert = { value: true, sistOppdatert: '2024-03-05' };
        render(<TopKort />);

        expect(screen.getByText('99 99 99 99 (Reservert)')).toBeInTheDocument();
        expect(screen.getByText('test@example.no (Reservert)')).toBeInTheDocument();
        expect(screen.getAllByText('Endret 05.03.2024 i Kontakt- og reservasjonsregisteret')).toHaveLength(2);
    });

    it('lar feilmelding gå foran verdi og endringsdato for feilende kilder', () => {
        feilendeSystemer = [
            PersonDataFeilendeSystemer.DKIF,
            PersonDataFeilendeSystemer.NORG_KONTAKTINFORMASJON,
            PersonDataFeilendeSystemer.BANKKONTO
        ];
        render(<TopKort />);

        expect(screen.getAllByText('Feilet ved uthenting fra KRR')).toHaveLength(2);
        expect(screen.getByText('Feilet ved uthenting av kontaktinformasjon')).toBeInTheDocument();
        expect(screen.getByText('Feilet ved uthenting av kontonummer')).toBeInTheDocument();
        expect(screen.queryByText('0000.00.00000')).not.toBeInTheDocument();
        expect(screen.queryByText('test@example.no')).not.toBeInTheDocument();
        expect(screen.queryByText(/Endret 02.01.2024/)).not.toBeInTheDocument();
    });

    it('utelater tomt tolkebehov og endringsdato når data mangler', () => {
        person.kontaktInformasjon = { erReservert: { value: true } };
        person.bankkonto = null;
        render(<TopKort />);

        expect(screen.queryByText('Tolkebehov')).not.toBeInTheDocument();
        expect(screen.getAllByText('Reservert')).toHaveLength(2);
        expect(screen.getByText('Ikke registrert')).toBeInTheDocument();
        expect(screen.queryByText(/Endret null|Endret undefined/)).not.toBeInTheDocument();
    });

    it('viser første bostedsadresse og legger øvrige adresser i ReadMore i API-rekkefølge', async () => {
        person.bostedAdresse.push(
            {
                linje1: 'Bosted 2',
                gyldighetsPeriode: { gyldigFraOgMed: '2024-01-01', gyldigTilOgMed: '2024-02-01' },
                sistEndret: { tidspunkt: '2024-03-01T12:00:00', ident: 'test', system: 'Folkeregisteret', kilde: '' }
            },
            { linje1: 'Bosted 3' }
        );
        person.kontaktAdresse = [{ linje1: 'Kontakt 1' }, { linje1: 'Kontakt 2' }];
        person.oppholdsAdresse = [{ linje1: 'Opphold 1' }];
        render(<TopKort />);

        expect(screen.getByText('Testgata 1')).toBeInTheDocument();
        const knapp = screen.getByRole('button', { name: 'Personen har flere adresser' });
        expect(knapp).toHaveAttribute('aria-expanded', 'false');
        await userEvent.setup().click(knapp);
        expect(knapp).toHaveAttribute('aria-expanded', 'true');

        const linjer = ['Bosted 2', 'Bosted 3', 'Kontakt 1', 'Kontakt 2', 'Opphold 1'];
        const elementer = linjer.map((linje) => screen.getByText(linje));
        for (let index = 1; index < elementer.length; index++) {
            expect(
                elementer[index - 1].compareDocumentPosition(elementer[index]) & Node.DOCUMENT_POSITION_FOLLOWING
            ).toBeTruthy();
        }
        expect(screen.getByText('Bosted 2').parentElement).toHaveTextContent('Endret 01.03.2024');
        expect(screen.getByText('Bosted 2').parentElement).toHaveTextContent('01.01.2024');
        expect(screen.getByText('Bosted 2').parentElement).toHaveTextContent('01.02.2024');
    });

    it('bruker kontaktadresse når bostedsadresse mangler', () => {
        person.bostedAdresse = [];
        person.kontaktAdresse = [{ linje1: 'Kontakt 1' }];
        person.oppholdsAdresse = [{ linje1: 'Opphold 1' }];
        render(<TopKort />);

        expect(screen.getByText('Kontakt 1')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Personen har flere adresser' })).toBeInTheDocument();
        expect(screen.getByText('Kontaktadresse').parentElement).toHaveTextContent('Kontakt 1');
    });

    it('bruker oppholdsadresse når bosteds- og kontaktadresse mangler', () => {
        person.bostedAdresse = [];
        person.kontaktAdresse = [];
        person.oppholdsAdresse = [{ linje1: 'Opphold 1' }];
        render(<TopKort />);

        expect(screen.getByText('Oppholdsadresse').parentElement).toHaveTextContent('Opphold 1');
        expect(screen.queryByRole('button', { name: 'Personen har flere adresser' })).not.toBeInTheDocument();
    });

    it('legger delt bosted først i ReadMore, også når det er eneste øvrige adresse', async () => {
        person.deltBosted = [
            { adresse: null },
            {
                adresse: { linje1: 'Delt bosted 1' },
                gyldighetsPeriode: { gyldigFraOgMed: '2024-04-01', gyldigTilOgMed: null }
            },
            { adresse: { linje1: 'Delt bosted 2' } }
        ];
        person.kontaktAdresse = [{ linje1: 'Kontakt 1' }];
        render(<TopKort />);

        const knapp = screen.getByRole('button', { name: 'Personen har flere adresser' });
        await userEvent.setup().click(knapp);
        expect(knapp).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getAllByText('Delt bosted')).toHaveLength(2);
        const delt = screen.getByText('Delt bosted 1');
        expect(delt.parentElement).toHaveTextContent('01.04.2024');
        expect(
            delt.compareDocumentPosition(screen.getByText('Delt bosted 2')) & Node.DOCUMENT_POSITION_FOLLOWING
        ).toBeTruthy();
        expect(
            delt.compareDocumentPosition(screen.getByText('Kontakt 1')) & Node.DOCUMENT_POSITION_FOLLOWING
        ).toBeTruthy();
        expect(screen.getByText('Testgata 1')).toBeInTheDocument();
    });

    it('viser dødsbo først og samler alle andre adresser i ReadMore uten å endre de andre kolonnene', async () => {
        person.dodsdato = [{ dodsdato: '2024-01-01' }];
        person.dodsbo = [
            {
                skifteform: DodsboSkifteform.OFFENTLIG,
                registrert: '2024-02-01',
                adressat: { organisasjonSomAdressat: { organisasjonsnavn: 'Dødsboet AS' } },
                adresse: { linje1: 'Bobestyrerveien 1' }
            }
        ];
        person.kontaktAdresse = [{ linje1: 'Kontakt 1' }];
        render(<TopKort />);

        expect(screen.getByText('Kontaktinformasjon for dødsbo').parentElement).toHaveTextContent('Dødsboet AS');
        expect(screen.getByText('Bobestyrerveien 1')).toBeInTheDocument();
        const knapp = screen.getByRole('button', { name: 'Personen har flere adresser' });
        await userEvent.setup().click(knapp);
        expect(screen.getByText('Testgata 1')).toBeInTheDocument();
        expect(screen.getByText('Kontakt 1')).toBeInTheDocument();
        expect(screen.getByText('99 99 99 99')).toBeInTheDocument();
        expect(screen.getByText('0000.00.00000')).toBeInTheDocument();
    });

    it('viser alle dødsbooppføringer og feilmelding når navn på adressaten ikke kunne hentes', () => {
        person.dodsdato = [{ dodsdato: '2024-01-01' }];
        person.dodsbo = [
            {
                skifteform: DodsboSkifteform.OFFENTLIG,
                registrert: '2024-02-01',
                adressat: { personSomAdressat: { fnr: '00000000000', navn: [] } },
                adresse: { linje1: 'Bobestyrerveien 1' },
                sistEndret: { tidspunkt: '2024-02-02T12:00:00', ident: 'test', system: 'Folkeregisteret', kilde: '' }
            },
            {
                skifteform: DodsboSkifteform.UKJENT,
                registrert: '2024-03-01',
                adressat: { organisasjonSomAdressat: { organisasjonsnavn: 'Andre dødsbo' } },
                adresse: { linje1: 'Bobestyrerveien 2' }
            }
        ];
        feilendeSystemer = [PersonDataFeilendeSystemer.PDL_TREDJEPARTSPERSONER];
        render(<TopKort />);

        expect(screen.getAllByText('Kontaktinformasjon for dødsbo')).toHaveLength(2);
        expect(screen.getByText('Feilet ved uthenting av navn')).toBeInTheDocument();
        expect(screen.getByText('Bobestyrerveien 2')).toBeInTheDocument();
        expect(screen.getByText('Bobestyrerveien 1').parentElement).toHaveTextContent('Endret 02.02.2024');
    });

    it('bruker vanlige adresseregler ved død uten dødsboinformasjon', () => {
        person.dodsdato = [{ dodsdato: '2024-01-01' }];
        person.kontaktAdresse = [{ linje1: 'Kontakt 1' }];
        render(<TopKort />);

        expect(screen.getByText('Bostedsadresse').parentElement).toHaveTextContent('Testgata 1');
        expect(screen.getByRole('button', { name: 'Personen har flere adresser' })).toBeInTheDocument();
        expect(screen.queryByText('Kontaktinformasjon for dødsbo')).not.toBeInTheDocument();
    });

    it('utelater adresse og ReadMore når ingen adresse er registrert', () => {
        person.bostedAdresse = [];
        render(<TopKort />);

        expect(screen.queryByText('Bostedsadresse')).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Personen har flere adresser' })).not.toBeInTheDocument();
    });

    it('viser statsborgerskap over oppholdstillatelse i høyre kolonne', () => {
        person.statsborgerskap = [{ land: { kode: 'NOR', beskrivelse: 'NORGE' }, gyldighetsPeriode: null }];
        person.opphold = [
            {
                type: 'Midlertidig',
                oppholdFra: '2024-01-15',
                oppholdTil: '2026-12-31'
            }
        ];
        render(<TopKort />);

        const statsborgerskap = screen.getByText('Statsborgerskap');
        const opphold = screen.getByText('Oppholdstillatelse');
        const hoyreKolonne = statsborgerskap.parentElement?.parentElement;
        expect(hoyreKolonne).toBe(hoyreKolonne?.parentElement?.lastElementChild);
        expect(opphold.parentElement?.parentElement).toBe(hoyreKolonne);
        expect(screen.getByText('Norge')).toBeInTheDocument();
        expect(screen.getByText('Type: Midlertidig')).toBeInTheDocument();
        expect(screen.getByText('Opphold fra: 15.01.2024')).toBeInTheDocument();
        expect(screen.getByText('Opphold til: 31.12.2026')).toBeInTheDocument();
        expect(statsborgerskap.compareDocumentPosition(opphold) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    it('viser ikke oppholdstillatelse når listen er tom', () => {
        person.opphold = [];
        render(<TopKort />);

        expect(screen.queryByText('Oppholdstillatelse')).not.toBeInTheDocument();
    });
});
