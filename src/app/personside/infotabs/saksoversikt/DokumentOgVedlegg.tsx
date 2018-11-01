import * as React from 'react';
import { Dokument, DokumentMetadata } from '../../../../models/saksoversikt/dokumentmetadata';
import { TabsPure } from 'nav-frontend-tabs';
import AlertStripeAdvarsel from 'nav-frontend-alertstriper/lib/advarsel-alertstripe';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { TabProps } from 'nav-frontend-tabs/lib/tab';
import VisDokumentContainer from './VisDokumentContainer';

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
            <VisDokumentContainer
                journalpostId={props.dokument.journalpostId}
                dokumentreferanse={currentDok.dokumentreferanse}
            />
        </Content>
    );
}

export default DokumentOgVedlegg;
