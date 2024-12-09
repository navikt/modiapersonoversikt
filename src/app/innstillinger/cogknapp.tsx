import { useState } from 'react';
import styled from 'styled-components';
import { KnappWrapper } from '../../components/pilknapp';
import SvgCog from './../../svg/cog.svg';
import InnstillingerModal from './modal/InnstillingerModal';

const CogWrapper = styled(KnappWrapper)`
    padding-top: 3px;

    &:hover {
        svg,
        g {
            fill: white;
        }
    }
    svg,
    g {
        fill: #3e3832;
    }
`;

interface Props {
    width?: string;
    beskrivelse: string;
}

function CogKnapp(props: Props) {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <CogWrapper
                aria-label={props.beskrivelse}
                title={props.beskrivelse}
                onClick={() => setOpen(true)}
                width={props.width}
            >
                <SvgCog />
            </CogWrapper>
            <InnstillingerModal isOpen={isOpen} lukk={() => setOpen(false)} />
        </>
    );
}

export default CogKnapp;
