import * as React from 'react'
import {isPromise} from "../../utils/utils";

type AllowedValueTypes = any

export interface PLayoutProps<T> {
    p: Promise<T> | T;
    onResolve?: (value: T) => React.ReactElement<any>;
    onReject?: (reason: any) => React.ReactElement<any>;
    onPending?: () => React.ReactElement<any>;
    children?: (state: Pick<State<T>, "resolved">) => React.ReactElement<any>;
}

interface State<T> {
    resolved: false | T;
    rejected: false | any;
    pending: boolean
}

export class PLayout<T extends AllowedValueTypes>
    extends React.Component<PLayoutProps<T>, State<T>> {
    state: State<T> = {
        resolved: false,
        rejected: false,
        pending: true
    };

    constructor(props: PLayoutProps<T>) {
        super(props);
        if (isPromise(props.p)) {
            props.p.then(this.resolve).catch(this.reject);
        } else {
            this.resolve(props.p)
        }
    }

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
        const {children, onResolve, onPending, onReject} = this.props;

        let content: React.ReactElement<any> | null;
        if (children) {
            content = children(this.state)
        } else {
            if (resolved !== false && onResolve) {
                content = onResolve(resolved)
            } else if (rejected !== false && onReject) {
                content = onReject(rejected)
            } else if (pending !== false && onPending) {
                content = onPending()
            } else {
                content = null
            }
        }
        return content
    }

    render() {
        return <div className="o2v-layout">
            {this.asLayout()
                ? this.props.children
                : this.getContentByPromise()}
        </div>
    }
}
