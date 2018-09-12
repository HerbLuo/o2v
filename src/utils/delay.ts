export function delay(time: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}

export function alsoDelay<T>(time: number): (d: T) => Promise<T> {
    return (d: T): Promise<T> =>
        delay(time).then(() => d)
}
