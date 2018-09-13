import * as React from "react";
import {isObject} from "../../utils/utils";

type ImageSrcPromise = Promise<string> | string

interface Props {
    srcP: ImageSrcPromise;
    loadingAnimation?: React.ReactElement<any> | React.ComponentType;
}

interface State {
    src: string | Symbol
}

class PImage extends React.Component<Props, State> {
    static Fetching = Symbol('fetching');
    static DefaultLoadingAnimation = <span>加载中</span>;

    state: State = {
        src: PImage.Fetching
    };

    constructor(props: Props) {
        super(props);
        this.fetchDetail().catch(console.error)
    }

    fetchDetail() {
        const promise = this.props.srcP;
        return Promise.resolve(promise).then(result => {
            this.setState({
                src: result
            })
        })
    }

    render() {
        const { srcP, loadingAnimation, ...others } = this.props;

        let animation: React.ReactElement<any>;
        if (!loadingAnimation) {
            animation = PImage.DefaultLoadingAnimation
        } else {
            if (isObject(loadingAnimation)) {
                animation = loadingAnimation as any
            } else {
                const LoadingAnimation: React.ComponentClass = loadingAnimation;
                animation = <LoadingAnimation />
            }
        }

        return this.state.src === PImage.Fetching
            ? animation : <img src={this.state.src as string} {...others}/>
    }
}

export {
    PImage
}
