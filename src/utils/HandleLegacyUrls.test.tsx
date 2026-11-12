import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import HandleLegacyUrls from './HandleLegacyUrls';

const { search, navigate, settAktivBruker, mutate } = vi.hoisted(() => ({
    search: { current: {} as Record<string, string> },
    navigate: vi.fn(),
    settAktivBruker: vi.fn(),
    mutate: vi.fn()
}));

vi.mock('@tanstack/react-router', () => ({
    useSearch: () => search.current,
    useNavigate: () => navigate
}));
vi.mock('src/lib/hooks/useSettAktivBruker', () => ({
    useSettAktivBruker: () => settAktivBruker
}));
vi.mock('src/lib/clients/contextholder', () => ({
    useSetUserContext: () => ({ mutate })
}));
vi.mock('src/lib/clients/modiapersonoversikt-api', () => ({
    useOppgave: () => ({ data: undefined, isLoading: false })
}));
vi.mock('src/utils/analytics', () => ({ trackDyplenkeFraEksternKilde: vi.fn() }));

beforeEach(() => {
    vi.clearAllMocks();
    search.current = {};
});

it('ignorerer rått fødselsnummer i query uten å endre aktiv person', () => {
    search.current = { sokFnr: '00000000000' };
    render(<HandleLegacyUrls>Innhold</HandleLegacyUrls>);

    expect(screen.getByText('Innhold')).toBeInTheDocument();
    expect(settAktivBruker).not.toHaveBeenCalled();
    expect(mutate).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
});

it('bevarer trådvalg uten å bruke fødselsnummeret fra query', () => {
    search.current = { sokFnr: '00000000000', henvendelseId: 'dialog-1' };
    render(<HandleLegacyUrls>Innhold</HandleLegacyUrls>);

    expect(navigate).toHaveBeenCalledWith({
        to: '/person/meldinger',
        search: { traadId: 'dialog-1' },
        replace: true
    });
    expect(settAktivBruker).not.toHaveBeenCalled();
    expect(mutate).not.toHaveBeenCalled();
});

it('bevarer personvalg via kode som løses opp av backend', async () => {
    search.current = { sokFnrCode: 'personkode', sokFnr: '00000000000' };
    mutate.mockImplementation((_request, options) => options.onSuccess({ aktivBruker: '11111111111' }));
    render(<HandleLegacyUrls>Innhold</HandleLegacyUrls>);

    await waitFor(() => expect(settAktivBruker).toHaveBeenCalledWith('11111111111', false));
    expect(mutate).toHaveBeenCalledWith({ fnr: 'personkode', verdiType: 'FNR_KODE' }, expect.any(Object));
    expect(navigate).toHaveBeenCalledWith({ to: '/person/meldinger', replace: true });
});
