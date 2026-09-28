import { fireEvent, render, screen, within } from '@testing-library/react';
import { aremark } from 'src/mock/persondata/aremark';
import { vi } from 'vitest';
import Flytting from './Flytting';

const { usePersonDataMock } = vi.hoisted(() => ({
    usePersonDataMock: vi.fn()
}));

vi.mock('src/lib/clients/modiapersonoversikt-api', () => ({
    usePersonData: usePersonDataMock
}));

describe('Flytting', () => {
    it('viser innenlands- og utenlandsflytting med nyeste flytting øverst', () => {
        usePersonDataMock.mockReturnValue({
            data: {
                person: {
                    ...aremark,
                    innflyttingTilNorge: [
                        {
                            fraflyttingsland: 'Sverige',
                            gyldighetsPeriode: {
                                gyldigFraOgMed: '2020-01-01',
                                gyldigTilOgMed: '2024-12-31'
                            }
                        }
                    ],
                    utflyttingFraNorge: [
                        {
                            tilflyttingsland: 'Danmark',
                            utflyttingsdato: '2025-01-01',
                            gyldighetsPeriode: {
                                gyldigFraOgMed: '2025-01-01',
                                gyldigTilOgMed: null
                            }
                        }
                    ]
                }
            }
        });

        render(<Flytting />);

        fireEvent.click(screen.getByRole('button', { name: 'Bosteder' }));
        const innenlandsflytting = screen.getByRole('table', { name: 'Bosteder' });
        const innenlandsrader = within(innenlandsflytting).getAllByRole('row');
        const innenlandsoverskrifter = within(innenlandsflytting)
            .getAllByRole('columnheader')
            .map((overskrift) => overskrift.textContent);

        expect(innenlandsoverskrifter).toEqual([
            'Ny adresse',
            'Angitt flyttedato',
            'Sist endret',
            'Kilde',
            'Gyldig fra',
            'Gyldig til'
        ]);
        expect(within(innenlandsrader[1]).getByText('Islandsgate 49')).toBeInTheDocument();
        expect(within(innenlandsrader[2]).getByText('Aremarkveien 7')).toBeInTheDocument();
        expect(within(innenlandsflytting).queryByText('Norge')).not.toBeInTheDocument();
        expect(within(innenlandsflytting).getByRole('columnheader', { name: 'Angitt flyttedato' })).toBeInTheDocument();
        expect(within(innenlandsflytting).getByRole('columnheader', { name: 'Sist endret' })).toBeInTheDocument();
        expect(within(innenlandsflytting).getByRole('columnheader', { name: 'Kilde' })).toBeInTheDocument();
        expect(within(innenlandsrader[1]).getByText('Folkeregisteret / Bruker')).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /Inn- og utflytting/i }));
        const utenlandsflytting = screen.getByRole('table', { name: 'Inn- og Utflytting' });

        expect(within(utenlandsflytting).getByRole('columnheader', { name: 'Fra' })).toBeInTheDocument();
        expect(within(utenlandsflytting).getByRole('columnheader', { name: 'Til' })).toBeInTheDocument();
        expect(within(utenlandsflytting).getByRole('columnheader', { name: 'Dato' })).toBeInTheDocument();
        expect(within(utenlandsflytting).getByRole('columnheader', { name: 'Gyldig fra' })).toBeInTheDocument();
        expect(within(utenlandsflytting).getByRole('columnheader', { name: 'Gyldig til' })).toBeInTheDocument();
        const utenlandsrader = within(utenlandsflytting).getAllByRole('row');
        expect(within(utenlandsrader[1]).getAllByRole('cell')[0]).toHaveTextContent('Norge');
        expect(within(utenlandsrader[1]).getAllByRole('cell')[1]).toHaveTextContent('Danmark');
        expect(within(utenlandsrader[1]).getAllByRole('cell')[2]).toHaveTextContent('01.01.2025');
        expect(within(utenlandsrader[2]).getAllByRole('cell')[0]).toHaveTextContent('Sverige');
        expect(within(utenlandsrader[2]).getAllByRole('cell')[1]).toHaveTextContent('Norge');
    });
});
