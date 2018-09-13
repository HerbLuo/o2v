import * as React from 'react'
import {types} from "util";
import {isPromise} from '../../utils/utils';

type AllowedValueTypes = any

export interface PLayoutProps<T> {
    p?: Promise<T>;
    onResolve?: (value: T) => void;
    onReject?: (reason: any) => void;
    children: React.ReactElement<any>;
}

interface State<T> {
    resolved: boolean | T;
    rejected: boolean | any;
    pending: boolean
}

export class PLayout<T extends AllowedValueTypes>
    extends React.Component<PLayoutProps<T>, State<T>> {
    state = {
        resolved: isPromise(this.props.p) ? false : ''
    };

    asLayout(): boolean {
        return this.props.p === undefined
    };

    render() {
        return <div>
            {this.asLayout()
                ? this.props.children
                : ''
            }
        </div>
    }
}
