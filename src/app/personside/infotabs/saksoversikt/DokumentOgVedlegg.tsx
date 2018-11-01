import * as React from 'react';
import { Dokument, DokumentMetadata } from '../../../../models/saksoversikt/dokumentmetadata';
import { TabsPure } from 'nav-frontend-tabs';
import AlertStripeAdvarsel from 'nav-frontend-alertstriper/lib/advarsel-alertstripe';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { TabProps } from 'nav-frontend-tabs/lib/tab';
import { getSaksdokument } from '../../../../utils/url-utils';
import { PersonContext } from '../../../App';

interface Props {
    dokument: DokumentMetadata;
    valgtTab: Dokument;
    harTilgang: boolean;
    onChange: (valgtDokument: Dokument) => void;
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 90vw;
  height: 90vh;
  object {
    flex-grow: 1;
  }
`;

const AlertWrapper = styled.div`
  padding: ${theme.margin.px40} ${theme.margin.px10};
`;

function VisDokumentContainer(props: { fødselsnummer: string, journalpostId: string, dokumentreferanse: string }) {
    const dokUrl = getSaksdokument(props.fødselsnummer, props.journalpostId, props.dokumentreferanse);
    console.log(`Prøver å laste ned ${dokUrl}`);
    return <object data={dokUrl} width={'100%'}/>;
}

function DokumentOgVedlegg(props: Props) {
    if (!props.harTilgang) {
        return (
            <AlertWrapper>
                <AlertStripeAdvarsel>Du har ikke tilgang til dokument.</AlertStripeAdvarsel>
            </AlertWrapper>
        );
    }

    const currentDok = props.valgtTab;
    const tabs = [props.dokument.hoveddokument, ...props.dokument.vedlegg];
    const tabProps: TabProps[] = tabs.map(tab => {
        return {
            label: tab.tittel,
            aktiv: tab === props.valgtTab
        };
    });

    return (
        <Content>
            <TabsPure
                tabs={tabProps}
                onChange={(event, index) => props.onChange(tabs[index])}
            />
            <PersonContext.Consumer>{fnr => {
                console.log('Dette fant jeg i contextholder: ', fnr);
                if (!fnr) {
                    return <AlertStripeAdvarsel>Fødselsnummer ikke satt i ContextProvider</AlertStripeAdvarsel>;
                }
                return (
                    <VisDokumentContainer
                        journalpostId={props.dokument.journalpostId}
                        dokumentreferanse={currentDok.dokumentreferanse}
                        fødselsnummer={fnr}
                    />
                );
            }
            }
            </PersonContext.Consumer>
        </Content>
    );
}

export default DokumentOgVedlegg;
