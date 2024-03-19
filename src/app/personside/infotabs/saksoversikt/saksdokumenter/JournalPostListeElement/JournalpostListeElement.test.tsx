import * as React from 'react';
import TestProvider from '../../../../../../test/Testprovider';
import { getStaticMockSaksoversiktV2 } from '../../../../../../mock/saksoversikt/saksoversikt-mock';
import { getTestStore } from '../../../../../../test/testStore';
import { Journalpost, Feilmelding } from '../../../../../../models/saksoversikt/journalpost';
import { mount } from 'enzyme';
import DokumentIkkeTilgangIkon from '../../../../../../svg/DokumentIkkeTilgangIkon';
import DokumentIkon from '../../../../../../svg/DokumentIkon';
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

        const wrapper = mount(
            <TestProvider customStore={testStore}>
                <JournalpostListeElementV2
                    journalpost={journalposter}
                    harTilgangTilSakstema={true}
                    valgtSakstema={valgtSakstema}
                />
            </TestProvider>
        );
        expect(wrapper.find(DokumentIkkeTilgangIkon)).toHaveLength(1);
    });

    it('Viser ikke-tilgang-ikon hvis ikke tilgang til sakstema', () => {
        const { testStore, journalposter } = lagStoreMedJustertDokumentMetadata({});

        const wrapper = mount(
            <TestProvider customStore={testStore}>
                <JournalpostListeElementV2
                    valgtSakstema={valgtSakstema}
                    journalpost={journalposter}
                    harTilgangTilSakstema={false}
                />
            </TestProvider>
        );
        expect(wrapper.find(DokumentIkkeTilgangIkon)).toHaveLength(1);
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

        const wrapper = mount(
            <TestProvider customStore={testStore}>
                <JournalpostListeElementV2
                    journalpost={journalposter}
                    harTilgangTilSakstema={true}
                    valgtSakstema={valgtSakstema}
                />
            </TestProvider>
        );
        expect(wrapper.find(DokumentIkon)).toHaveLength(1);
    });

    it('Viser ikke-tilgang-ikon selv i "Alle" sakstemalisten', () => {
        const { testStore, journalposter } = lagStoreMedJustertDokumentMetadata({
            feil: { inneholderFeil: false, feilmelding: null }
        });

        const wrapper = mount(
            <TestProvider customStore={testStore}>
                <JournalpostListeElementV2
                    journalpost={journalposter}
                    harTilgangTilSakstema={true}
                    valgtSakstema={valgtSakstema}
                />
            </TestProvider>
        );
        expect(wrapper.find(DokumentIkon)).toHaveLength(1);
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
