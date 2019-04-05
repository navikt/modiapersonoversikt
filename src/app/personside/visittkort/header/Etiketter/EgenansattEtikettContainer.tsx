import * as React from 'react';
import { DeprecatedRestResource } from '../../../../../redux/restReducers/deprecatedRestResource';
import { Egenansatt } from '../../../../../models/egenansatt';
import { AppState } from '../../../../../redux/reducers';
import { connect } from 'react-redux';
import EtikettBase from 'nav-frontend-etiketter';
import PlukkRestDataDeprecated from '../../../infotabs/ytelser/pleiepenger/PlukkRestDataDeprecated';
import LazySpinner from '../../../../../components/LazySpinner';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import ErrorBoundary from '../../../../../components/ErrorBoundary';

interface StateProps {
    egenAnsattResource: DeprecatedRestResource<Egenansatt>;
}

function EgenansattEtikett(props: { erEgenansatt: boolean }) {
    if (!props.erEgenansatt) {
        return null;
    }
    return <EtikettBase type={'advarsel'}>Egen ansatt</EtikettBase>;
}

function EgenAnsattEtikettContainer(props: StateProps) {
    return (
        <ErrorBoundary boundaryName="EgenansattEtikett">
            <PlukkRestDataDeprecated
                restResource={props.egenAnsattResource}
                returnOnPending={<LazySpinner type="S" />}
                returnOnError={<AlertStripeAdvarsel>Kunne ikke sjekke om bruker er egenansatt</AlertStripeAdvarsel>}
            >
                {data => <EgenansattEtikett erEgenansatt={data.erEgenAnsatt} />}
            </PlukkRestDataDeprecated>
        </ErrorBoundary>
    );
}

function mapStateToProps(state: AppState): StateProps {
    return {
        egenAnsattResource: state.restResources.egenAnsatt
    };
}

export default connect(mapStateToProps)(EgenAnsattEtikettContainer);
