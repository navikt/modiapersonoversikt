import * as React from 'react';
import theme from '../../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { setVistYtelse, YtelseValg } from '../../../../../redux/ytelser/yteslerStateReducer';
import { AppState } from '../../../../../redux/reducers';
import { AsyncDispatch } from '../../../../../redux/ThunkTypes';
import { connect } from 'react-redux';
import VisMerKnapp from '../../../../../components/VisMerKnapp';

interface StateProps {
    valgtYtelse: YtelseValg;
}

interface DispatchProps {
    setValgtYtelse: (ytelse: YtelseValg) => void;
}

type Props = DispatchProps & StateProps;

const Styling = styled.div`
  background-color: white;
  border-radius: ${theme.borderRadius.layout};
  min-width: 18rem;
`;

const TittelWrapper = styled.div`
  padding: ${theme.margin.px20};
`;

const ListeStyle = styled.ul`
  > * {
    border-top: ${theme.border.skille};
  }
`;

const ListeElementStyle = styled.li`
  display: flex;
  flex-direction: column;
  .order_first {
    order: -1;
  }
`;

function YtelseValgListe(props: Props) {

    const liste = Object.keys(YtelseValg).map(ytelseKey => {
        const ytelse = YtelseValg[ytelseKey];
        return (
            <VisMerKnapp
                key={ytelseKey}
                onClick={() => props.setValgtYtelse(ytelse)}
                valgt={ytelse === props.valgtYtelse}
                ariaDescription={'Vis ' + ytelseKey}
            >
                <ListeElementStyle>
                    <Element tag={'h3'}>{ytelseKey}</Element>
                    <Normaltekst className="order_first">01.01.0001</Normaltekst>
                </ListeElementStyle>
            </VisMerKnapp>
        );
    });

    return (
        <Styling>
            <TittelWrapper>
                <Undertittel tag={'h2'}>Ytelser</Undertittel>
            </TittelWrapper>
            <nav aria-label="Velg ytelse">
                <ListeStyle>
                    {liste}
                </ListeStyle>
            </nav>
        </Styling>
    );
}

function mapStateToProps(state: AppState): StateProps {
    return {
        valgtYtelse: state.ytelser.valgtYtelse
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        setValgtYtelse: (ytelse: YtelseValg) => dispatch(setVistYtelse(ytelse))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(YtelseValgListe);
