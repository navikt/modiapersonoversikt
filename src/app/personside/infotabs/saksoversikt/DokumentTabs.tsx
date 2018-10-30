import * as React from 'react';
import { Dokument, DokumentMetadata } from '../../../../models/saksoversikt/dokumentmetadata';
import { TabsPure } from 'nav-frontend-tabs';
import { getSaksdokument } from '../../../../utils/url-utils';
import AlertStripeAdvarsel from 'nav-frontend-alertstriper/lib/advarsel-alertstripe';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { TabProps } from 'nav-frontend-tabs/lib/tab';

interface Props {
    dokument: DokumentMetadata;
    valgtTab: Dokument;
    harTilgang: boolean;
    onChange: (valgtDokument: Dokument) => void;
}

const Content = styled.div`
  padding: 1rem;
  height: 90vh;
  width: 90vw;
  object {
    box-shadow: 0 0 2rem #888;
  }
`;

const AlertWrapper = styled.div`
  padding: ${theme.margin.px40} ${theme.margin.px10};
`;

function visDokument(journalpostId: string, dokumentreferanse: string) {
    const dokUrl = getSaksdokument(journalpostId, dokumentreferanse);
    console.log(`Prøver å laste ned ${dokUrl}`);
    return <object data={dokUrl} width={'100%'}/>;
}

function DokumentTabs(props: Props) {
    const currentDok = props.valgtTab;
    const tabs = [props.dokument.hoveddokument, ...props.dokument.vedlegg];
    if (!props.harTilgang) {
        return (
            <AlertWrapper>
                <AlertStripeAdvarsel>Du har ikke tilgang til dokument.</AlertStripeAdvarsel>
            </AlertWrapper>
        );
    }
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
            {visDokument(props.dokument.journalpostId, currentDok.dokumentreferanse)}
        </Content>
    );
}

export default DokumentTabs;
