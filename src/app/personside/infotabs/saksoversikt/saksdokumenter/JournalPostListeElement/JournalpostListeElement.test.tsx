import { render, screen } from '@testing-library/react';
import { getStaticMockSaksoversiktV2 } from '../../../../../../mock/saksoversikt/saksoversikt-mock';
import { Feilmelding, type Journalpost } from '../../../../../../models/saksoversikt/journalpost';
import TestProvider from '../../../../../../test/Testprovider';
import { getTestStore } from '../../../../../../test/testStore';
import { aggregertSakstemaV2 } from '../../utils/saksoversiktUtilsV2';
import JournalpostListeElementV2 from './JournalpostListeElementV2';

describe('JournalpostListeElementV2', () => {
    const staticSaksoversikt = getStaticMockSaksoversiktV2();
    const valgtSakstema = aggregertSakstemaV2(staticSaksoversikt.resultat);

    it('Viser ikke-tilgang-ikon om journalpost har sikkerhetsbegrensning', () => {
        const { testStore, journalposter } = lagStoreMedJustertDokumentMetadata({
            feil: {
                inneholderFeil: true,
                feilmelding: Feilmelding.Sikkerhetsbegrensning
            }
        });

        render(
            <TestProvider customStore={testStore}>
                <JournalpostListeElementV2
                    journalpost={journalposter}
                    harTilgangTilSakstema={true}
                    valgtSakstema={valgtSakstema}
                />
            </TestProvider>
        );
        expect(screen.getByTestId('ikke-tilgang-ikon')).toBeInTheDocument();
    });

    it('Viser ikke-tilgang-ikon hvis ikke tilgang til sakstema', () => {
        const { testStore, journalposter } = lagStoreMedJustertDokumentMetadata({});

        render(
            <TestProvider customStore={testStore}>
                <JournalpostListeElementV2
                    valgtSakstema={valgtSakstema}
                    journalpost={journalposter}
                    harTilgangTilSakstema={false}
                />
            </TestProvider>
        );
        expect(screen.getByTestId('ikke-tilgang-ikon')).toBeInTheDocument();
    });

    it('Viser tilgang-ikon hvis tilgang til sakstema og ikke sikkerhetsbegrensning, selv om ikke tilgang til alle dokumenter', () => {
        const hoveddokument = staticSaksoversikt.resultat[0].dokumentMetadata[0].hoveddokument;
        const vedlegg = staticSaksoversikt.resultat[0].dokumentMetadata[0].vedlegg[0];
        const { testStore, journalposter } = lagStoreMedJustertDokumentMetadata({
            feil: { inneholderFeil: false, feilmelding: null },
            hoveddokument: {
                ...hoveddokument,
                kanVises: false
            },
            vedlegg: [
                {
                    ...vedlegg,
                    kanVises: false
                }
            ]
        });

        render(
            <TestProvider customStore={testStore}>
                <JournalpostListeElementV2
                    journalpost={journalposter}
                    harTilgangTilSakstema={true}
                    valgtSakstema={valgtSakstema}
                />
            </TestProvider>
        );

        expect(screen.getByTestId('dokument-ikon')).toBeInTheDocument();
    });

    it('Viser ikke-tilgang-ikon selv i "Alle" sakstemalisten', () => {
        const { testStore, journalposter } = lagStoreMedJustertDokumentMetadata({
            feil: { inneholderFeil: false, feilmelding: null }
        });

        render(
            <TestProvider customStore={testStore}>
                <JournalpostListeElementV2
                    journalpost={journalposter}
                    harTilgangTilSakstema={true}
                    valgtSakstema={valgtSakstema}
                />
            </TestProvider>
        );
        expect(screen.getByTestId('dokument-ikon')).toBeInTheDocument();
    });

    function lagStoreMedJustertDokumentMetadata(partialDok: Partial<Journalpost>) {
        const testStore = getTestStore();

        const dokumentResultat: Journalpost = {
            ...staticSaksoversikt.resultat[0].dokumentMetadata[0],
            ...partialDok
        };

        return { testStore, journalposter: dokumentResultat };
    }
});
