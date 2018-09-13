import * as React from "react";
import {isObject} from "../../utils/utils";

type CouldRenderTypes = string | number | undefined | null | Symbol
type CouldRenderPromise = Promise<CouldRenderTypes> | CouldRenderTypes

interface Props {
    p: CouldRenderPromise;
    children?: CouldRenderPromise;
    loadingAnimation?: React.ReactElement<any> | React.ComponentType;
}

interface State {
    value: CouldRenderTypes
}

export class PText extends React.Component<Props, State> {
    static Fetching = Symbol('fetching');
    static DefaultLoadingAnimation = <span>加载中</span>;

    constructor(props: Props) {
        super(props);
        this.state = {
            value: PText.Fetching
        };
        this.fetchDetail().catch(console.error)
    }

    fetchDetail() {
        const promise = this.props.children || this.props.p;
        return Promise.resolve(promise).then(result => {
            this.setState({
                value: result
            })
        })
    }

    render() {
        const { loadingAnimation, p, children, ...others } = this.props;

        let animation: React.ReactElement<any>;
        if (!loadingAnimation) {
            animation = PText.DefaultLoadingAnimation
        } else {
            if (isObject(loadingAnimation)) {
                animation = loadingAnimation as any
            } else {
                const LoadingAnimation: React.ComponentClass = loadingAnimation;
                animation = <LoadingAnimation />
            }
        }

        return this.state.value === PText.Fetching
          ? animation : <span {...others}>{this.state.value}</span>
    }
}

interface AnimationOneTwoThreeState {
    num: number
}

export class PTextAnimationOneTwoThree extends React
    .Component<{}, AnimationOneTwoThreeState> {
    areUnMount = false;

    constructor (props: {}) {
        super(props);
        this.state = {
            num: 1
        };
        const timer = setInterval(() => {
            if (this.areUnMount) {
                clearInterval(timer);
                return
            }
            this.setState({
                num: (this.state.num + 1) % 4
            })
        }, 777)
    }

    render() {
        return <span>
            {Array(this.state.num).fill(0).map(() => '.')}
        </span>
    }

    componentWillUnmount() {
        this.areUnMount = true
    }
}
