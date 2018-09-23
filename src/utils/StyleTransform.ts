import * as ColorType from "color";
import {ThemedStyledProps} from "styled-components";
import {DetailedHTMLProps, HTMLAttributes} from "react";
const Color = ColorType;

type Props = ThemedStyledProps<DetailedHTMLProps<HTMLAttributes<any>, any>, any>

abstract class StyleTransformer {
    private readonly processQueue: Array<(str: string | undefined) => string | undefined> = [];

    handleAsNum(handler: (num: number) => number): this {
        this.processQueue.push((fromStr: string | undefined) => {
            if (!fromStr) {
                return
            }
            const mr = fromStr.match(StyleTransformer.RegGetNum1_2);
            if (!mr) {
                throw new Error('un support value' + fromStr)
            }
            return handler(Number(mr[1])) + mr[2]
        });
        return this;
    }

    scale(rate: number): this {
        this.handleAsNum(num => num * rate);
        return this
    }

    asColor(handler: (color: ColorType) => ColorType): this {
        this.processQueue.push((styleStr: string | undefined) => {
            if (!styleStr) {
                return
            }

            const color = Color(styleStr);
            return handler(color).rgb().string();
        });
        return this
    }

    default(val: string): this {
        this.processQueue.push(from => from || val);
        return this;
    }

    abstract getStyleValue(props: Props): string | undefined;

    value(defaultValue?: string): (props: Props) => string | undefined {
        if (defaultValue) {
            this.default(defaultValue)
        }

        return (props: any) => {
            return this.processQueue.reduce((sum, process) => {
                return process(sum)
            }, this.getStyleValue(props));
        }
    }

    static RegGetNum1_2 = /(\d+)(.*)/
}

export class StyleValue extends StyleTransformer {
    constructor(private readonly styleName: string) {
        super()
    }

    getStyleValue(props: Props): string | undefined {
        return props.style && (props.style as any)[this.styleName];
    }
}

export class PropValue extends StyleTransformer {
    constructor(private readonly propName: string) {
        super()
    }

    getStyleValue(props: Props): string | undefined {
        return (props as any)[this.propName];
    }
}

export class ThemeValue extends StyleTransformer {
    constructor(private readonly themeKey: string) {
        super();
    }

    getStyleValue(props: Props): string | undefined {
        return props.theme && props.theme[this.themeKey];
    }
}

export function getStyleValue (styleName: string, defaultValue?: string)
    : (props: Props) => string | undefined {
    return new StyleValue(styleName).value(defaultValue)
}
