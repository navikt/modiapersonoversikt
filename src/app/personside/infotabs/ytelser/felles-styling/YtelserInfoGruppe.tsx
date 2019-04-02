import * as React from 'react';
import { ReactNode } from 'react';
import { Ingress } from 'nav-frontend-typografi';

interface Props {
    children: ReactNode;
    tittel: string;
}

function YtelserInfoGruppe(props: Props) {
    return (
        <div>
            <Ingress tag="h3">{props.tittel}</Ingress>
            {props.children}
        </div>
    );
}

export default YtelserInfoGruppe;
