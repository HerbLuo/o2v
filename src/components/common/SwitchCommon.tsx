import * as React from 'react'

export interface SwitchBaseProps {
    value: string;
    onChange: Function;
    checked: boolean;
    [key: string]: any;
}

interface SwitchCommonProps extends SwitchBaseProps {
    children: (sc: SwitchCommon) => React.ReactElement<SwitchBaseProps>
}

interface SwitchCommonState {
    checked: boolean;
    oldPropsChecked: boolean | null;
}
const defaultState: SwitchCommonState = {
    checked: false,
    oldPropsChecked: null
};

export class SwitchCommon extends React.Component<SwitchCommonProps, SwitchCommonState> {
    state = defaultState;

    private setChecked = (checked: boolean) => this.setState({checked});
    turnOn = this.setChecked.bind(this, true);
    turnOff = this.setChecked.bind(this, false);

    static getDerivedStateFromProps(
        nextProps: SwitchCommonProps, prevState: SwitchCommonState): SwitchCommonState | null {
        if (nextProps.checked === prevState.oldPropsChecked) {
            return null
        }
        return {
            checked: nextProps.checked,
            oldPropsChecked: nextProps.checked
        }
    }

    onChange = (e: React.SyntheticEvent<React.InputHTMLAttributes<any>>) => {
        const checked = e.currentTarget.checked;

        if (checked) {
            this.turnOn()
        } else {
            this.turnOff()
        }
    };

    render () {
        const {className, style, children, ...others} = this.props;
        const element = children(this);
        const props = element.props;
        const newProps = Object.assign({}, props, {
            className: props.className + ' ' + className,
            style: Object.assign({}, props.style, style),
            ...others
        });
        return React.cloneElement(element, newProps, props.children)
    }
}
