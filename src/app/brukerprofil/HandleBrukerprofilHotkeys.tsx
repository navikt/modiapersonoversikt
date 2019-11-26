import { RouteComponentProps, withRouter } from 'react-router';
import * as React from 'react';
import { paths } from '../routes/routing';
import { loggEvent } from '../../utils/frontendLogger';
import { AppState } from '../../redux/reducers';
import { connect } from 'react-redux';
import { hasData, RestResource } from '../../rest/utils/restResource';
import { BaseUrlsResponse } from '../../models/baseurls';
import { hentBaseUrl } from '../../redux/restReducers/baseurls';
import { featureIsOnSelector } from '../../components/featureToggle/FeatureToggle';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';

interface StateProps {
    fødselsnummer: string;
    baseUrl: RestResource<BaseUrlsResponse>;
    featureToggleIsOn?: boolean;
}

type Props = RouteComponentProps<{}> & StateProps;

class HandleBrukerprofilHotkeys extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleBrukerprofilHotkeys = this.handleBrukerprofilHotkeys.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleBrukerprofilHotkeys);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleBrukerprofilHotkeys);
    }

    render() {
        return null;
    }

    private hentUrl(baseUrlResource: RestResource<BaseUrlsResponse>) {
        return hasData(baseUrlResource) ? hentBaseUrl(baseUrlResource.data, 'personforvalter') : '';
    }

    private handleBrukerprofilHotkeys(event: KeyboardEvent) {
        if (!event.altKey) {
            return;
        }

        const key = event.code ? event.code.replace('Key', '').toLowerCase() : event.key;

        if (key === 'b') {
            event.stopPropagation();
            const url = this.props.featureToggleIsOn
                ? `${this.hentUrl(this.props.baseUrl)}?aktoerId=${this.props.fødselsnummer}`
                : `${paths.personUri}/${this.props.fødselsnummer}`;
            loggEvent('Hurtigtast', 'Brukerprofil', { type: 'Alt + B' });
            this.props.history.push(url);
        }
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        fødselsnummer: state.gjeldendeBruker.fødselsnummer,
        baseUrl: state.restResources.baseUrl,
        featureToggleIsOn: featureIsOnSelector(state, FeatureToggles.NyPersonforvalter)
    };
}

export default withRouter(connect(mapStateToProps)(HandleBrukerprofilHotkeys));
