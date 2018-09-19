import * as React from 'react'
import styled from 'styled-components'

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
  display: inline-flex;
  width: 48px;
  height: 48px;
  
  input[type=checkbox] {
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
  }
`;
