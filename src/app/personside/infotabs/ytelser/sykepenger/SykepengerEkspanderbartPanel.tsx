import * as React from 'react';
import EkspanderbartYtelserPanel from '../felles-styling/EkspanderbartYtelserPanel';
import {
    getSykepengerIdDato,
    getUnikSykepengerKey,
    Sykepenger as ISykepenger
} from '../../../../../models/ytelse/sykepenger';
import { formaterDato } from '../../../../../utils/stringFormatting';
import Sykepenger from './Sykepenger';
import { useInfotabsDyplenker } from '../../dyplenker';
import { useAppState, useOnMount } from '../../../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { toggleVisYtesle } from '../../../../../redux/ytelser/ytelserReducer';

interface Props {
    sykepenger: ISykepenger;
}

function SykepengerEkspanderbartpanel({ sykepenger }: Props) {
    const open = useAppState(state => state.ytelser.aapnedeYtesler).includes(sykepenger);
    const dispatch = useDispatch();
    const setOpen = (vis: boolean) => dispatch(toggleVisYtesle(sykepenger, vis));

    const dyplenker = useInfotabsDyplenker();
    useOnMount(() => {
        const erValgtIUrl = dyplenker.ytelser.erValgt(getUnikSykepengerKey(sykepenger));
        erValgtIUrl && setOpen(true);
    });

    const tittelTillegsInfo = ['ID-dato: ' + formaterDato(getSykepengerIdDato(sykepenger))];

    return (
        <EkspanderbartYtelserPanel
            open={open}
            setOpen={setOpen}
            tittel="Sykepenger"
            tittelTillegsInfo={tittelTillegsInfo}
        >
            <Sykepenger sykepenger={sykepenger} />
        </EkspanderbartYtelserPanel>
    );
}

export default SykepengerEkspanderbartpanel;
