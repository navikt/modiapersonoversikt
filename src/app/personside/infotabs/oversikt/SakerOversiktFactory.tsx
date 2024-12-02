import { ReactNode } from 'react';
import SakerOversiktV2 from './SakerOversiktV2';

interface Props {
    setHeaderContent: (content: ReactNode) => void;
}

function SakerOversiktFactory(props: Props) {
    return (
        <>
            <SakerOversiktV2 setHeaderContent={props.setHeaderContent} />
        </>
    );
}

export default SakerOversiktFactory;
