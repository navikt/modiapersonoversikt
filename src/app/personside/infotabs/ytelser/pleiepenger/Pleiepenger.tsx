import * as React from 'react';
import { Pleiepengerettighet } from '../../../../../models/ytelse/pleiepenger';
import Pleiepengerperiode from './Pleiepengerperiode';
import Oversikt from './Oversikt';
import { datoStigende } from '../../../../../utils/dateUtils';
import VisuallyHiddenAutoFokusHeader from '../../../../../components/VisuallyHiddenAutoFokusHeader';
import { erModiabrukerdialog } from '../../../../../utils/erNyPersonoversikt';
import { useOnMount } from '../../../../../utils/customHooks';
import { loggEvent } from '../../../../../utils/frontendLogger';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { useRef } from 'react';
import { guid } from 'nav-frontend-js-utils';

interface Props {
    pleiepenger: Pleiepengerettighet;
}

const StyledArticle = styled.article`
    ${theme.hvittPanel};
`;

function Pleiepenger(props: Props) {
    const titleId = useRef(guid());
    useOnMount(() => {
        loggEvent('Visning', 'Pleiepenger');
    });

    const sortertePerioder = props.pleiepenger.perioder.sort(datoStigende(p => p.fom)).reverse();

    return (
        <StyledArticle aria-labelledby={titleId.current}>
            <h2 className="sr-only" id={titleId.current}>
                Pleiepenger
            </h2>
            {erModiabrukerdialog() && <VisuallyHiddenAutoFokusHeader tittel="Pleiepengerettighet" />}
            <Oversikt pleiepenger={props.pleiepenger} />
            <ol>
                {sortertePerioder.map((periode, index) => (
                    <Pleiepengerperiode periodeNummer={sortertePerioder.length - index} key={index} periode={periode} />
                ))}
            </ol>
        </StyledArticle>
    );
}

export default Pleiepenger;
