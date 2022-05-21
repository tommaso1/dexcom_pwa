
export type DexcomDataRecord = {
    DT: string
    Value: number
    Trend: string
}

export function getTime(record: DexcomDataRecord): Date | string {
    const match = record.DT.match(/(\d+)/)
    if (match.length == 0) return 'Impossible to convert'

    return new Date(Number(match[0]))
}

export function getStandardDeviation(array: DexcomDataRecord[]) {
    const n = array.length
    const mean: number = array.reduce((a, b) => a + b.Value, 0) / n
    return Math.sqrt(array.map(x => Math.pow(x.Value - mean, 2)).reduce((a, b) => a + b, 0) / n)
}