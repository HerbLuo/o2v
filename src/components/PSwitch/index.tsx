import * as React from 'react'
import styled from 'styled-components'
import {boxFix} from "../common/styles";

export interface PSwitchProps {

}

interface State {

}

export class PSwitch extends React.Component<PSwitchProps, State> {
    render () {
        return <SwitchSpan className="dev">
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
  
  width: 48px;
  height: 48px;
  
  &::before {
    content: '';
    position: absolute;
    background-color: rgb(225, 0, 80);
    opacity: 0.5;
    height: 14px;
    width: 34px;
    border-radius: 7px;
    text-shadow: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgb(255, 0, 80);
    right: 0;
  }
  
  input[type=checkbox] {
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
  }
`;
