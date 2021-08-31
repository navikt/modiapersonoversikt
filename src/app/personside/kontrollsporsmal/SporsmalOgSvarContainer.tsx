import * as React from 'react';
import { KontrollSporsmaalState, Sporsmaal } from '../../../redux/kontrollSporsmal/types';
import { AppState } from '../../../redux/reducers';
import SpørsmålOgSvar, { FeilTekst } from './SporsmalOgSvar';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import { setKontrollSpørsmål } from '../../../redux/kontrollSporsmal/actions';
import { connect } from 'react-redux';
import { PersonRespons } from '../../../models/person/person';
import { KRRKontaktinformasjon } from '../../../models/kontaktinformasjon';
import { kontaktInformasjonSporsmaal, personInformasjonSpørsmål, SpørsmålsExtractor } from './SporsmalExtractors';
import { shuffle } from './list-utils';
import { loggEvent } from '../../../utils/logger/frontendLogger';
import { hasData, RestResource } from '../../../rest/utils/restResource';

interface StateProps {
    personinformasjon: RestResource<PersonRespons>;
    kontaktinformasjon: RestResource<KRRKontaktinformasjon>;
    kontrollSpørsmål: KontrollSporsmaalState;
}

interface DispatchProps {
    setSpørsmål: (sporsmaal: Sporsmaal[]) => void;
}

type Props = StateProps & DispatchProps;

class SpørsmålOgSvarContainer extends React.PureComponent<Props> {
    componentDidMount() {
        this.props.setSpørsmål(this.lagSpørsmål());
        loggEvent('Visning', 'Kontrollsporsmal', undefined);
    }

    componentDidUpdate() {
        this.oppdaterSpørsmål();
    }

    oppdaterSpørsmål() {
        const sporsmaal = this.lagSpørsmål();
        const nyeSporsmaal = sporsmaal.filter(spm => !this.spørsmålEksisterer(spm));
        if (nyeSporsmaal.length > 0) {
            this.props.setSpørsmål(sporsmaal);
        }
    }

    lagSpørsmål(): Sporsmaal[] {
        let spørsmål: Sporsmaal[] = [];

        spørsmål = spørsmål.concat(extractSporsmaal(this.props.personinformasjon, personInformasjonSpørsmål));
        spørsmål = spørsmål.concat(extractSporsmaal(this.props.kontaktinformasjon, kontaktInformasjonSporsmaal));

        shuffle(spørsmål);

        return spørsmål;
    }

    spørsmålEksisterer(sporsmaal: Sporsmaal) {
        if (this.props.kontrollSpørsmål.sporsmaal) {
            return this.props.kontrollSpørsmål.sporsmaal.some(stateSpm => erSpørsmålLike(stateSpm, sporsmaal));
        }
        return false;
    }

    render() {
        if (!this.props.kontrollSpørsmål.sporsmaal || this.props.kontrollSpørsmål.sporsmaal.length === 0) {
            return <FeilTekst />;
        }

        return <SpørsmålOgSvar sporsmaal={this.props.kontrollSpørsmål.sporsmaal[0]} />;
    }
}

function extractSporsmaal<T>(restRessurs: RestResource<T>, spørsmålExtractors: SpørsmålsExtractor<T>[]): Sporsmaal[] {
    if (hasData(restRessurs)) {
        const data = restRessurs.data;
        return spørsmålExtractors
            .map(extractor => {
                return {
                    sporsmaal: extractor.spørsmål,
                    svar: extractor.extractSvar(data)
                };
            })
            .filter(spm => !erTom(spm));
    }
    return [];
}

function erSpørsmålLike(sporsmaal1: Sporsmaal, sporsmaal2: Sporsmaal): boolean {
    return sporsmaal1.sporsmaal === sporsmaal2.sporsmaal;
}

function erTom(spm: Sporsmaal): boolean {
    return spm.svar.every(enkeltSvar => enkeltSvar.tekst === '');
}

function mapStateToProps(state: AppState): StateProps {
    return {
        kontrollSpørsmål: state.kontrollSporsmaal,
        kontaktinformasjon: state.restResources.kontaktinformasjon,
        personinformasjon: state.restResources.personinformasjon
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        setSpørsmål: (spørsmål: Sporsmaal[]) => dispatch(setKontrollSpørsmål(spørsmål))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpørsmålOgSvarContainer);
