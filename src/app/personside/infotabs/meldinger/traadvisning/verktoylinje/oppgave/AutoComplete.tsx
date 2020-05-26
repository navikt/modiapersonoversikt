import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Downshift, { ControllerStateAndHelpers } from 'downshift';
import styled from 'styled-components/macro';
import { Normaltekst } from 'nav-frontend-typografi';
import theme from '../../../../../../../styles/personOversiktTheme';
import { Input, InputProps } from 'nav-frontend-skjema';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import EtikettGrå from '../../../../../../../components/EtikettGrå';
import { isNumber } from 'util';
import { guid } from 'nav-frontend-js-utils';

const DropDownWrapper = styled.div`
    ul {
        z-index: 1000;
        position: absolute;
        top: 100%;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
        max-height: 20rem;
        overflow: auto;
    }
    li {
        min-width: 20rem;
        padding: 0.5rem 1rem;
        border: solid 0.05rem rgba(0, 0, 0, 0.2);
        background-color: white;
        color: black;
        display: flex;
        &[aria-selected='true'] {
            background-color: ${theme.color.navLysGra};
            border: ${theme.border.skille};
        }
    }
`;

const Style = styled.div`
    position: relative;
`;

const StyledSpinner = styled(NavFrontendSpinner)`
    position: absolute !important;
    bottom: 0.4rem;
    right: 0.4rem;
`;

const InputfeltWrapper = styled.div`
    position: relative;
    .skjemaelement {
        margin-bottom: 0;
    }
`;

interface Props<Item> {
    value?: string;
    itemToString: (item: Item) => string;
    label: string;
    suggestions: Item[];
    topSuggestions?: Item[];
    topSuggestionsLabel?: string;
    otherSuggestionsLabel?: string;
    spinner?: boolean;
    feil?: SkjemaelementFeilmelding;
    onChange: (event: ChangeEvent<Element>) => void | undefined;
    itemValue?: Item;
}

function SuggestionMarkup<Item>(props: { item: Item; helpers: ControllerStateAndHelpers<Item> }) {
    return (
        <li
            {...props.helpers.getItemProps({
                item: props.item
            })}
        >
            <Normaltekst>{props.helpers.itemToString(props.item)}</Normaltekst>
        </li>
    );
}

function AutoComplete<Item>(props: Props<Item>) {
    const [input, setInput] = useState('');
    const [hightlightedItem, setHightlightedItem] = useState<Item | undefined>(undefined);

    const { itemToString, itemValue } = props;

    useEffect(() => {
        if (itemValue) {
            setInput(itemToString(itemValue));
        }
    }, [itemToString, itemValue]);

    const showItemBasedOnInput = (input: string | null) => (item: Item) => {
        if (!input || input === '') {
            return true;
        }
        if (itemValue && input === itemToString(itemValue)) {
            // Denne sjekken sørger for at man får opp alle alternativer når man kommer tilbake til et felt som allerede er satt.
            return true;
        }
        return itemToString(item)
            .toLowerCase()
            .includes(input.toLowerCase());
    };

    const filteredTopSuggetions = props.topSuggestions ? props.topSuggestions.filter(showItemBasedOnInput(input)) : [];
    const itemNotInTopSuggestions = (item: Item) =>
        !filteredTopSuggetions.some(it => itemToString(it) === itemToString(item));
    const filteredSuggestions = props.suggestions.filter(showItemBasedOnInput(input)).filter(itemNotInTopSuggestions);

    const inputRef = useRef(guid());
    const setValue = (item: Item) =>
        props.onChange(({ target: inputRef, currentTarget: inputRef } as unknown) as ChangeEvent<HTMLInputElement>);

    const handleStateChange = (changes: any) => {
        if (changes.hasOwnProperty('selectedItem')) {
            setValue(changes.selectedItem);
            setHightlightedItem(undefined);
        } else if (isNumber(changes.highlightedIndex)) {
            const highlightedItem = [...filteredTopSuggetions, ...filteredSuggestions][changes.highlightedIndex];
            highlightedItem && setHightlightedItem(highlightedItem);
        } else if (changes.isOpen === false) {
            // isOpen er kun false idet autocomplete blir lukket
            hightlightedItem && changes.selectedItem && setValue(hightlightedItem);
        }
    };

    return (
        <Downshift
            inputValue={input}
            selectedItem={itemValue || null}
            onInputValueChange={i => setInput(i)}
            onStateChange={handleStateChange}
            itemToString={(item: Item | null) => (item ? itemToString(item) : '')}
        >
            {(helpers: ControllerStateAndHelpers<Item>) => {
                const inputProps: Partial<InputProps> = helpers.getInputProps({
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                        if (e.target.value === '') {
                            helpers.clearSelection();
                        }
                    }
                });

                return (
                    <Style {...helpers.getRootProps()}>
                        <InputfeltWrapper>
                            <Input
                                {...inputProps}
                                feil={props.feil}
                                label={props.label}
                                onFocus={() => helpers.openMenu()}
                                ref={inputRef.current}
                            />
                            {props.spinner && <StyledSpinner type={'S'} />}
                        </InputfeltWrapper>
                        {helpers.isOpen ? (
                            <DropDownWrapper>
                                <ul>
                                    {filteredTopSuggetions.length > 0 && (
                                        <>
                                            <li aria-hidden="true">
                                                <EtikettGrå>
                                                    {props.topSuggestionsLabel || 'Anbefalte forslag'}
                                                </EtikettGrå>
                                            </li>
                                            {filteredTopSuggetions.map(item => (
                                                <SuggestionMarkup
                                                    key={itemToString(item)}
                                                    item={item}
                                                    helpers={helpers}
                                                />
                                            ))}
                                            <li aria-hidden="true">
                                                <EtikettGrå>
                                                    {props.otherSuggestionsLabel || 'Andre forslag'}
                                                </EtikettGrå>
                                            </li>
                                        </>
                                    )}
                                    {filteredSuggestions.map(item => (
                                        <SuggestionMarkup
                                            key={helpers.itemToString(item)}
                                            item={item}
                                            helpers={helpers}
                                        />
                                    ))}
                                </ul>
                            </DropDownWrapper>
                        ) : null}
                    </Style>
                );
            }}
        </Downshift>
    );
}

export default AutoComplete;
