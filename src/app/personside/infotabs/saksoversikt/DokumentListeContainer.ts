import { DokumentAvsenderFilter } from '../../../../redux/saksoversikt/types';
import { Sakstema } from '../../../../models/saksoversikt/sakstema';
import { AppState } from '../../../../redux/reducers';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import { oppdaterAvsenderfilter } from '../../../../redux/saksoversikt/actions';
import { connect } from 'react-redux';
import DokumentListe from './DokumentListe';

interface StateProps {
    avsenderFilter: DokumentAvsenderFilter;
    valgtSakstema?: Sakstema;
}

interface DispatchProps {
    oppdaterAvsenderfilter: (filter: Partial<DokumentAvsenderFilter>) => void;
}

function mapStateToProps(state: AppState): StateProps {
    return ({
        valgtSakstema: state.saksoversikt.valgtSakstema,
        avsenderFilter: state.saksoversikt.avsenderFilter
    });
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        oppdaterAvsenderfilter: (filter: Partial<DokumentAvsenderFilter>) =>
            dispatch(oppdaterAvsenderfilter(filter))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DokumentListe);