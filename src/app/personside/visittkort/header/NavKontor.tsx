import * as React from 'react';
import { NavKontorInterface } from '../../../../models/navkontor';

interface Props {
    navkontor: NavKontorInterface;
}

function NavKontor(props: Props) {
    return(
        <div>{props.navkontor.navn}</div>
    );
}

export default NavKontor;
