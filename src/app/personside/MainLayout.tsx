import * as React from 'react';
import styled from 'styled-components';
import ComponentPlaceholder from '../../components/component-placeholder/ComponentPlaceHolder';
import VisittkortContainer from './visittkort/VisittkortContainer';
import Lameller from './lameller/Lameller';

const Wrapper = styled.div`
        width: 100%;
        flex-grow: 1;
        overflow-y: scroll;
    `;

const PersonOversiktsPanel = styled.section`
        width: 65%;
        padding: ${props => props.theme.margin.layout};
        > * {
          box-shadow: ${props => props.theme.boxShadow.layout};
        }
        > *:not(:last-child){
          margin-bottom: ${props => props.theme.margin.layout};
        }
    `;

interface DialogPanelProps {
    wrapperHeight: number;
    wrapperWidth: number;
    absoluteTop: number;
}

const DialogPanel = styled<DialogPanelProps, 'section'>('section')`
        position: fixed;
        left: ${props => props.wrapperWidth * 0.65}px;
        top: ${props => props.absoluteTop}px;
        width: ${props => props.wrapperWidth * 0.35}px;
        height: ${props => props.wrapperHeight}px;
        padding: ${props => props.theme.margin.layout};
        padding-left: 0;
        display: flex;
        flex-flow: column nowrap;
        > * {
          box-shadow: ${props => props.theme.boxShadow.layout};
          background-color: white;
        }
    `;

interface MainLayoutState {
    wrapperWidth: number;
    wrapperHeight: number;
    wrapperAbsoluteTop: number;
}

class MainLayout extends React.Component<{}, MainLayoutState> {

    private wrapperRef: HTMLDivElement;

    constructor(props: {}) {
        super(props);
        this.state = { wrapperWidth:  0, wrapperHeight: 0, wrapperAbsoluteTop: 0};
    }

    componentDidMount() {
        this.findWrapperDimensions();
        window.addEventListener('resize', () => this.findWrapperDimensions());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.findWrapperDimensions());
    }

    findWrapperDimensions() {
        const wrapperWidth = this.wrapperRef.clientWidth;
        const wrapperHeight = this.wrapperRef.clientHeight;
        const wrapperAbsoluteTop = this.wrapperRef.getBoundingClientRect().top;
        this.setState({
            wrapperWidth: wrapperWidth,
            wrapperHeight: wrapperHeight,
            wrapperAbsoluteTop: wrapperAbsoluteTop
        });
    }

    render() {
        return (
            <Wrapper innerRef={(ref: HTMLDivElement) => this.wrapperRef = ref}>
                <PersonOversiktsPanel>
                    <VisittkortContainer/>
                    <Lameller/>
                </PersonOversiktsPanel>
                <DialogPanel
                    wrapperHeight={this.state.wrapperHeight}
                    wrapperWidth={this.state.wrapperWidth}
                    absoluteTop={this.state.wrapperAbsoluteTop}
                >
                    <ComponentPlaceholder name={'Dialog Panel'}/>
                </DialogPanel>
            </Wrapper>
        );
    }
}

export default MainLayout;
