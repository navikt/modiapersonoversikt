import * as React from 'react';
import { ReactNode } from 'react';
import { Ingress } from 'nav-frontend-typografi';

interface Props {
    children: ReactNode;
    tittel: string;
}

function YtelserBullet(props: Props) {
    return (
        <div>
            <Ingress>{props.tittel}</Ingress>
            {props.children}
        </div>
    );
}

export default YtelserBullet;
