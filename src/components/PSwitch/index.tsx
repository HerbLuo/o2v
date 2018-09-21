import * as React from 'react'
import styled from 'styled-components'
import {boxFix, getStyleValue, StyleValue} from "../common/styles";

export interface PSwitchProps {

}

interface State {

}

export class PSwitch extends React.Component<PSwitchProps, State> {
    render () {
        return <SwitchSpan className="dev" style={{width: '48px', height: '48px'}}>
            <input type="checkbox" />
        </SwitchSpan>
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
    background-color: rgb(225, 0, 80);
    opacity: 0.5;
    height: ${new StyleValue('width').scale(14 / 48).value()};
    width: ${new StyleValue('width').scale(34 / 48).value()};
    border-radius: ${new StyleValue('width').scale(7 / 48).value()};
    text-shadow: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: ${new StyleValue('width').scale(20 / 48).value()};
    height: ${new StyleValue('width').scale(20 / 48).value()};
    right: ${new StyleValue('width').scale(4 / 48).value()};
    border-radius: 50%;
    background-color: rgb(255, 0, 80);
  }
  
  input[type=checkbox] {
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
  }
`;
