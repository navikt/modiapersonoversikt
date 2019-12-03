import * as React from 'react';
import { Person } from '../../../../../models/person/person';
import { paths } from '../../../../routes/routing';
import { Link } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import { FeatureToggles } from '../../../../../components/featureToggle/toggleIDs';
import useUrlNyPersonforvalter from '../../../../brukerprofil/useUrlNyPersonforvalter';
import useFeatureToggle from '../../../../../components/featureToggle/useFeatureToggle';

function LenkeBrukerprofilVisning(props: { nyModiaPersonoversikt: boolean; person: Person }) {
    const nyPersonforvalterFT = useFeatureToggle(FeatureToggles.NyPersonforvalter);
    const personforvalterUrl = useUrlNyPersonforvalter();

    if (props.nyModiaPersonoversikt) {
        if (nyPersonforvalterFT.isOn) {
            return (
                <a className="lenke" href={personforvalterUrl} target={'_blank'} rel="noreferrer noopener">
                    <Normaltekst tag="span">Administrer brukerprofil</Normaltekst>
                </a>
            );
        } else {
            return (
                <Link className="lenke" to={`${paths.brukerprofil}/${props.person.fødselsnummer}`}>
                    <Normaltekst tag="span">Administrer brukerprofil</Normaltekst>
                </Link>
            );
        }
    } else {
        if (nyPersonforvalterFT.isOn) {
            return (
                <a className="lenke" href={personforvalterUrl} target={'_blank'} rel="noreferrer noopener">
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
