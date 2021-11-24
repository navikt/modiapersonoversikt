import * as React from 'react';
import { KontrollSporsmalState, Sporsmal } from '../../../redux/kontrollSporsmal/types';
import { AppState } from '../../../redux/reducers';
import SporsmalOgSvar, { FeilTekst } from './SporsmalOgSvar';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import { setKontrollSporsmal } from '../../../redux/kontrollSporsmal/actions';
import { connect } from 'react-redux';
import { kontaktInformasjonSporsmal, personInformasjonSporsmal, SporsmalsExtractor } from './SporsmalExtractors';
import { shuffle } from './list-utils';
import { loggEvent } from '../../../utils/logger/frontendLogger';
import { Person } from '../visittkort-v2/PersondataDomain';
import { useHentPersondata } from '../../../utils/customHooks';
import { hasError, isPending } from '@nutgaard/use-async';

interface StateProps {
    kontrollSporsmal: KontrollSporsmalState;
}

interface DispatchProps {
    setSporsmal: (sporsmal: Sporsmal[]) => void;
}

type Props = StateProps & DispatchProps;

function HentPersondata(): Person | null {
    const persondata = useHentPersondata();
    return isPending(persondata) || hasError(persondata) ? null : persondata.data.person;
}

class SporsmalOgSvarContainer extends React.PureComponent<Props> {
    persondata: Person | null = null;

    componentDidMount() {
        this.persondata = HentPersondata();
        this.props.setSporsmal(this.lagSporsmal());
        loggEvent('Visning', 'Kontrollsporsmal', undefined);
    }

    componentDidUpdate() {
        this.oppdaterSporsmal();
    }

    oppdaterSporsmal() {
        const sporsmal = this.lagSporsmal();
        const nyeSporsmal = sporsmal.filter((spm) => !this.sporsmalEksisterer(spm));
        if (nyeSporsmal.length > 0) {
            this.props.setSporsmal(sporsmal);
        }
    }

    lagSporsmal(): Sporsmal[] {
        let sporsmal: Sporsmal[] = [];

        sporsmal = sporsmal.concat(extractSporsmal(this.persondata, personInformasjonSporsmal));
        sporsmal = sporsmal.concat(
            extractSporsmal(this.persondata?.kontaktOgReservasjon ?? null, kontaktInformasjonSporsmal)
        );

        shuffle(sporsmal);

        return sporsmal;
    }

    sporsmalEksisterer(sporsmal: Sporsmal) {
        if (this.props.kontrollSporsmal.sporsmal) {
            return this.props.kontrollSporsmal.sporsmal.some((stateSpm) => erSporsmalLike(stateSpm, sporsmal));
        }
        return false;
    }

    render() {
        if (!this.props.kontrollSporsmal.sporsmal || this.props.kontrollSporsmal.sporsmal.isEmpty()) {
            return <FeilTekst />;
        }

        return <SporsmalOgSvar sporsmal={this.props.kontrollSporsmal.sporsmal[0]} />;
    }
}

function extractSporsmal<T>(data: T | null, sporsmalExtractors: SporsmalsExtractor<T>[]): Sporsmal[] {
    if (data) {
        return sporsmalExtractors
            .map((extractor) => {
                return {
                    sporsmal: extractor.sporsmal,
                    svar: extractor.extractSvar(data)
                };
            })
            .filter((spm) => !erTom(spm));
    }
    return [];
}

function erSporsmalLike(sporsmal1: Sporsmal, sporsmal2: Sporsmal): boolean {
    return sporsmal1.sporsmal === sporsmal2.sporsmal;
}

function erTom(spm: Sporsmal): boolean {
    return spm.svar.every((enkeltSvar) => enkeltSvar.tekst === '');
}

function mapStateToProps(state: AppState): StateProps {
    return {
        kontrollSporsmal: state.kontrollSporsmal
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        setSporsmal: (sporsmal: Sporsmal[]) => dispatch(setKontrollSporsmal(sporsmal))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SporsmalOgSvarContainer);
