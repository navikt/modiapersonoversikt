import Downshift, { type ControllerStateAndHelpers, type StateChangeOptions } from 'downshift';
import { Input, type InputProps } from 'nav-frontend-skjema';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Normaltekst } from 'nav-frontend-typografi';
import type * as React from 'react';
import { type ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import EtikettGraa from '../../../../../../../components/EtikettGraa';
import theme from '../../../../../../../styles/personOversiktTheme';
import { useAutoCompleteSuggestions } from './useAutoCompleteSuggestions';

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
    &[aria-selected="true"] {
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

interface Props {
    value?: string;
    setValue: (newValue?: string | null) => void;
    name: string;
    label: React.ReactNode;
    suggestions: string[];
    topSuggestions?: string[];
    topSuggestionsLabel?: string;
    otherSuggestionsLabel?: string;
    spinner?: boolean;
    feil?: React.ReactNode;
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

function AutoComplete(props: Props) {
    const [input, setInput] = useState('');
    const [hightlightedItem, setHightlightedItem] = useState<string>();

    const { value, setValue } = props;

    useEffect(() => {
        if (value) {
            setInput(value);
        }
    }, [value]);

    const { filteredSuggestions, filteredTopSuggestions } = useAutoCompleteSuggestions({
        value,
        input,
        suggestions: props.suggestions,
        topSuggestions: props.topSuggestions
    });

    function handleStateChange(changes: StateChangeOptions<string>) {
        if (Object.hasOwn(changes, 'selectedItem')) {
            setValue(changes.selectedItem);
            setHightlightedItem(undefined);
        } else if (typeof changes.highlightedIndex === 'number') {
            const highlightedItem = [...filteredTopSuggestions, ...filteredSuggestions][changes.highlightedIndex];
            if (highlightedItem) setHightlightedItem(highlightedItem);
        } else if (changes.isOpen === false) {
            // isOpen er kun false idet autocomplete blir lukket
            if (hightlightedItem && changes.selectedItem) setValue(hightlightedItem);
        }
    }

    return (
        <Downshift<string>
            inputValue={input}
            selectedItem={value || null}
            onInputValueChange={(i) => setInput(i)}
            onStateChange={handleStateChange}
            itemToString={(item) => (item ? item : '')}
        >
            {(helpers: ControllerStateAndHelpers<string>) => {
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
                                id={props.name}
                                name={props.name}
                                feil={props.feil}
                                label={props.label}
                                value={input ?? ''}
                                onFocus={() => helpers.openMenu()}
                            />
                            {props.spinner && <StyledSpinner type={'S'} />}
                        </InputfeltWrapper>
                        {helpers.isOpen ? (
                            <DropDownWrapper>
                                <ul>
                                    {filteredTopSuggestions.length > 0 && (
                                        <>
                                            <li aria-hidden="true">
                                                <EtikettGraa>
                                                    {props.topSuggestionsLabel || 'Anbefalte forslag'}
                                                </EtikettGraa>
                                            </li>
                                            {filteredTopSuggestions.map((item) => (
                                                <SuggestionMarkup key={item} item={item} helpers={helpers} />
                                            ))}
                                            <li aria-hidden="true">
                                                <EtikettGraa>
                                                    {props.otherSuggestionsLabel || 'Andre forslag'}
                                                </EtikettGraa>
                                            </li>
                                        </>
                                    )}
                                    {filteredSuggestions.map((item) => (
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
