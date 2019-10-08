import React, { useCallback } from 'react';
import { Ansatt } from '../../../../../../../models/meldinger/oppgave';
import Downshift from 'downshift';
import theme from '../../../../../../../styles/personOversiktTheme';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import { getMockAnsatte } from '../../../../../../../mock/meldinger/oppgave-mock';
import { Input } from 'nav-frontend-skjema';

const DropDownWrapper = styled.div`
    position: relative;
    ul {
        z-index: 1000;
        position: absolute;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
    }
    li {
        &:hover,
        &:focus {
            background-color: ${theme.color.navLysGra};
        }
        min-width: 20rem;
        padding: 0.5rem 1rem;
        border: solid 0.05rem rgba(0, 0, 0, 0.2);
        background-color: white;
        color: black;
        display: flex;
    }
`;

interface Props {
    setValue: (value: Ansatt) => void;
    inputValue: Ansatt | undefined;
}

function AnsattDropdown(props: Props) {
    const handleStateChange = useCallback(
        (changes: any) => {
            if (changes.hasOwnProperty('selectedItem')) {
                props.setValue(changes.selectedItem);
            }
        },
        [props]
    );

    const suggestions: Ansatt[] = getMockAnsatte();

    return (
        <Downshift
            selectedItem={props.inputValue}
            onStateChange={handleStateChange}
            itemToString={(item: Ansatt) => (item ? item.fornavn + ' ' + item.etternavn : '')}
        >
            {helpers => (
                <div>
                    <Input
                        // @ts-ignore
                        {...helpers.getInputProps({
                            onChange: e => {
                                if (e.target.value === '') {
                                    helpers.clearSelection();
                                }
                            }
                        })}
                        label={'Velg ansatt'}
                        onFocus={() => helpers.openMenu()}
                    />
                    {helpers.isOpen ? (
                        <DropDownWrapper>
                            <ul>
                                {suggestions
                                    .filter(
                                        item =>
                                            !helpers.inputValue ||
                                            item.fornavn.toLowerCase().includes(helpers.inputValue.toLowerCase()) ||
                                            item.etternavn.toLowerCase().includes(helpers.inputValue.toLowerCase()) ||
                                            item.ident.toLowerCase().includes(helpers.inputValue.toLowerCase())
                                    )
                                    .map((item, index) => (
                                        <li
                                            {...helpers.getItemProps({
                                                key: item.ident,
                                                index,
                                                item,
                                                style: {
                                                    backgroundColor:
                                                        helpers.selectedItem === item
                                                            ? theme.color.navLysGra
                                                            : '#ffffff',
                                                    fontWeight: helpers.selectedItem === item ? 'bold' : 'normal'
                                                }
                                            })}
                                        >
                                            <Normaltekst>
                                                {item.fornavn} {item.etternavn} ({item.ident})
                                            </Normaltekst>
                                        </li>
                                    ))}
                            </ul>
                        </DropDownWrapper>
                    ) : null}
                </div>
            )}
        </Downshift>
    );
}

export default AnsattDropdown;
