import * as React from 'react';
import EkspanderbartYtelserPanel from '../felles-styling/EkspanderbartYtelserPanel';
import Pleiepenger from './Pleiepenger';
import {
    getPleiepengerIdDato,
    getUnikPleiepengerKey,
    Pleiepengerettighet
} from '../../../../../models/ytelse/pleiepenger';
import { formaterDato } from '../../../../../utils/stringFormatting';
import { useInfotabsDyplenker } from '../../dyplenker';
import { useAppState, useOnMount } from '../../../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { toggleVisYtesle } from '../../../../../redux/ytelser/ytelserReducer';

interface Props {
    pleiepenger: Pleiepengerettighet;
}

function PleiepengerEkspanderbartpanel({ pleiepenger }: Props) {
    const open = useAppState(state => state.ytelser.aapnedeYtesler).includes(pleiepenger);
    const dispatch = useDispatch();
    const setOpen = (vis: boolean) => dispatch(toggleVisYtesle(pleiepenger, vis));

    const dyplenker = useInfotabsDyplenker();
    useOnMount(() => {
        const erValgtIUrl = dyplenker.ytelser.erValgt(getUnikPleiepengerKey(pleiepenger));
        erValgtIUrl && setOpen(true);
    });

    const tittelTillegsInfo = [
        'ID-dato: ' + formaterDato(getPleiepengerIdDato(pleiepenger)),
        'Barnets f.nr: ' + pleiepenger.barnet
    ];

    return (
        <EkspanderbartYtelserPanel
            open={open}
            setOpen={setOpen}
            tittel="Pleiepenger sykt barn"
            tittelTillegsInfo={tittelTillegsInfo}
        >
            <Pleiepenger pleiepenger={pleiepenger} />
        </EkspanderbartYtelserPanel>
    );
}

export default PleiepengerEkspanderbartpanel;
