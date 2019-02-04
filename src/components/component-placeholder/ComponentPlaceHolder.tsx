import * as React from 'react';
import styled from 'styled-components';

interface ComponentPlaceholderProps {
    name: string;
    height?: string;
    width?: string;
    hue?: number;
}

interface ComponentPlaceholderState {
    componentNumber: number;
    fontSize: number;
}

class ComponentPlaceholder extends React.Component<ComponentPlaceholderProps, ComponentPlaceholderState> {

    static componentCount: number = 0;
    private node!: HTMLDivElement;

    constructor(props: ComponentPlaceholderProps, state: ComponentPlaceholderState) {
        super(props, state);
        this.state = {
            componentNumber: ComponentPlaceholder.componentCount,
            fontSize: 25
        };
        ComponentPlaceholder.componentCount++;
    }

    setDynamicFontSize () {
        const componentHeight: number = this.node === null ? 0 : this.node.clientHeight;
        const fontSize: number = componentHeight / 15;
        this.setState({
            fontSize: fontSize
        });
    }

    componentDidMount() {
        this.setDynamicFontSize();
        this.node.addEventListener('resize', () => this.setDynamicFontSize());
    }

    componentWillUnmount() {
        this.node.removeEventListener('resize', this.setDynamicFontSize);
    }

    public render() {
        const hue = this.props.hue === undefined ? this.state.componentNumber * 54 : this.props.hue;
        const bgColor = `hsl(${hue}, 15%, 55%)`;
        const stripeColor = '#eee';

        const PlaceholderDiv = styled.div`
            background:
               repeating-linear-gradient(45deg, ${bgColor}, ${bgColor} 1.8em, ${stripeColor} 1.8em, ${stripeColor} 2em);
            height: ${this.props.height === undefined ? '100%' : this.props.height};
            width: ${this.props.width === undefined ? '100%' : this.props.width};
            display: flex;
            flex-grow: 1;
            align-items: center;
            justify-content: center;
        `;

        const VerticalTitle = styled.h1`
            margin: 0;
            transform: rotate(-80deg);
            font-size: ${this.state.fontSize}px;
            color: white;
            white-space: nowrap;
        `;

        return (
            <PlaceholderDiv ref={(ref: HTMLDivElement) => this.node = ref}>
                <VerticalTitle>{this.props.name}</VerticalTitle>
            </PlaceholderDiv>
        );
    }
}

export default ComponentPlaceholder;