import * as React from 'react'
import {isPromise} from "../../utils/utils";
import styled from 'styled-components'

type AllowedValueTypes = any

export interface PLayoutProps<T> {
    p: Promise<T> | T;
    onResolve?: (value: T) => React.ReactElement<any>;
    onReject?: (reason: any) => React.ReactElement<any>;
    onPending?: () => React.ReactElement<any>;
    children?: React.ReactElement<any>;
    [key: string]: any;
}

interface State<T> {
    resolved: false | T;
    rejected: false | any;
    pending: boolean
}

export class PLayout<T extends AllowedValueTypes>
    extends React.PureComponent<PLayoutProps<T>, State<T>> {
    state: State<T> = {
        resolved: false,
        rejected: false,
        pending: true
    };

    resolve = (value: T) =>
        this.setState({
            resolved: value,
            pending: false
        });

    reject = (reason: any) =>
        this.setState({
            rejected: reason,
            pending: false
        });

    asLayout(): boolean {
        return this.props.p === undefined
    };

    getContentByPromise(): React.ReactElement<any> | null {
        const {resolved, rejected, pending} = this.state;
        const {onResolve, onPending, onReject} = this.props;

        let content: React.ReactElement<any> | null;
        if (resolved !== false && onResolve) {
            content = onResolve(resolved)
        } else if (rejected !== false && onReject) {
            content = onReject(rejected)
        } else if (pending !== false && onPending) {
            content = onPending()
        } else {
            content = null
        }
        return content
    }

    props2state() {
        if (isPromise(this.props.p)) {
            this.props.p.then(this.resolve).catch(this.reject);
        } else {
            this.state.resolved = this.props.p;
            this.state.pending = false;
        }
    }

    render() {
        const {
            p, onResolve, onPending, onReject, children,
            className, ...others
        } = this.props;

        this.props2state();

        return <O2vLayout {...others}>
            {this.asLayout()
                ? this.props.children
                : this.getContentByPromise()}
        </O2vLayout>
    }
}

const O2vLayout = styled.div`
  display: flex;
`;
