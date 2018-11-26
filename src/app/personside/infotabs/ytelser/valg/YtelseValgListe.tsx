import * as React from 'react';
import theme from '../../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import EnkeltValg from './EnkeltValg';
import { Undertittel } from 'nav-frontend-typografi';
import { setVistYtelse, YtelseValg } from '../../../../../redux/ytelser/yteslerStateReducer';
import { AppState } from '../../../../../redux/reducers';
import { AsyncDispatch } from '../../../../../redux/ThunkTypes';
import { connect } from 'react-redux';

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

function YtelseValgListe(props: Props) {

    const liste = Object.keys(YtelseValg).map(ytelseKey => {
        const ytelse = YtelseValg[ytelseKey];
        return (
            <EnkeltValg
                valgt={ytelse === props.valgtYtelse}
                onClick={() => props.setValgtYtelse(ytelse)}
                key={ytelseKey}
            >
                {ytelseKey}
            </EnkeltValg>
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
