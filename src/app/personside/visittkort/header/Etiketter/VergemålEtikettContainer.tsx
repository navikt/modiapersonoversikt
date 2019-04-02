import * as React from 'react';
import { Vergemal } from '../../../../../models/vergemal/vergemal';
import { connect } from 'react-redux';
import { RestResource } from '../../../../../redux/restReducers/restResource';
import { AppState } from '../../../../../redux/reducers';
import EtikettBase from 'nav-frontend-etiketter';
import PlukkRestData from '../../../infotabs/ytelser/pleiepenger/PlukkRestData';
import LazySpinner from '../../../../../components/LazySpinner';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import ErrorBoundary from '../../../../../components/ErrorBoundary';

interface StateProps {
    vergemalResource: RestResource<Vergemal>;
}

function VergemålsEtikett(props: { vergemål: Vergemal }) {
    const harVergemål = props.vergemål.verger && props.vergemål.verger.length > 0;

    if (!harVergemål) {
        return null;
    }

    return <EtikettBase type={'fokus'}>Vergemål</EtikettBase>;
}

function VergemålEtikettContainer(props: StateProps) {
    return (
        <ErrorBoundary boundaryName="Vergemålsetikett">
            <PlukkRestData
                restResource={props.vergemalResource}
                returnOnPending={<LazySpinner type="S" />}
                returnOnError={<AlertStripeAdvarsel>Kunne ikke sjekke om bruker har verge</AlertStripeAdvarsel>}
            >
                {data => <VergemålsEtikett vergemål={data} />}
            </PlukkRestData>
        </ErrorBoundary>
    );
}

function mapStateToProps(state: AppState): StateProps {
    return {
        vergemalResource: state.restResources.vergemal
    };
}

export default connect(mapStateToProps)(VergemålEtikettContainer);
