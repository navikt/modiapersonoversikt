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
import { useHentPersondata } from '../../../utils/customHooks';
import { hasData } from '@nutgaard/use-fetch';
import { useEffect } from 'react';

interface StateProps {
    kontrollSporsmal: KontrollSporsmalState;
}

interface DispatchProps {
    setSporsmal: (sporsmal: Sporsmal[]) => void;
}

type Props = StateProps & DispatchProps;

function SporsmalOgSvarContainer(props: Props) {
    const persondata = useHentPersondata();
    const person = hasData(persondata) ? persondata.data.person : null;

    useEffect(() => {
        oppdaterSporsmal();
        loggEvent('Visning', 'Kontrollsporsmal', undefined);
    });

    function oppdaterSporsmal() {
        const sporsmal = lagSporsmal();
        const nyeSporsmal = sporsmal.filter((spm) => !sporsmalEksisterer(spm));
        if (nyeSporsmal.length > 0) {
            props.setSporsmal(sporsmal);
        }
    }

    function lagSporsmal(): Sporsmal[] {
        let sporsmal: Sporsmal[] = [];

        sporsmal = sporsmal.concat(extractSporsmal(person, personInformasjonSporsmal));
        sporsmal = sporsmal.concat(extractSporsmal(person?.kontaktOgReservasjon ?? null, kontaktInformasjonSporsmal));

        shuffle(sporsmal);

        return sporsmal;
    }

    function sporsmalEksisterer(sporsmal: Sporsmal) {
        if (props.kontrollSporsmal.sporsmal) {
            return props.kontrollSporsmal.sporsmal.some((stateSpm) => erSporsmalLike(stateSpm, sporsmal));
        }
        return false;
    }

    if (!props.kontrollSporsmal.sporsmal || props.kontrollSporsmal.sporsmal.isEmpty()) {
        return <FeilTekst />;
    }

    return <SporsmalOgSvar sporsmal={props.kontrollSporsmal.sporsmal[0]} />;
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
