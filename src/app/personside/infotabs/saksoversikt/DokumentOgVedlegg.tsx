import * as React from 'react';
import { Dokument, DokumentMetadata } from '../../../../models/saksoversikt/dokumentmetadata';
import { TabsPure } from 'nav-frontend-tabs';
import AlertStripeAdvarsel from 'nav-frontend-alertstriper/lib/advarsel-alertstripe';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { TabProps } from 'nav-frontend-tabs/lib/tab';
import { getSaksdokument } from '../../../../utils/url-utils';
import { PersonContext } from '../../../App';
import { AppState } from '../../../../redux/reducers';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { settVisDokument } from '../../../../redux/saksoversikt/saksoversiktStateReducer';
import KnappBase from 'nav-frontend-knapper';

interface OwnProps {
    harTilgang: boolean;
    onChange: (valgtDokument: Dokument) => void;
}

interface StateProps {
    valgtDokument?: DokumentMetadata;
    valgtTab?: Dokument;
    visDokument: boolean;
}

interface DispatchProps {
    lukkDokument: () => void;
}

type Props = DispatchProps & StateProps & OwnProps;

const Content = styled.div`
  flex-grow: 1;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  object {
    flex-grow: 1;
  }
`;

const AlertWrapper = styled.div`
  padding: ${theme.margin.px40} ${theme.margin.px10};
`;

const Header = styled.div`
  position: relative;
  padding-right: 10rem;
`;

const KnappWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

function VisDokumentContainer(props: { fødselsnummer: string, journalpostId: string, dokumentreferanse: string }) {
    const dokUrl = getSaksdokument(props.fødselsnummer, props.journalpostId, props.dokumentreferanse);
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

    const {valgtDokument, valgtTab} = props;
    if (!valgtDokument || !valgtTab) {
        return (
            <AlertWrapper>
                <AlertStripeAdvarsel>Ingen dokument valgt.</AlertStripeAdvarsel>
            </AlertWrapper>
        );
    }

    const tabs = [valgtDokument.hoveddokument, ...valgtDokument.vedlegg];
    const tabProps: TabProps[] = tabs.map(tab => {
        return {
            label: tab.tittel,
            aktiv: tab === props.valgtTab
        };
    });

    return (
        <Content>
            <Header>
                <TabsPure
                    tabs={tabProps}
                    onChange={(event, index) => props.onChange(tabs[index])}
                />
                <KnappWrapper>
                    <KnappBase type="hoved" onClick={props.lukkDokument}>Lukk</KnappBase>
                </KnappWrapper>
            </Header>
            <PersonContext.Consumer>{fnr => {
                if (!fnr) {
                    return <AlertStripeAdvarsel>Fødselsnummer ikke satt i ContextProvider</AlertStripeAdvarsel>;
                }
                return (
                    <VisDokumentContainer
                        journalpostId={valgtDokument.journalpostId}
                        dokumentreferanse={valgtTab.dokumentreferanse}
                        fødselsnummer={fnr}
                    />
                );
            }}
            </PersonContext.Consumer>
        </Content>
    );
}

function mapStateToProps(state: AppState): StateProps {
    return ({
        visDokument: state.saksoversikt.visDokument,
        valgtDokument: state.saksoversikt.valgtDokument,
        valgtTab: state.saksoversikt.valgtEnkeltdokument
    });
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        lukkDokument: () => dispatch(settVisDokument(false))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DokumentOgVedlegg);
