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
                            },
                            sistEndret: {
                                tidspunkt: '2024-04-05T10:15:30',
                                ident: 'Folkeregisteret',
                                system: 'folkeregisteret',
                                kilde: 'bruker'
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
                            },
                            sistEndret: {
                                tidspunkt: '2025-02-06T10:15:30',
                                ident: 'Folkeregisteret',
                                system: 'folkeregisteret',
                                kilde: 'bruker'
                            }
                        }
                    ]
                }
            }
        });

        render(<Flytting />);

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(screen.queryByRole('table')).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Bosteder' }));
        const bostederDialog = screen.getByRole('dialog', { name: 'Bosteder' });
        const innenlandsflytting = within(bostederDialog).getByRole('table', { name: 'Bosteder' });
        expect(within(bostederDialog).getAllByRole('table')).toHaveLength(1);
        expect(within(bostederDialog).queryByRole('region')).not.toBeInTheDocument();
        expect(innenlandsflytting.parentElement).not.toHaveAttribute('tabindex');
        expect(innenlandsflytting).toHaveAttribute('tabindex', '0');
        const innenlandsrader = within(innenlandsflytting).getAllByRole('row');
        const innenlandsoverskrifter = within(innenlandsflytting)
            .getAllByRole('columnheader')
            .map((overskrift) => overskrift.textContent);

        expect(innenlandsoverskrifter).toEqual([
            'Ny adresse',
            'Angitt flyttedato til ny bolig',
            'Kilde',
            'Gyldig fra',
            'Gyldig til',
            'Sist endret'
        ]);
        expect(within(innenlandsrader[1]).getByText('Islandsgate 49')).toBeInTheDocument();
        expect(within(innenlandsrader[2]).getByText('Aremarkveien 7')).toBeInTheDocument();
        expect(within(innenlandsflytting).queryByText('Norge')).not.toBeInTheDocument();
        expect(
            within(innenlandsflytting).getByRole('columnheader', { name: 'Angitt flyttedato til ny bolig' })
        ).toBeInTheDocument();
        expect(within(innenlandsflytting).getByRole('columnheader', { name: 'Sist endret' })).toBeInTheDocument();
        expect(within(innenlandsflytting).getByRole('columnheader', { name: 'Kilde' })).toBeInTheDocument();
        expect(within(innenlandsrader[1]).getByText('Folkeregisteret / Bruker')).toBeInTheDocument();
        expect(within(innenlandsrader[1]).getAllByRole('cell')[4]).toHaveTextContent('01.10.2021');

        fireEvent.click(within(bostederDialog).getByRole('button', { name: /lukk/i }));
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(screen.queryByRole('table')).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Inn- og utflytting Norge' }));
        const utenlandsDialog = screen.getByRole('dialog', { name: 'Inn- og utflytting Norge' });
        const utenlandsflytting = within(utenlandsDialog).getByRole('table', { name: 'Inn- og Utflytting' });
        expect(within(utenlandsDialog).getAllByRole('table')).toHaveLength(1);
        expect(within(utenlandsDialog).queryByRole('region')).not.toBeInTheDocument();
        expect(utenlandsflytting.parentElement).not.toHaveAttribute('tabindex');
        expect(utenlandsflytting).toHaveAttribute('tabindex', '0');
        expect(within(utenlandsDialog).queryByRole('table', { name: 'Bosteder' })).not.toBeInTheDocument();

        expect(
            within(utenlandsflytting)
                .getAllByRole('columnheader')
                .map((overskrift) => overskrift.textContent)
        ).toEqual(['Fra - Til', 'Dato', 'Gyldig fra', 'Gyldig til', 'Sist endret']);
        const utenlandsrader = within(utenlandsflytting).getAllByRole('row');
        expect(within(utenlandsrader[1]).getByRole('rowheader', { name: 'Norge - Danmark' })).toHaveAttribute(
            'scope',
            'row'
        );
        expect(within(utenlandsrader[1]).getAllByRole('cell')[0]).toHaveTextContent('01.01.2025');
        expect(within(utenlandsrader[1]).getAllByRole('cell')[3]).toHaveTextContent('06.02.2025');
        expect(within(utenlandsrader[2]).getByRole('rowheader', { name: 'Sverige - Norge' })).toHaveAttribute(
            'scope',
            'row'
        );
        expect(within(utenlandsrader[2]).getAllByRole('cell')[3]).toHaveTextContent('05.04.2024');
    });

    it('viser en stedfortreder når inn- og utflytting til Norge mangler', () => {
        usePersonDataMock.mockReturnValue({
            data: {
                person: {
                    ...aremark,
                    innflyttingTilNorge: [],
                    utflyttingFraNorge: []
                }
            }
        });

        render(<Flytting />);

        fireEvent.click(screen.getByRole('button', { name: 'Inn- og utflytting Norge' }));

        const dialog = screen.getByRole('dialog', { name: 'Inn- og utflytting Norge' });
        expect(within(dialog).getByText('Ingen inn- og utflytting til Norge')).toBeInTheDocument();
        expect(screen.queryByRole('table', { name: 'Inn- og Utflytting' })).not.toBeInTheDocument();
    });

    it('viser en stedfortreder når alle flyttedata mangler', () => {
        usePersonDataMock.mockReturnValue({
            data: {
                person: {
                    ...aremark,
                    historiskeBostedAdresser: [],
                    innflyttingTilNorge: [],
                    utflyttingFraNorge: []
                }
            }
        });

        render(<Flytting />);

        expect(screen.getByText('Ingen info om flytting og bostedsadresser')).toBeInTheDocument();
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('skjuler Bosteder når historiske adresser mangler', () => {
        usePersonDataMock.mockReturnValue({
            data: {
                person: {
                    ...aremark,
                    historiskeBostedAdresser: [],
                    innflyttingTilNorge: [{ fraflyttingsland: 'Sverige' }],
                    utflyttingFraNorge: []
                }
            }
        });

        render(<Flytting />);

        expect(screen.queryByRole('button', { name: 'Bosteder' })).not.toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Inn- og utflytting Norge' }));
        const dialog = screen.getByRole('dialog', { name: 'Inn- og utflytting Norge' });
        expect(within(dialog).getByRole('table', { name: 'Inn- og Utflytting' })).toBeInTheDocument();
    });

    it('viser ingenting uten persondata', () => {
        usePersonDataMock.mockReturnValue({ data: undefined });

        const { container } = render(<Flytting />);

        expect(container).toBeEmptyDOMElement();
    });
});
