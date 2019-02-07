import * as React from 'react';
import { KontrollSpørsmålState, Spørsmål } from '../../../redux/restReducers/kontrollSporsmal/types';
import { AppState } from '../../../redux/reducers';
import SpørsmålOgSvar, { FeilTekst } from './SporsmalOgSvar';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import { setKontrollSpørsmål } from '../../../redux/restReducers/kontrollSporsmal/actions';
import { connect } from 'react-redux';
import { isLoaded, RestReducer } from '../../../redux/restReducers/restReducer';
import { PersonRespons } from '../../../models/person/person';
import { KRRKontaktinformasjon } from '../../../models/kontaktinformasjon';
import { kontaktInformasjonSpørsmål, personInformasjonSpørsmål, SpørsmålsExtractor } from './SporsmalExtractors';
import { shuffle } from '../../../utils/list-utils';
import { loggEvent } from '../../../utils/frontendLogger';

interface StateProps {
    personinformasjon: RestReducer<PersonRespons>;
    kontaktinformasjon: RestReducer<KRRKontaktinformasjon>;
    kontrollSpørsmål: KontrollSpørsmålState;
}

interface DispatchProps {
    setSpørsmål: (spørsmål: Spørsmål[]) => void;
}

export type Props = StateProps & DispatchProps;

class SpørsmålOgSvarContainer extends React.PureComponent<Props> {
    componentDidMount() {
        this.props.setSpørsmål(this.lagSpørsmål());
        loggEvent('Visning', 'Kontrollsporsmal', undefined);
    }

    componentDidUpdate(nextProps: Readonly<Props>) {
        this.oppdaterSpørsmål();
    }

    oppdaterSpørsmål() {
        const spørsmål = this.lagSpørsmål();
        const nyeEllerEndredeSpørsmål = spørsmål.filter(spm => !this.spørsmålEksisterer(spm));
        if (nyeEllerEndredeSpørsmål.length > 0) {
            this.props.setSpørsmål(spørsmål);
        }

    }

    lagSpørsmål(): Spørsmål[] {
        let spørsmål: Spørsmål[] = [];

        spørsmål = spørsmål.concat(extractSpørsmål(this.props.personinformasjon, personInformasjonSpørsmål));
        spørsmål = spørsmål.concat(extractSpørsmål(this.props.kontaktinformasjon, kontaktInformasjonSpørsmål));

        shuffle(spørsmål);

        return spørsmål;
    }

    spørsmålEksisterer(spørsmål: Spørsmål) {
        if (this.props.kontrollSpørsmål.spørsmål) {
            return this.props.kontrollSpørsmål.spørsmål.some(stateSpm =>
                erSpørsmålLike(stateSpm, spørsmål));
        }
        return false;
    }

    render() {
        if (!this.props.kontrollSpørsmål.spørsmål || this.props.kontrollSpørsmål.spørsmål.length === 0) {
            return <FeilTekst/>;
        }

        return <SpørsmålOgSvar spørsmål={this.props.kontrollSpørsmål.spørsmål[0]}/>;
    }
}

function extractSpørsmål<T>(restRessurs: RestReducer<T>, spørsmålExtractors: SpørsmålsExtractor<T>[]): Spørsmål[] {
    if (isLoaded(restRessurs)) {
        const data = restRessurs.data;
        return spørsmålExtractors
            .map(extractor => {
                return {
                    spørsmål: extractor.spørsmål,
                    svar: extractor.extractSvar(data)
                };
            })
            .filter(spm => spm.svar !== '');
    }
    return [];
}

function erSpørsmålLike(spørsmål1: Spørsmål, spørsmål2: Spørsmål): boolean {
    return spørsmål1.spørsmål === spørsmål2.spørsmål
        && (spørsmål1.svar === spørsmål2.svar || erLikSvarListe(spørsmål1.svar, spørsmål2.svar));
}

function erLikSvarListe(svarListe1: string | string[], svarListe2: string | string[]): boolean {
    if (!(svarListe1 instanceof Array && svarListe2 instanceof Array && svarListe1.length === svarListe2.length)) {
        return false;
    }
    for (let i = 0; i < svarListe1.length; i++) {
        if (svarListe1[i] !== svarListe2[i]) {
            return false;
        }
    }
    return true;
}

function mapStateToProps(state: AppState): StateProps {
    return {
        kontrollSpørsmål: state.kontrollSpørsmål,
        kontaktinformasjon: state.restEndepunkter.kontaktinformasjon,
        personinformasjon: state.restEndepunkter.personinformasjon
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        setSpørsmål: (spørsmål: Spørsmål[]) => dispatch(setKontrollSpørsmål(spørsmål))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpørsmålOgSvarContainer);