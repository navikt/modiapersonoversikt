import { cleanup, render, screen, waitFor } from '@testing-library/react';
import type { OppgaveDto } from 'src/generated/modiapersonoversikt-api';
import { vi } from 'vitest';
import HandleLegacyUrls from './HandleLegacyUrls';
import { loggEvent } from './logger/frontendLogger';

const { search, location, navigate, settAktivBruker, mutate, oppgave } = vi.hoisted(() => ({
    search: { current: {} as Record<string, string> },
    location: { searchStr: undefined as string | undefined },
    navigate: vi.fn(),
    settAktivBruker: vi.fn(),
    mutate: vi.fn(),
    oppgave: { data: undefined as OppgaveDto | undefined, isLoading: false }
}));

vi.mock('@tanstack/react-router', () => ({
    useSearch: () => search.current,
    useNavigate: () => navigate,
    useLocation: ({ select }: { select: (location: { searchStr: string }) => boolean }) =>
        select({ searchStr: location.searchStr ?? new URLSearchParams(search.current).toString() })
}));
vi.mock('src/lib/hooks/useSettAktivBruker', () => ({
    useSettAktivBruker: () => settAktivBruker
}));
vi.mock('src/lib/clients/contextholder', () => ({
    useSetUserContext: () => ({ mutate })
}));
vi.mock('src/lib/clients/modiapersonoversikt-api', () => ({
    useOppgave: () => oppgave
}));
vi.mock('src/utils/analytics', () => ({ trackDyplenkeFraEksternKilde: vi.fn() }));
vi.mock('src/utils/logger/frontendLogger', () => ({ loggEvent: vi.fn() }));

beforeEach(() => {
    vi.clearAllMocks();
    mutate.mockReset();
    search.current = {};
    location.searchStr = undefined;
    oppgave.data = undefined;
    oppgave.isLoading = false;
});

afterEach(cleanup);

it.each(['sokFnr', 'fnr'])('logger rått fødselsnummer i %s uten persondata eller endret kontekst', (parameter) => {
    search.current = { [parameter]: '00000000000' };
    render(<HandleLegacyUrls>Innhold</HandleLegacyUrls>);

    expect(loggEvent).toHaveBeenCalledExactlyOnceWith('IgnorertFnrIUrl', 'HandleLegacyUrls');
    expect(screen.getByText('Innhold')).toBeInTheDocument();
    expect(settAktivBruker).not.toHaveBeenCalled();
    expect(mutate).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
});

it('logger ikke inngangslenker uten rått fødselsnummer', () => {
    search.current = { henvendelseId: 'dialog-1' };
    render(<HandleLegacyUrls>Innhold</HandleLegacyUrls>);

    expect(loggEvent).not.toHaveBeenCalled();
});

it('logger fødselsnummer som rutens søkeskjema har fjernet', () => {
    location.searchStr = '?sokFnr=00000000000';
    render(<HandleLegacyUrls>Innhold</HandleLegacyUrls>);

    expect(loggEvent).toHaveBeenCalledExactlyOnceWith('IgnorertFnrIUrl', 'HandleLegacyUrls');
    expect(mutate).not.toHaveBeenCalled();
    expect(settAktivBruker).not.toHaveBeenCalled();
});

it('logger én gang per inngangslenke også mens oppgaven lastes', () => {
    search.current = { sokFnr: '00000000000', oppgaveId: 'oppgave-1' };
    oppgave.isLoading = true;
    const view = render(<HandleLegacyUrls>Innhold</HandleLegacyUrls>);

    expect(loggEvent).toHaveBeenCalledExactlyOnceWith('IgnorertFnrIUrl', 'HandleLegacyUrls');
    oppgave.isLoading = false;
    view.rerender(<HandleLegacyUrls>Innhold</HandleLegacyUrls>);
    expect(loggEvent).toHaveBeenCalledTimes(1);
    expect(mutate).not.toHaveBeenCalled();
    expect(settAktivBruker).not.toHaveBeenCalled();

    search.current = {};
    view.rerender(<HandleLegacyUrls>Innhold</HandleLegacyUrls>);
    search.current = { sokFnr: '00000000000' };
    view.rerender(<HandleLegacyUrls>Innhold</HandleLegacyUrls>);
    expect(loggEvent).toHaveBeenCalledTimes(2);
});

it('bevarer trådvalg uten å bruke fødselsnummeret fra query', () => {
    search.current = { sokFnr: '00000000000', henvendelseId: 'dialog-1' };
    render(<HandleLegacyUrls>Innhold</HandleLegacyUrls>);

    expect(navigate).toHaveBeenCalledWith({
        to: '/new/person/meldinger',
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
    expect(navigate).toHaveBeenCalledWith({
        to: '/new/person/meldinger',
        search: { traadId: undefined },
        replace: true
    });
});

it.each(['henvendelseId', 'behandlingsId'])('åpner %s direkte i ny Modia', (parameter) => {
    search.current = { [parameter]: 'dialog-1' };
    render(<HandleLegacyUrls>Innhold</HandleLegacyUrls>);

    expect(navigate).toHaveBeenCalledExactlyOnceWith({
        to: '/new/person/meldinger',
        search: { traadId: 'dialog-1' },
        replace: true
    });
});

it('behandler inngangslenken bare én gang selv om oppslaget og rutens query endres', () => {
    search.current = { henvendelseId: 'dialog-1' };
    const view = render(<HandleLegacyUrls>Innhold</HandleLegacyUrls>);

    oppgave.isLoading = true;
    view.rerender(<HandleLegacyUrls>Innhold</HandleLegacyUrls>);
    search.current = {};
    oppgave.isLoading = false;
    view.rerender(<HandleLegacyUrls>Innhold</HandleLegacyUrls>);

    expect(navigate).toHaveBeenCalledExactlyOnceWith({
        to: '/new/person/meldinger',
        search: { traadId: 'dialog-1' },
        replace: true
    });
});

it.each<{ source: Record<string, string>; traadId?: string }>([
    { source: { sokFnrCode: 'personkode' }, traadId: undefined },
    { source: { sokFnrCode: 'personkode', henvendelseId: 'dialog-1' }, traadId: 'dialog-1' },
    {
        source: { sokFnrCode: 'personkode', oppgaveId: 'oppgave-1', behandlingsId: 'dialog-1' },
        traadId: 'dialog-1'
    }
])('bevarer personvalg og åpner ny meldingsrute med trådvalg $traadId', ({ source, traadId }) => {
    search.current = source;
    mutate.mockImplementation((_request, options) => options.onSuccess({ aktivBruker: '11111111111' }));
    render(<HandleLegacyUrls>Innhold</HandleLegacyUrls>);

    expect(settAktivBruker).toHaveBeenCalledExactlyOnceWith('11111111111', false);
    expect(screen.getByText('Innhold')).toBeInTheDocument();
    expect(navigate).toHaveBeenCalledExactlyOnceWith({
        to: '/new/person/meldinger',
        search: { traadId },
        replace: true
    });
});

it('venter på oppgaven og bevarer person og tråd i ny Modia', () => {
    search.current = { oppgaveId: 'oppgave-1' };
    oppgave.isLoading = true;
    const view = render(<HandleLegacyUrls>Innhold</HandleLegacyUrls>);

    expect(navigate).not.toHaveBeenCalled();
    expect(mutate).not.toHaveBeenCalled();
    oppgave.isLoading = false;
    oppgave.data = {
        oppgaveId: 'oppgave-1',
        fnr: '11111111111',
        traadId: 'dialog-1',
        erSTOOppgave: false,
        tildeltEnhetsnr: '1234',
        tema: 'AAP',
        oppgavetype: 'VUR',
        prioritet: 'NORM',
        status: 'AAPNET',
        aktivDato: '2026-01-01'
    };
    mutate.mockImplementation((_request, options) => options.onSuccess({ aktivBruker: '11111111111' }));
    view.rerender(<HandleLegacyUrls>Innhold</HandleLegacyUrls>);

    expect(mutate).toHaveBeenCalledWith({ fnr: '11111111111', verdiType: 'FNR' }, expect.any(Object));
    expect(settAktivBruker).toHaveBeenCalledExactlyOnceWith('11111111111', false);
    expect(navigate).toHaveBeenCalledExactlyOnceWith({
        to: '/new/person/meldinger',
        search: { traadId: 'dialog-1' },
        replace: true
    });
});
