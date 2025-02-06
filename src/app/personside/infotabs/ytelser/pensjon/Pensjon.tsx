import type { Pensjon as IPensjon } from 'src/models/ytelse/pensjon';
import { useOnMount } from 'src/utils/customHooks';
import { loggEvent } from 'src/utils/logger/frontendLogger';
import { formaterDato } from 'src/utils/string-utils';
import styled from 'styled-components';
import DescriptionList from '../../../../../components/DescriptionList';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import theme from '../../../../../styles/personOversiktTheme';
import YtelserInfoGruppe from '../felles-styling/YtelserInfoGruppe';

interface Props {
    pensjon: IPensjon;
}

const StyledPanel = styled.div`
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

function Pensjon(props: Props) {
    useOnMount(() => {
        loggEvent('Visning', 'Pensjon');
    });

    const pensjonEntries = {
        'Fra og med': props.pensjon.fom ? formaterDato(props.pensjon.fom) : '',
        'Til og med': props.pensjon.tom ? formaterDato(props.pensjon.tom) : '',
        Type: props.pensjon.type ? props.pensjon.type.decode : '',
        Status: props.pensjon.status ? props.pensjon.status.decode : ''
    };

    return (
        <ErrorBoundary boundaryName="Tiltakspenger">
            <article>
                <StyledPanel>
                    <h2 className="sr-only">Pensjon</h2>
                    <OversiktStyling>
                        <YtelserInfoGruppe tittel="Om pensjon">
                            <DescriptionList entries={pensjonEntries} />
                        </YtelserInfoGruppe>
                    </OversiktStyling>
                </StyledPanel>
            </article>
        </ErrorBoundary>
    );
}

export default Pensjon;
