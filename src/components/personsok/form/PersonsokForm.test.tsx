import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { PersonsokRequest } from 'src/lib/types/modiapersonoversikt-api';
import { vi } from 'vitest';
import { PersonsokForm } from './index';
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
