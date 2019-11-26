import * as React from 'react';
import { Person } from '../../../../../models/person/person';
import { paths } from '../../../../routes/routing';
import { Link } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../redux/reducers';
import { FeatureToggles } from '../../../../../components/featureToggle/toggleIDs';
import { featureIsOnSelector } from '../../../../../components/featureToggle/FeatureToggle';
import { hasData, RestResource } from '../../../../../rest/utils/restResource';
import { BaseUrlsResponse } from '../../../../../models/baseurls';
import { hentBaseUrl } from '../../../../../redux/restReducers/baseurls';

function hentUrl(baseUrlResource: RestResource<BaseUrlsResponse>) {
    return hasData(baseUrlResource) ? hentBaseUrl(baseUrlResource.data, 'personforvalter') : '';
}

function LenkeBrukerprofilVisning(props: { nyModiaPersonoversikt: boolean; person: Person }) {
    const baseUrlResource = useSelector((appstate: AppState) => appstate.restResources.baseUrl);
    const featureToggleIsOn = useSelector((state: AppState) =>
        featureIsOnSelector(state, FeatureToggles.NyPersonforvalter)
    );
    const personforvalterUrl = hentUrl(baseUrlResource);

    if (props.nyModiaPersonoversikt) {
        if (featureToggleIsOn) {
            return (
                <Link
                    className="lenke"
                    to={`${personforvalterUrl}?aktoerId=${props.person.fødselsnummer}`}
                    target={'_blank'}
                >
                    <Normaltekst tag="span">Administrer brukerprofil</Normaltekst>
                </Link>
            );
        } else {
            return (
                <Link className="lenke" to={`${paths.brukerprofil}/${props.person.fødselsnummer}`}>
                    <Normaltekst tag="span">Administrer brukerprofil</Normaltekst>
                </Link>
            );
        }
    } else {
        if (featureToggleIsOn) {
            return (
                <a
                    className="lenke"
                    href={`${personforvalterUrl}?aktoerId=${props.person.fødselsnummer}`}
                    target={'_blank'}
                >
                    <Normaltekst tag="span">Administrer brukerprofil</Normaltekst>
                </a>
            );
        } else {
            return (
                <a
                    className="lenke"
                    href={`${paths.legacyPersonPath}/${props.person.fødselsnummer}${paths.legacyBrukerprofil}`}
                >
                    <Normaltekst tag="span">Administrer brukerprofil</Normaltekst>
                </a>
            );
        }
    }
}

export default LenkeBrukerprofilVisning;
