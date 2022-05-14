import 'dart:convert';


export type DexcomDataRecord = {
    dt: string
    value: number
    trend: string
}

export function getTime(record: DexcomDataRecord): Date | string {
    const match = record.dt.match(/(\d+)/)
    if (match.length == 0) return 'Impossible to convert'

    return new Date(Number(match[0]))
}
