import * as React from 'react';
import { getSaksdokument } from '../../../../utils/url-utils';
import { AppState } from '../../../../redux/reducers';
import { Person } from '../../../../models/person/person';
import { connect } from 'react-redux';

interface OwnProps {
    journalpostId: string;
    dokumentreferanse: string;
}

interface StateProps {
    fødselsnummer: string;
}

type Props = OwnProps & StateProps;

function VisDokumentContainer({fødselsnummer, journalpostId, dokumentreferanse}: Props) {
    const dokUrl = getSaksdokument(fødselsnummer, journalpostId, dokumentreferanse);
    console.log(`Prøver å laste ned ${dokUrl}`);
    return <object data={dokUrl} width={'100%'}/>;
}

function mapStateToProps(state: AppState): StateProps {
    return {
        fødselsnummer: (state.restEndepunkter.personinformasjon.data as Person).fødselsnummer
    };
}

export default connect(mapStateToProps)(VisDokumentContainer);
