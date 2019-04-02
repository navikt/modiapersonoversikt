import { DokumentAvsenderFilter } from '../../../../../redux/saksoversikt/types';
import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import { AppState } from '../../../../../redux/reducers';
import { AsyncDispatch } from '../../../../../redux/ThunkTypes';
import { oppdaterAvsenderfilter, settVisDokument } from '../../../../../redux/saksoversikt/actions';
import { connect } from 'react-redux';
import SaksDokumenter from './SaksDokumenter';

interface StateProps {
    avsenderFilter: DokumentAvsenderFilter;
    valgtSakstema?: Sakstema;
    erStandaloneVindu: boolean;
}

interface DispatchProps {
    oppdaterAvsenderfilter: (filter: Partial<DokumentAvsenderFilter>) => void;
    lukkDokument: () => void;
}

function mapStateToProps(state: AppState): StateProps {
    return {
        valgtSakstema: state.saksoversikt.valgtSakstema,
        avsenderFilter: state.saksoversikt.avsenderFilter,
        erStandaloneVindu: state.saksoversikt.erStandaloneVindu
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        oppdaterAvsenderfilter: (filter: Partial<DokumentAvsenderFilter>) => dispatch(oppdaterAvsenderfilter(filter)),
        lukkDokument: () => dispatch(settVisDokument(false))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SaksDokumenter);
