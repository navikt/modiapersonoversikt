import * as React from 'react';
import DokumentListeElement from './DokumentListeElement';
import TestProvider from '../../../../../test/Testprovider';
import { saksoversiktActions } from '../../../../../redux/restReducers/saksoversikt';
import { getStaticMockSaksoversikt } from '../../../../../mock/saksoversikt/saksoversikt-mock';
import { getTestStore } from '../../../../../test/testStore';
import { SakstemaResponse } from '../../../../../models/saksoversikt/sakstema';
import { DokumentMetadata, Feilmelding } from '../../../../../models/saksoversikt/dokumentmetadata';
import { mount } from 'enzyme';
import DokumentIkkeTilgangIkon from '../../../../../svg/DokumentIkkeTilgangIkon';
import Dokument from '../../../../../svg/Dokument';

describe('DokumentListeElement', () => {
    const staticSaksoversikt = getStaticMockSaksoversikt();

    it('Viser ikke-tilgang-ikon om dokumentmetadata har sikkerhetsbegrensning', () => {
        const { testStore, dokumentMetadata: dokumentMetadata } = lagStoreMedJustertDokumentMetadata({
            feil: {
                inneholderFeil: true,
                feilmelding: Feilmelding.Sikkerhetsbegrensning
            }
        });

        const wrapper = mount(
            <TestProvider customStore={testStore}>
                <DokumentListeElement
                    dokumentMetadata={dokumentMetadata}
                    harTilgangTilSakstema={true}
                    sakstemakode={'SYK'}
                    sakstemanavn={'Sykepenger'}
                />
            </TestProvider>
        );
        expect(wrapper.find(DokumentIkkeTilgangIkon)).toHaveLength(1);
    });

    it('Viser ikke-tilgang-ikon hvis ikke tilgang til sakstema', () => {
        const { testStore, dokumentMetadata } = lagStoreMedJustertDokumentMetadata({});

        const wrapper = mount(
            <TestProvider customStore={testStore}>
                <DokumentListeElement
                    dokumentMetadata={dokumentMetadata}
                    harTilgangTilSakstema={false}
                    sakstemakode={'SYK'}
                    sakstemanavn={'Sykepenger'}
                />
            </TestProvider>
        );
        expect(wrapper.find(DokumentIkkeTilgangIkon)).toHaveLength(1);
    });

    it('Viser tilgang-ikon hvis tilgang til sakstema og ikke sikkerhetsbegrensning, selv om ikke tilgang til alle dokumenter', () => {
        const hoveddokument = staticSaksoversikt.resultat[0].dokumentMetadata[0].hoveddokument;
        const vedlegg = staticSaksoversikt.resultat[0].dokumentMetadata[0].vedlegg[0];
        const { testStore, dokumentMetadata } = lagStoreMedJustertDokumentMetadata({
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
                <DokumentListeElement
                    dokumentMetadata={dokumentMetadata}
                    harTilgangTilSakstema={true}
                    sakstemakode={'SYK'}
                    sakstemanavn={'Sykepenger'}
                />
            </TestProvider>
        );
        expect(wrapper.find(Dokument)).toHaveLength(1);
    });

    it('Viser ikke-tilgang-ikon selv i "Alle" sakstemalisten', () => {
        const { testStore, dokumentMetadata } = lagStoreMedJustertDokumentMetadata({
            feil: { inneholderFeil: false, feilmelding: null }
        });

        const wrapper = mount(
            <TestProvider customStore={testStore}>
                <DokumentListeElement
                    dokumentMetadata={dokumentMetadata}
                    harTilgangTilSakstema={true}
                    sakstemakode={'ALLE'}
                    sakstemanavn={'Alle tema'}
                />
            </TestProvider>
        );
        expect(wrapper.find(Dokument)).toHaveLength(1);
    });

    function lagStoreMedJustertDokumentMetadata(partialDok: Partial<DokumentMetadata>) {
        const staticMockSaksoversikt: SakstemaResponse = {
            ...staticSaksoversikt,
            resultat: [
                {
                    ...staticSaksoversikt.resultat[0],
                    dokumentMetadata: [
                        {
                            ...staticSaksoversikt.resultat[0].dokumentMetadata[0],
                            ...partialDok
                        }
                    ]
                }
            ]
        };
        const testStore = getTestStore();
        testStore.dispatch({ type: saksoversiktActions.FINISHED, data: staticMockSaksoversikt });

        const dokumentResultat: DokumentMetadata = {
            ...staticSaksoversikt.resultat[0].dokumentMetadata[0],
            ...partialDok
        };

        return { testStore, dokumentMetadata: dokumentResultat };
    }
});
