import { __extends, __rest, __assign } from 'tslib';
import { createElement, Component } from 'react';

// these helpers produces better vm code in JS engines due to their
function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

var PImage = /** @class */ (function (_super) {
    __extends(PImage, _super);
    function PImage(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            src: PImage.Fetching
        };
        _this.fetchDetail().catch(console.error);
        return _this;
    }
    PImage.prototype.fetchDetail = function () {
        var _this = this;
        var promise = this.props.srcP;
        return Promise.resolve(promise).then(function (result) {
            _this.setState({
                src: result
            });
        });
    };
    PImage.prototype.render = function () {
        var _a = this.props, srcP = _a.srcP, loadingAnimation = _a.loadingAnimation, others = __rest(_a, ["srcP", "loadingAnimation"]);
        var animation;
        if (!loadingAnimation) {
            animation = PImage.DefaultLoadingAnimation;
        }
        else {
            if (isObject(loadingAnimation)) {
                animation = loadingAnimation;
            }
            else {
                var LoadingAnimation = loadingAnimation;
                animation = createElement(LoadingAnimation, null);
            }
        }
        return this.state.src === PImage.Fetching
            ? animation : createElement("img", __assign({ src: this.state.src }, others));
    };
    PImage.Fetching = Symbol('fetching');
    PImage.DefaultLoadingAnimation = createElement("span", null, "\u52A0\u8F7D\u4E2D");
    return PImage;
}(Component));

var PText = /** @class */ (function (_super) {
    __extends(PText, _super);
    function PText(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: PText.Fetching
        };
        _this.fetchDetail().catch(console.error);
        return _this;
    }
    PText.prototype.fetchDetail = function () {
        var _this = this;
        var promise = this.props.children || this.props.p;
        return Promise.resolve(promise).then(function (result) {
            _this.setState({
                value: result
            });
        });
    };
    PText.prototype.render = function () {
        var _a = this.props, loadingAnimation = _a.loadingAnimation, p = _a.p, children = _a.children, others = __rest(_a, ["loadingAnimation", "p", "children"]);
        var animation;
        if (!loadingAnimation) {
            animation = PText.DefaultLoadingAnimation;
        }
        else {
            if (isObject(loadingAnimation)) {
                animation = loadingAnimation;
            }
            else {
                var LoadingAnimation = loadingAnimation;
                animation = createElement(LoadingAnimation, null);
            }
        }
        return this.state.value === PText.Fetching
            ? animation : createElement("span", __assign({}, others), this.state.value);
    };
    PText.Fetching = Symbol('fetching');
    PText.DefaultLoadingAnimation = createElement("span", null, "\u52A0\u8F7D\u4E2D");
    return PText;
}(Component));
var PTextAnimationOneTwoThree = /** @class */ (function (_super) {
    __extends(PTextAnimationOneTwoThree, _super);
    function PTextAnimationOneTwoThree(props) {
        var _this = _super.call(this, props) || this;
        _this.areUnMount = false;
        _this.state = {
            num: 1
        };
        var timer = setInterval(function () {
            if (_this.areUnMount) {
                clearInterval(timer);
                return;
            }
            _this.setState({
                num: (_this.state.num + 1) % 4
            });
        }, 777);
        return _this;
    }
    PTextAnimationOneTwoThree.prototype.render = function () {
        return createElement("span", null, Array(this.state.num).fill(0).map(function () { return '.'; }));
    };
    PTextAnimationOneTwoThree.prototype.componentWillUnmount = function () {
        this.areUnMount = true;
    };
    return PTextAnimationOneTwoThree;
}(Component));

export { PImage, PText };
