import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import OppgaverOversikt from './index';

vi.mock('@tanstack/react-router', () => ({
    Link: ({ children }: { children: ReactNode }) => <a href="/new/person/meldinger">{children}</a>
}));
vi.mock('src/lib/clients/modiapersonoversikt-api', () => ({
    useMeldinger: () => ({
        data: [
            {
                traadId: 'traad-1',
                temagruppe: 'HELSE',
                meldinger: [{ fritekst: 'Denne meldingsteksten skal ikke vises' }]
            }
        ],
        isLoading: false,
        isError: false
    }),
    usePersonOppgaver: () => ({
        data: [
            {
                oppgaveId: 'oppgave-1',
                traadId: 'traad-1',
                tema: 'SYK',
                oppgavetype: 'VUR_SVAR',
                prioritet: 'HOY',
                fristFerdigstillelse: '2026-10-01'
            }
        ],
        isLoading: false,
        isError: false
    }),
    useGsakTema: () => ({
        data: [{ kode: 'SYK', tekst: 'Sykepenger' }],
        isLoading: false,
        errorMessages: []
    })
}));

it('viser oppgavens tema og type uten meldingsinnhold eller tags', () => {
    render(<OppgaverOversikt />);
    expect(screen.getByRole('link', { name: 'Sykepenger – Vurder svar' })).toBeInTheDocument();
    expect(screen.getByText('Høy')).toBeInTheDocument();
    expect(screen.getByText('01.10.2026')).toBeInTheDocument();
    expect(screen.queryByText('Denne meldingsteksten skal ikke vises')).not.toBeInTheDocument();
    expect(screen.queryByText('Tildelt meg')).not.toBeInTheDocument();
    expect(screen.queryByText('Type:')).not.toBeInTheDocument();
});
