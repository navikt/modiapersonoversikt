import * as React from 'react';
import styled from 'styled-components';
import ComponentPlaceholder from '../../components/component-placeholder/ComponentPlaceHolder';
import VisittkortContainer from './visittkort/VisittkortContainer';
import Lameller from './lameller/Lameller';

const Wrapper = styled.div`
        width: 100%;
        flex-grow: 1;
        @media (${props => props.theme.media.wideScreen}) {
          display: flex;
          flex-flow: row nowrap;
        }
        padding: ${props => props.theme.margin.layout};
        overflow-y: scroll;
    `;

const PersonOversiktsPanel = styled.section`
        margin-bottom: ${props => props.theme.margin.layout};
        @media (${props => props.theme.media.wideScreen}) {
          flex: 1 0.1 60%;
          margin-right: ${props => props.theme.margin.layout};
        }
        > * {
          box-shadow: ${props => props.theme.boxShadow.layout};
          margin-bottom: ${props => props.theme.margin.layout};
        }
    `;

const DialogPanel = styled.section`
        min-height: 700px;
        display: flex;
        flex-flow: column nowrap;
        @media(${props => props.theme.media.wideScreen}) {
          flex: 1 0.1 20%;
        }        
        > * {
          box-shadow: ${props => props.theme.boxShadow.layout};
          background-color: white;
        }
    `;

const DialogPanelFixer = styled<{scrollTop: number}, 'div'>('div')`
          height: 500px;
          @media(${props => props.theme.media.wideScreen}){
            display: flex;
            flex-flow: column nowrap;
            height: 100%;
            transform: translateY(${props => props.scrollTop}px);
          }
        `;

interface MainLayoutState {
    scrollTop: number;
}

interface MainLayoutProps {
}

class MainLayout extends React.Component<MainLayoutProps, MainLayoutState> {
    private wrapperRef: HTMLDivElement;

    constructor(props: MainLayoutProps) {
        super(props);
        this.state = { scrollTop: 0 };
    }

    componentDidMount() {
        this.wrapperRef.addEventListener('scroll', () => this.handleScroll());
    }

    componentWillUnmount() {
        this.wrapperRef.removeEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() { // TODO bør ha en debouncer hvis denne skal brukes
        const scrollTop = this.wrapperRef !== undefined ? this.wrapperRef.scrollTop : 0;
        this.setState({
            scrollTop: scrollTop
        });
    }

    render() {
        return (
            <Wrapper innerRef={(ref) => this.wrapperRef = ref}>
                <PersonOversiktsPanel>
                    <VisittkortContainer/>
                    <Lameller/>
                </PersonOversiktsPanel>
                <DialogPanel>
                    <DialogPanelFixer scrollTop={this.state.scrollTop}>
                        <ComponentPlaceholder height={'100%'} name={'Dialog Panel'}/>
                    </DialogPanelFixer>
                </DialogPanel>
            </Wrapper>
        );
    }
}

export default MainLayout;
