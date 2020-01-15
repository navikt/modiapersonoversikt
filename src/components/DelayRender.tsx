import { useState } from 'react';
import { useOnMount } from '../utils/customHooks';

interface Props {
    delay: number;
    children: JSX.Element;
}

function DelayRender(props: Props) {
    const [show, setShow] = useState(false);

    useOnMount(() => {
        const timer = setTimeout(() => setShow(true), props.delay);
        return () => clearTimeout(timer);
    });

    if (!show) {
        return null;
    }

    return props.children;
}

export default DelayRender;
