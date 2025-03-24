import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Panel from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import styled from 'styled-components';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import type { Traad } from '../../../../../models/meldinger/meldinger';
import theme from '../../../../../styles/personOversiktTheme';
import EnkeltMelding from './EnkeltMelding';

interface Props {
    traad: Traad;
}

const StyledArticle = styled.article`
    .ekspanderbartPanel__innhold {
        padding: 0rem;
    }
    > *:not(:last-child) {
        margin-bottom: 0.5rem;
    }
    margin-top: 0.7rem;
`;

const StyledLi = styled.li`
    position: relative;
`;

const StyledPanel = styled(Panel)`
    padding: 0rem;
    margin-top: 0.1rem;
    > li:not(:last-child) {
        margin-bottom: 0.1rem;
    }
    > li:not(:only-child) {
        border-top: ${theme.border.skilleSvak};
    }
`;

function Traadpanel(props: { traad: Traad; tittel: string; defaultApen: boolean }) {
    if (props.traad.meldinger.length === 0) {
        return null;
    }

    const flereMeldinger = props.traad.meldinger.length > 1;
    const meldinger = props.traad.meldinger.map((melding, index) => {
        const meldingnummer = props.traad.meldinger.length - index;

        return (
            <StyledLi key={melding.id}>
                <EnkeltMelding
                    traad={props.traad}
                    melding={melding}
                    erEnkeltstaende={props.traad.meldinger.length === 1}
                    defaultApen={props.defaultApen && !flereMeldinger}
                    meldingsNummer={meldingnummer}
                />
            </StyledLi>
        );
    });

    if (flereMeldinger) {
        return (
            <Ekspanderbartpanel
                renderContentWhenClosed={true}
                apen={false}
                tittel={<Undertittel>{props.tittel}</Undertittel>}
                border={true}
            >
                <StyledPanel>
                    <ol>{meldinger}</ol>
                </StyledPanel>
            </Ekspanderbartpanel>
        );
    }
    return (
        <StyledPanel aria-label={props.tittel}>
            <ol>{meldinger}</ol>
        </StyledPanel>
    );
}

function TidligereMeldinger(props: Props) {
    const defaultApen = props.traad.meldinger.length === 1;

    return (
        <ErrorBoundary boundaryName="Tidligere meldinger">
            <StyledArticle>
                <Traadpanel traad={props.traad} tittel="Tidligere meldinger" defaultApen={defaultApen} />
            </StyledArticle>
        </ErrorBoundary>
    );
}

export default TidligereMeldinger;
