import * as React from 'react'
import styled from 'styled-components'
import {boxFix} from "../common/styles";
import {getStyleValue, StyleValue} from "../../utils/StyleTransform";
import {SwitchBaseProps, SwitchCommon} from "../common/SwitchCommon";

export interface PSwitchProps extends SwitchBaseProps {
}

export class PSwitch extends React.Component<PSwitchProps> {
    render () {
        return <SwitchCommon {...this.props}>{it =>
            <SwitchSpan
                className={it.state.checked ? 'on' : 'off'}
                style={PSwitch.defaultStyle}>
                <input
                    type="checkbox"
                    checked={it.state.checked}
                    onChange={it.onChange}
                />
            </SwitchSpan>
        }</SwitchCommon>
    }

    static defaultStyle: React.CSSProperties = {
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
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2),
        0 1px 1px 0 rgba(0, 0, 0, 0.14), 
        0 2px 1px -1px rgba(0, 0, 0, 0.12);
    }
    
    &.off{
        &::before {
            background-color: #000;
            opacity: 0.38;
        }
        &::after {
            background-color: white;
            right: ${new StyleValue('width').scale(24 / 48).value()}
        }
    }

    input[type=checkbox] {
        width: 100%;
        height: 100%;
        cursor: pointer;
        opacity: 0;
        z-index: 1;
    }
`;
