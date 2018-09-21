import {css, ThemedStyledProps} from 'styled-components';
import {DetailedHTMLProps, HTMLAttributes} from 'react';

export const boxFix = css`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
`;

type Props = ThemedStyledProps<DetailedHTMLProps<HTMLAttributes<any>, any>, any>

export class StyleValue {
    private readonly processQueue: Array<(str: string | undefined) => string | undefined> = [];

    constructor(private readonly styleName: string) {
    }

    handleAsNum(handler: (num: number) => number): this {
        this.processQueue.push((fromStr: string | undefined) => {
            if (!fromStr) {
                return
            }
            const mr = fromStr.match(StyleValue.RegGetNum1_2);
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

    default(val: string): this {
        this.processQueue.push(from => from || val);
        return this;
    }

    value(defaultValue?: string): (props: Props) => string | undefined {
        if (defaultValue) {
            this.default(defaultValue)
        }

        return (props: any) => {
            let styleValue: string | undefined = props.style && props.style[this.styleName];
            styleValue = this.processQueue.reduce((sum, process) => {
                return process(sum)
            }, styleValue);
            return styleValue;
        }
    }

    static RegGetNum1_2 = /(\d+)(.*)/
}

export function getStyleValue (styleName: string, defaultValue?: string)
    : (props: Props) => string | undefined {
    return new StyleValue(styleName).value(defaultValue)
}
