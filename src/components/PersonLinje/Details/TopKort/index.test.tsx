import { render, screen } from '@testing-library/react';
import { type PersonData, PersonDataFeilendeSystemer } from 'src/lib/types/modiapersonoversikt-api';
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
        expect(screen.queryByText('88888888')).not.toBeInTheDocument();
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

    it('viser reservert telefonnummer med dato, men skjuler e-post', () => {
        person.kontaktInformasjon.erReservert = { value: true, sistOppdatert: '2024-03-05' };
        render(<TopKort />);

        expect(screen.getByText('99 99 99 99 (Reservert)')).toBeInTheDocument();
        expect(screen.getByText('Reservert')).toBeInTheDocument();
        expect(screen.getAllByText('Endret 05.03.2024 i Kontakt- og reservasjonsregisteret')).toHaveLength(2);
        expect(screen.queryByText('test@example.no')).not.toBeInTheDocument();
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
});
