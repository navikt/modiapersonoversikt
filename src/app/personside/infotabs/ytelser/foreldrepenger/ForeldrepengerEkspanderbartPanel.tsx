import * as React from 'react';
import {
    Foreldrepengerettighet,
    getForeldepengerIdDato,
    getUnikForeldrepengerKey
} from '../../../../../models/ytelse/foreldrepenger';
import { formaterDato } from '../../../../../utils/stringFormatting';
import EkspanderbartYtelserPanel from '../felles-styling/EkspanderbartYtelserPanel';
import Foreldrepenger from './ForeldrePenger';
import { useInfotabsDyplenker } from '../../dyplenker';
import { useAppState, useOnMount } from '../../../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { toggleVisYtesle } from '../../../../../redux/ytelser/ytelserReducer';

interface Props {
    foreldrepenger: Foreldrepengerettighet;
}

function ForeldrepengerEkspanderbartpanel({ foreldrepenger }: Props) {
    const open = useAppState(state => state.ytelser.aapnedeYtesler).includes(foreldrepenger);
    const dispatch = useDispatch();
    const setOpen = (vis: boolean) => dispatch(toggleVisYtesle(foreldrepenger, vis));

    const dyplenker = useInfotabsDyplenker();
    useOnMount(() => {
        const erValgtIUrl = dyplenker.ytelser.erValgt(getUnikForeldrepengerKey(foreldrepenger));
        erValgtIUrl && setOpen(true);
    });

    const tittelTillegsInfo = [
        `ID-dato: ${formaterDato(getForeldepengerIdDato(foreldrepenger))}`,
        foreldrepenger.foreldrepengetype
    ];

    return (
        <EkspanderbartYtelserPanel
            open={open}
            setOpen={setOpen}
            tittel="Foreldrepenger"
            tittelTillegsInfo={tittelTillegsInfo}
        >
            <Foreldrepenger foreldrepenger={foreldrepenger} />
        </EkspanderbartYtelserPanel>
    );
}

export default ForeldrepengerEkspanderbartpanel;
