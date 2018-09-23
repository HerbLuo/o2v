import * as React from 'react'
import styled from 'styled-components'
import {boxFix} from "../common/styles";
import {getStyleValue, StyleValue} from "../../utils/StyleTransform";
import {CSSProperties} from "react";

export interface PSwitchProps {

}

interface State {

}

export class PSwitch extends React.Component<PSwitchProps, State> {
    render () {
        return <SwitchSpan
            className="dev"
            style={PSwitch.defaultStyle}>
            <input type="checkbox" />
        </SwitchSpan>
    }

    static defaultStyle: CSSProperties = {
        width: '48px',
        height: '48px',
        color: 'rgb(255, 0, 80)'
    }
}

const SwitchSpan = styled.span`
    &, * {
        ${boxFix}
    }

    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    width: ${getStyleValue('width')};
    height: ${getStyleValue('height')};

    &::before {
        content: '';
        position: absolute;
        opacity: 0.5;
        height: ${new StyleValue('width').scale(14 / 48).value()};
        width: ${new StyleValue('width').scale(34 / 48).value()};
        border-radius: ${new StyleValue('width').scale(7 / 48).value()};
        text-shadow: none;
        background-color: ${new StyleValue('color')
            .asColor(color => color.lighten(0.4)).value()
        };
    }

    &::after {
        content: '';
        position: absolute;
        width: ${new StyleValue('width').scale(20 / 48).value()};
        height: ${new StyleValue('width').scale(20 / 48).value()};
        right: ${new StyleValue('width').scale(4 / 48).value()};
        border-radius: 50%;
        background-color: ${new StyleValue('color').value()};
    }

    input[type=checkbox] {
        width: 100%;
        height: 100%;
        cursor: pointer;
        opacity: 0;
        z-index: 1;
    }
`;
