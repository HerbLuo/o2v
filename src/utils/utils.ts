// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining

export function isPositive(obj: any): boolean {
    return !!obj
}

export function isTrue(obj: any): obj is true {
    return obj === true
}

export function isArray(obj: any): obj is Array<any> {
    return obj instanceof Array
}

export function isObject(obj: any): obj is object {
    return obj !== null && typeof obj === 'object'
}

export function isString(obj: any): obj is string {
    return typeof obj === 'string'
}

export function isFunction(obj: any): obj is Function {
    return typeof obj === 'function'
}

export function isEven(obj: number): boolean {
    return obj % 2 === 0
}

export function isBoolean(obj: any): boolean {
    return obj === true || obj === false
}

export function isUndefined(obj: any): boolean {
    return obj === undefined
}

export function isEs6Class(obj: any): boolean {
    return obj && isFunction(obj.toString) && obj.toString().startsWith('class');
}

export function isPromise(obj: any): obj is Promise<any> {
    return obj instanceof Promise
}
