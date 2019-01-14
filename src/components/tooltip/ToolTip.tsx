import * as React from 'react';
import styled from 'styled-components';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { Bold } from '../common-styled-components';
import ShowThenHide from '../ShowThenHide';
import { removeWhitespace } from '../../utils/string-utils';
import * as Cookies from 'js-cookie';

interface Props {
    children: string;
}

interface State {
    show: boolean;
}

const Position = styled.div`
  position: fixed;
  top: 20vh;
  left: 50vw;
  transform: translateX(-50%);
  z-index: 1000;
`;

const Style = styled.div`
  background-color: #333;
  border: .2rem white solid;
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  color: white;
  box-shadow: 0 .2rem .5rem rgba(0, 0, 0, 0.5);
  opacity: .8;
  pointer-events: none;
  text-align: right;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  pointer-events: auto;
  > *:hover {
    text-decoration: underline;
  }
`;

class ToolTip extends React.PureComponent<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {show: true};
        this.handleButton = this.handleButton.bind(this);
    }

    getCookieNavn() {
        return 'tooltip' + removeWhitespace(this.props.children);
    }

    dontShowAgain() {
        Cookies.set(this.getCookieNavn(), 'dontShow');
    }

    handleButton(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        this.dontShowAgain();
        this.setState({show: false});
    }

    userHasUnsubscribed() {
        return Cookies.get(this.getCookieNavn());
    }

    render() {
        if (
            !this.props.children ||
            this.props.children === '' ||
            !this.state.show ||
            this.userHasUnsubscribed()
        ) {
            return null;
        }

        return (
            <Position>
                <ShowThenHide>
                    <Style>
                        <Normaltekst><Bold>{this.props.children}</Bold></Normaltekst>
                        <Button onClick={this.handleButton}>
                            <Undertekst>
                                Ikke vis dette tipset igjen
                            </Undertekst>
                        </Button>
                    </Style>
                </ShowThenHide>
            </Position>
        );
    }
}

export default ToolTip;
