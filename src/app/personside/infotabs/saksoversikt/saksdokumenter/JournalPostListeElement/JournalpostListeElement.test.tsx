import { act, screen } from '@testing-library/react';
import { type Dokumentmetadata, FeilFeilmelding } from 'src/generated/modiapersonoversikt-api';
import { aremark } from 'src/mock/persondata/aremark';
import { getStaticMockSaksoOgDokumenter } from '../../../../../../mock/saksoversikt/saksoversikt-mock';
import { renderWithProviders } from '../../../../../../test/Testprovider';
import { getTestStore } from '../../../../../../test/testStore';
import { aggregertSakstemaV2 } from '../../utils/saksoversiktUtilsV2';
import JournalpostListeElementV2 from './JournalpostListeElementV2';

describe('JournalpostListeElementV2', () => {
    const staticSaksoversikt = getStaticMockSaksoOgDokumenter(aremark.personIdent);
    const valgtSakstema = aggregertSakstemaV2(staticSaksoversikt.temaer);

    it('Viser ikke-tilgang-ikon om journalpost har sikkerhetsbegrensning', async () => {
        const { testStore, journalposter } = lagStoreMedJustertDokumentMetadata({
            feil: {
                inneholderFeil: true,
                feilmelding: FeilFeilmelding.SIKKERHETSBEGRENSNING
            }
        });

        await act(() =>
            renderWithProviders(
                <JournalpostListeElementV2
                    journalpost={journalposter}
                    harTilgangTilSakstema={true}
                    valgtSakstema={valgtSakstema ?? undefined}
                />,
                testStore
            )
        );
        expect(screen.getByTestId('ikke-tilgang-ikon')).toBeInTheDocument();
    });

    it('Viser ikke-tilgang-ikon hvis ikke tilgang til sakstema', async () => {
        const { testStore, journalposter } = lagStoreMedJustertDokumentMetadata({});

        await act(() =>
            renderWithProviders(
                <JournalpostListeElementV2
                    valgtSakstema={valgtSakstema}
                    journalpost={journalposter}
                    harTilgangTilSakstema={false}
                />,
                testStore
            )
        );
        expect(screen.getByTestId('ikke-tilgang-ikon')).toBeInTheDocument();
    });

    it('Viser tilgang-ikon hvis tilgang til sakstema og ikke sikkerhetsbegrensning, selv om ikke tilgang til alle dokumenter', async () => {
        const hoveddokument = staticSaksoversikt.dokumenter[0].hoveddokument;
        const vedlegg = staticSaksoversikt.dokumenter[0].vedlegg[0];
        const { testStore, journalposter } = lagStoreMedJustertDokumentMetadata({
            feil: { inneholderFeil: false },
            hoveddokument: {
                ...hoveddokument,
                saksbehandlerHarTilgang: false
            },
            vedlegg: [
                {
                    ...vedlegg,
                    saksbehandlerHarTilgang: false
                }
            ]
        });

        await act(() =>
            renderWithProviders(
                <JournalpostListeElementV2
                    journalpost={journalposter}
                    harTilgangTilSakstema={true}
                    valgtSakstema={valgtSakstema}
                />,
                testStore
            )
        );

        expect(screen.getByTestId('dokument-ikon')).toBeInTheDocument();
    });

    it('Viser ikke-tilgang-ikon selv i "Alle" sakstemalisten', async () => {
        const { testStore, journalposter } = lagStoreMedJustertDokumentMetadata({
            feil: { inneholderFeil: false }
        });

        await act(() =>
            renderWithProviders(
                <JournalpostListeElementV2
                    journalpost={journalposter}
                    harTilgangTilSakstema={true}
                    valgtSakstema={valgtSakstema}
                />,
                testStore
            )
        );
        expect(screen.getByTestId('dokument-ikon')).toBeInTheDocument();
    });

    function lagStoreMedJustertDokumentMetadata(partialDok: Partial<Dokumentmetadata>) {
        const testStore = getTestStore();

        const dokumentResultat: Dokumentmetadata = {
            ...staticSaksoversikt.dokumenter[0],
            ...partialDok
        };

        return { testStore, journalposter: dokumentResultat };
    }
});
