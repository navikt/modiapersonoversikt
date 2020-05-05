import * as React from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import { ReactComponent as SvgCog } from './../../svg/cog.svg';
import { KnappWrapper } from '../../components/pilknapp';
import InnstillingerModal from './modal/innstillinger-modal';
import { fetchInnstillinger } from '../../redux/innstillinger';

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
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchInnstillinger());
    }, [dispatch]);

    const [isOpen, setOpen] = React.useState(false);

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
