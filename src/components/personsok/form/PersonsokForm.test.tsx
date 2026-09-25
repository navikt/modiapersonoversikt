import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { PersonsokRequest } from 'src/lib/types/modiapersonoversikt-api';
import { vi } from 'vitest';
import { DATO_FEILTEKST, DATO_REKKEFOLGE_FEIL, PersonsokForm } from './index';
import { trimInput } from './utils';

vi.mock('./LenkeDrekV2', () => ({
    default: () => null
}));

async function fyllUtOgSok(felt: string, verdi: string) {
    const onSubmit = vi.fn<(value: PersonsokRequest | undefined) => void>();
    render(<PersonsokForm onSubmit={onSubmit} onReset={vi.fn()} />);

    await userEvent.type(screen.getByLabelText(felt), verdi);
    await userEvent.click(screen.getByRole('button', { name: /Søk ny person/ }));

    return onSubmit;
}

describe('PersonsokForm', () => {
    test('sender kun fornavn når bare fornavn er fylt ut', async () => {
        const onSubmit = await fyllUtOgSok('Fornavn', 'Ola');

        expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ fornavn: 'Ola', etternavn: undefined }));
    });

    test('sender kun etternavn når bare etternavn er fylt ut', async () => {
        const onSubmit = await fyllUtOgSok('Etternavn', 'Aremark');

        expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ fornavn: undefined, etternavn: 'Aremark' }));
    });

    test('sender begge feltene når begge er fylt ut', async () => {
        const onSubmit = vi.fn<(value: PersonsokRequest | undefined) => void>();
        render(<PersonsokForm onSubmit={onSubmit} onReset={vi.fn()} />);

        await userEvent.type(screen.getByLabelText('Fornavn'), 'Ola');
        await userEvent.type(screen.getByLabelText('Etternavn'), 'Aremark');
        await userEvent.click(screen.getByRole('button', { name: /Søk ny person/ }));

        expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ fornavn: 'Ola', etternavn: 'Aremark' }));
    });

    test('søker ikke når ingen av feltene i gruppen er fylt ut', async () => {
        const onSubmit = await fyllUtOgSok('Alder fra', '30');

        expect(onSubmit).not.toHaveBeenCalled();
    });

    test('trimmer bort mellomrom rundt søkeverdien', async () => {
        const onSubmit = await fyllUtOgSok('Etternavn', '  Aremark  ');

        expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ etternavn: 'Aremark' }));
    });

    test('søker ikke når feltet kun inneholder mellomrom', async () => {
        const onSubmit = await fyllUtOgSok('Fornavn', '   ');

        expect(onSubmit).not.toHaveBeenCalled();
    });
});

// setupTests setter systemtiden til 1970, og DateInput tillater ikke datoer frem i tid.
describe('PersonsokForm med fødselsdato', () => {
    async function skrivDato(felt: 'Fødselsdato fra' | 'Fødselsdato til', dato: string) {
        await userEvent.type(screen.getByLabelText(felt), dato);
        await userEvent.tab();
    }

    function renderSkjema() {
        const onSubmit = vi.fn<(value: PersonsokRequest | undefined) => void>();
        render(<PersonsokForm onSubmit={onSubmit} onReset={vi.fn()} />);
        return onSubmit;
    }

    const sok = () => userEvent.click(screen.getByRole('button', { name: /Søk ny person/ }));

    test('sender søk med bare fødselsdato når både fra og til er fylt ut', async () => {
        const onSubmit = renderSkjema();

        await skrivDato('Fødselsdato fra', '01.01.1960');
        await skrivDato('Fødselsdato til', '31.01.1960');
        await sok();

        expect(onSubmit).toHaveBeenCalledWith(
            expect.objectContaining({
                fornavn: undefined,
                etternavn: undefined,
                fodselsdatoFra: '1960-01-01',
                fodselsdatoTil: '1960-01-31'
            })
        );
    });

    test('søker ikke og ber om til-dato når bare fødselsdato fra er fylt ut', async () => {
        const onSubmit = renderSkjema();

        await skrivDato('Fødselsdato fra', '01.01.1960');
        await sok();

        expect(onSubmit).not.toHaveBeenCalled();
        expect(screen.getByText('Fyll ut fødselsdato til')).toBeInTheDocument();
        expect(screen.queryByText('Fyll ut fødselsdato fra')).not.toBeInTheDocument();
    });

    test('søker ikke og ber om fra-dato når bare fødselsdato til er fylt ut', async () => {
        const onSubmit = renderSkjema();

        await skrivDato('Fødselsdato til', '31.01.1960');
        await sok();

        expect(onSubmit).not.toHaveBeenCalled();
        expect(screen.getByText('Fyll ut fødselsdato fra')).toBeInTheDocument();
        expect(screen.queryByText('Fyll ut fødselsdato til')).not.toBeInTheDocument();
    });

    test('sender søk med navn og bare én fødselsdato', async () => {
        const onSubmit = renderSkjema();

        await userEvent.type(screen.getByLabelText('Fornavn'), 'Ola');
        await skrivDato('Fødselsdato fra', '01.01.1960');
        await sok();

        expect(onSubmit).toHaveBeenCalledWith(
            expect.objectContaining({ fornavn: 'Ola', fodselsdatoFra: '1960-01-01', fodselsdatoTil: undefined })
        );
    });

    test('viser feil på til-dato når navnet fjernes etter at fra-dato er fylt ut', async () => {
        renderSkjema();

        await userEvent.type(screen.getByLabelText('Fornavn'), 'Ola');
        await skrivDato('Fødselsdato fra', '01.01.1960');
        await userEvent.clear(screen.getByLabelText('Fornavn'));

        expect(screen.getByText('Fyll ut fødselsdato til')).toBeInTheDocument();
    });

    test('viser egen feil for dato frem i tid', async () => {
        const onSubmit = renderSkjema();

        await skrivDato('Fødselsdato fra', '01.01.1980');
        await skrivDato('Fødselsdato til', '31.01.1980');
        await sok();

        expect(onSubmit).not.toHaveBeenCalled();
        expect(screen.getAllByText(DATO_FEILTEKST.fremtid)).toHaveLength(2);
        expect(screen.queryByText('Fyll ut fødselsdato fra')).not.toBeInTheDocument();
    });

    test('viser egen feil for dato før 01.01.1900', async () => {
        renderSkjema();

        await skrivDato('Fødselsdato fra', '31.12.1899');

        expect(screen.getByText(DATO_FEILTEKST.forTidlig)).toBeInTheDocument();
        expect(DATO_FEILTEKST.forTidlig).toBe('Datoen kan ikke være før 01.01.1900');
    });

    test('godtar 01.01.1900 som tidligste dato', async () => {
        const onSubmit = renderSkjema();

        await skrivDato('Fødselsdato fra', '01.01.1900');
        await skrivDato('Fødselsdato til', '31.01.1900');
        await sok();

        expect(onSubmit).toHaveBeenCalledWith(
            expect.objectContaining({ fodselsdatoFra: '1900-01-01', fodselsdatoTil: '1900-01-31' })
        );
    });

    test('viser egen feil for ugyldig dato', async () => {
        renderSkjema();

        await skrivDato('Fødselsdato til', '32.13.1960');

        expect(screen.getByText(DATO_FEILTEKST.ugyldig)).toBeInTheDocument();
    });

    test('viser ikke formatfeil mens brukeren skriver', async () => {
        renderSkjema();

        await userEvent.type(screen.getByLabelText('Fødselsdato fra'), '01.0');

        expect(screen.queryByText(DATO_FEILTEKST.ugyldig)).not.toBeInTheDocument();
    });

    test('viser feil når fødselsdato til er før fødselsdato fra', async () => {
        const onSubmit = renderSkjema();

        await skrivDato('Fødselsdato fra', '31.01.1960');
        await skrivDato('Fødselsdato til', '01.01.1960');
        await sok();

        expect(onSubmit).not.toHaveBeenCalled();
        expect(screen.getByText(DATO_REKKEFOLGE_FEIL)).toBeInTheDocument();
    });

    test('søker ikke med ugyldig dato selv om navn er fylt ut', async () => {
        const onSubmit = renderSkjema();

        await userEvent.type(screen.getByLabelText('Fornavn'), 'Ola');
        await skrivDato('Fødselsdato fra', '01.01.1980');
        await sok();

        expect(onSubmit).not.toHaveBeenCalled();
        expect(screen.getByText(DATO_FEILTEKST.fremtid)).toBeInTheDocument();
    });

    test('Resett tømmer ugyldig dato og feilmeldingen', async () => {
        renderSkjema();

        await skrivDato('Fødselsdato fra', '01.01.1980');
        await userEvent.click(screen.getByRole('button', { name: 'Resett' }));

        expect(screen.getByLabelText('Fødselsdato fra')).toHaveValue('');
        expect(screen.queryByText(DATO_FEILTEKST.fremtid)).not.toBeInTheDocument();
    });
});

describe('trimInput', () => {
    test('trimmer bort mellomrom rundt verdien', () => {
        expect(trimInput('  Aremark  ')).toBe('Aremark');
    });

    test('gir undefined for tom streng og bare mellomrom', () => {
        expect(trimInput('')).toBeUndefined();
        expect(trimInput('   ')).toBeUndefined();
        expect(trimInput(undefined)).toBeUndefined();
    });
});
