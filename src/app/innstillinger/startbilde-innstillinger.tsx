import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Flatknapp } from 'nav-frontend-knapper';
import { ReactComponent as SvgCog } from './../../svg/cog.svg';
import InnstillingerModal from './modal/innstillinger-modal';
import { fetchInnstillinger } from '../../redux/innstillinger';

function StartbildeInnstillinger() {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchInnstillinger());
    }, [dispatch]);
    const [isOpen, setOpen] = React.useState(false);

    return (
        <>
            <AlertStripeInfo>
                <span>Du kan nå justere og lagre personlige innstillinger via knappen nedenfor,</span>
                <br />
                <span>eller via tannhjulet nederst i høyre hjørne om man har en bruker oppe.</span>
            </AlertStripeInfo>
            <Flatknapp onClick={() => setOpen(true)}>
                <SvgCog />
                <span>Vis dine innstillinger</span>
            </Flatknapp>
            <InnstillingerModal isOpen={isOpen} lukk={() => setOpen(false)} />
        </>
    );
}

export default StartbildeInnstillinger;
