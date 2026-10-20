import { FaroErrorBoundary } from '@grafana/faro-react';
import { render, screen } from '@testing-library/react';
import { TraadDetail } from './index';

const mockRouteState = vi.hoisted(() => ({ traadId: 'A' }));

vi.mock('@tanstack/react-router', () => ({
    getRouteApi: () => ({
        useSearch: () => mockRouteState,
        useNavigate: () => vi.fn()
    })
}));

vi.mock('src/components/Meldinger/List/utils', () => ({
    useFilterMeldinger: () => [
        { traadId: 'A', journalposter: [], meldinger: [] },
        { traadId: 'B', journalposter: [], meldinger: [] }
    ],
    useTraader: () => ({ isLoading: false }),
    nyesteMelding: () => ({
        avsluttetDato: undefined,
        skrevetAvTekst: undefined,
        markertSomFeilsendtAv: undefined,
        ferdigstiltDato: undefined,
        sendtTilSladding: undefined
    }),
    saksbehandlerTekst: () => '',
    traadKanBesvares: () => false
}));

vi.mock('src/components/Meldinger/Detail/MeldingActionMenu', () => ({
    MeldingActionMenu: ({ traad }: { traad: { traadId: string } }) => {
        if (traad.traadId === 'A') {
            throw new Error('Syntetisk feil');
        }
        return <span>Frisk detaljvisning</span>;
    }
}));

vi.mock('src/components/Meldinger/Detail/Journalposter', () => ({ Journalposter: () => null }));
vi.mock('src/components/Meldinger/Detail/TraadOppgaver', () => ({ TraadOppgaver: () => null }));
vi.mock('src/components/Meldinger/Detail/Meldinger', () => ({ Meldinger: () => null }));

it('resetter feilgrensen når valgt tråd endres og viser ny tråd', () => {
    const reportError = vi.spyOn(FaroErrorBoundary.prototype, 'componentDidCatch').mockImplementation(() => {});

    try {
        const { rerender } = render(<TraadDetail />);

        expect(screen.getByText('Det oppstod en feil under visning av melding detaljer')).toBeInTheDocument();

        mockRouteState.traadId = 'B';
        rerender(<TraadDetail />);

        expect(screen.queryByText('Det oppstod en feil under visning av melding detaljer')).not.toBeInTheDocument();
        expect(screen.getByText('Frisk detaljvisning')).toBeInTheDocument();
        expect(reportError).toHaveBeenCalledTimes(1);
    } finally {
        reportError.mockRestore();
        mockRouteState.traadId = 'A';
    }
});
