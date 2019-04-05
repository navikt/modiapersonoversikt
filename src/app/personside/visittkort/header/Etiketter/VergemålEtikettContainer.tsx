import * as React from 'react';
import { Vergemal } from '../../../../../models/vergemal/vergemal';
import { connect } from 'react-redux';
import { DeprecatedRestResource } from '../../../../../redux/restReducers/deprecatedRestResource';
import { AppState } from '../../../../../redux/reducers';
import EtikettBase from 'nav-frontend-etiketter';
import PlukkRestDataDeprecated from '../../../infotabs/ytelser/pleiepenger/PlukkRestDataDeprecated';
import LazySpinner from '../../../../../components/LazySpinner';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import ErrorBoundary from '../../../../../components/ErrorBoundary';

interface StateProps {
    vergemalResource: DeprecatedRestResource<Vergemal>;
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
            <PlukkRestDataDeprecated
                restResource={props.vergemalResource}
                returnOnPending={<LazySpinner type="S" />}
                returnOnError={<AlertStripeAdvarsel>Kunne ikke sjekke om bruker har verge</AlertStripeAdvarsel>}
            >
                {data => <VergemålsEtikett vergemål={data} />}
            </PlukkRestDataDeprecated>
        </ErrorBoundary>
    );
}

function mapStateToProps(state: AppState): StateProps {
    return {
        vergemalResource: state.restResources.vergemal
    };
}

export default connect(mapStateToProps)(VergemålEtikettContainer);
