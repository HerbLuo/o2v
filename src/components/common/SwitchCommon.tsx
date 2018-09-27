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
    checked: boolean
}

export class SwitchCommon extends React.Component<SwitchCommonProps, SwitchCommonState> {
    state = {
        checked: false
    };

    private setChecked = (checked: boolean) => this.setState({checked});
    turnOn = this.setChecked.bind(this, true);
    turnOff = this.setChecked.bind(this, false);

    // static getDerivedStateFromProps(nextProps: SwitchCommonProps, prevState: SwitchCommonState) {
    //     console.log(nextProps);
    //     console.log(prevState);
    //     if (nextProps.checked !== prevState.checked) {
    //         return {
    //             checked: nextProps.checked
    //         }
    //     }
    //     return null
    // }

    onChange = (e: React.SyntheticEvent<React.InputHTMLAttributes<any>>) => {
        const checked = e.currentTarget.checked;
        console.log(checked);

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
