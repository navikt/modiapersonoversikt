import { guid } from 'nav-frontend-js-utils';
import Panel from 'nav-frontend-paneler';
import { useRef } from 'react';
import styled from 'styled-components';
import DescriptionList from '../../../../../components/DescriptionList';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import type { Tiltakspenger as ITiltakspenger } from '../../../../../models/ytelse/tiltakspenger';
import theme from '../../../../../styles/personOversiktTheme';
import { useOnMount } from '../../../../../utils/customHooks';
import { loggEvent } from '../../../../../utils/logger/frontendLogger';
import { formaterDato } from '../../../../../utils/string-utils';
import YtelserInfoGruppe from '../felles-styling/YtelserInfoGruppe';

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
        'Fra og med': formaterDato(props.tiltakspenger.periode.fraOgMed),
        'Til og med': formaterDato(props.tiltakspenger.periode.tilOgMed),
        Kilde: props.tiltakspenger.kilde
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

                        {props.tiltakspenger.barnetillegg?.perioder?.map((p) => (
                            <TiltakspengerBarneTillegg
                                key={p.periode.fraOgMed}
                                antallBarn={p.antallBarn}
                                fom={p.periode.fraOgMed}
                                tom={p.periode.tilOgMed}
                            />
                        ))}
                    </OversiktStyling>
                </StyledPanel>
            </article>
        </ErrorBoundary>
    );
}

type BarneTilleggProps = {
    antallBarn: number;
    fom: string;
    tom: string;
};
const TiltakspengerBarneTillegg = (props: BarneTilleggProps) => {
    const entries = {
        'Antall barn': props.antallBarn,
        Periode: `${formaterDato(props.fom)} - ${formaterDato(props.tom)}`
    };

    return (
        <YtelserInfoGruppe tittel="Barnetillegg">
            <DescriptionList entries={entries} />
        </YtelserInfoGruppe>
    );
};

export default Tiltakspenger;
