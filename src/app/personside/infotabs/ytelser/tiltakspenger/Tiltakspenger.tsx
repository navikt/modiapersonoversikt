import * as React from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import { Tiltakspenger as ITiltakspenger } from '../../../../../models/ytelse/tiltakspenger';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import { useOnMount } from '../../../../../utils/customHooks';
import { loggEvent } from '../../../../../utils/logger/frontendLogger';
import { guid } from 'nav-frontend-js-utils';
import Panel from 'nav-frontend-paneler';
import theme from '../../../../../styles/personOversiktTheme';
import YtelserInfoGruppe from '../felles-styling/YtelserInfoGruppe';
import DescriptionList from '../../../../../components/DescriptionList';
import { NOKellerNull, formaterDato } from '../../../../../utils/string-utils';

interface Props {
    tiltakspenger: ITiltakspenger;
}

const StyledPanel = styled(Panel)`
    padding: ${theme.margin.layout};
`;

const OversiktStyling = styled.div`
    display: flex;
    flex-wrap: wrap;
    > * {
        flex-basis: 40%;
        flex-grow: 1;
    }
`;

function Tiltakspenger(props: Props) {
    const titleId = useRef(guid());
    useOnMount(() => {
        loggEvent('Visning', 'Tiltakspenger');
    });

    const tiltakspengerEntries = {
        'Fra og med': formaterDato(props.tiltakspenger.fom),
        'Til og med': formaterDato(props.tiltakspenger.tom),
        Dagsats: NOKellerNull(props.tiltakspenger.dagsatsTiltakspenger),
        'Antall dager': props.tiltakspenger.antallDager
    };

    return (
        <ErrorBoundary boundaryName="Tiltakspenger">
            <article>
                <StyledPanel aria-labelledby={titleId.current}>
                    <h2 className="sr-only" id={titleId.current}>
                        Tiltakspenger
                    </h2>
                    <OversiktStyling>
                        <YtelserInfoGruppe tittel="Om tiltakspenger">
                            <DescriptionList entries={tiltakspengerEntries} />
                        </YtelserInfoGruppe>

                        <TiltakspengerBarneTillegg
                            antallBarn={props.tiltakspenger.antallBarn ?? 0}
                            dagsats={props.tiltakspenger.dagsatsBarnetillegg}
                        />
                    </OversiktStyling>
                </StyledPanel>
            </article>
        </ErrorBoundary>
    );
}

type BarneTilleggProps = {
    antallBarn: number;
    dagsats?: number;
};
const TiltakspengerBarneTillegg = (props: BarneTilleggProps) => {
    const entries = {
        'Antall barn': props.antallBarn,
        'Dagsats barnetillegg': NOKellerNull(props.dagsats)
    };

    return (
        <YtelserInfoGruppe tittel="Barnetillegg">
            <DescriptionList entries={entries} />
        </YtelserInfoGruppe>
    );
};

export default Tiltakspenger;
