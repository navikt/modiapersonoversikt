import * as React from 'react';
import { SyfoPunkt } from '../../../../models/oppfolging';
import EkspanderbartYtelserPanel from '../ytelser/felles-styling/EkspanderbartYtelserPanel';
import AlertStripeInfo from 'nav-frontend-alertstriper/lib/info-alertstripe';
import { genericDescendingDateComparator } from '../../../../utils/dateUtils';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import DescriptionList from '../../../../components/DescriptionList';
import { formaterDato } from '../../../../utils/stringFormatting';

interface Props {
    syfoPunkt: SyfoPunkt[];
}

const ElementStyle = styled.div`
    padding: ${theme.margin.layout};
    dd,
    dt {
        width: 20rem;
    }
`;

const ListeStyle = styled.ol`
    > * {
        border-top: ${theme.border.skille};
    }
`;

function SykefravarsoppfolgingListe(props: { syfoPunkter: SyfoPunkt[] }) {
    const sortertPåDato = props.syfoPunkter.sort(genericDescendingDateComparator(syfoPunkt => syfoPunkt.dato));

    const listekomponenter = sortertPåDato.map(syfopunkt => <SyfoPunktElement syfoPunkt={syfopunkt} />);

    return <ListeStyle>{listekomponenter}</ListeStyle>;
}

function SyfoPunktElement(props: { syfoPunkt: SyfoPunkt }) {
    const descriptionListProps = {
        ['Innen ' + formaterDato(props.syfoPunkt.dato)]: props.syfoPunkt.syfoHendelse,
        Status: props.syfoPunkt.status
    };

    return (
        <ElementStyle>
            <DescriptionList entries={descriptionListProps} />
        </ElementStyle>
    );
}

function SykefravarsoppfolgingEkspanderbartPanel(props: Props) {
    if (props.syfoPunkt.length === 0) {
        return <AlertStripeInfo>Det finnes ikke oppfølgingsinformasjon om bruker i Arena</AlertStripeInfo>;
    }

    return (
        <EkspanderbartYtelserPanel tittel="Sykefraværsoppfølging">
            <SykefravarsoppfolgingListe syfoPunkter={props.syfoPunkt} />
        </EkspanderbartYtelserPanel>
    );
}

export default SykefravarsoppfolgingEkspanderbartPanel;
