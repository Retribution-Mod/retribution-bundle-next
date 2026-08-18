import {
    callNativeMethod,
    callNativeMethodSync,
} from '@retribution-mod/modules/native'

export function readFile(path: string) {
    return callNativeMethod('Retribution.fs.read', [path])
}

export function writeFile(path: string, data: string) {
    return callNativeMethod('Retribution.fs.write', [path, data])
}

export function exists(path: string) {
    return callNativeMethod('Retribution.fs.exists', [path])
}

export function rm(path: string) {
    return callNativeMethod('Retribution.fs.delete', [path])
}

export function existsSync(path: string) {
    return callNativeMethodSync('Retribution.fs.exists', [path])
}

export function readFileSync(path: string) {
    return callNativeMethodSync('Retribution.fs.read', [path])
}

export function writeFileSync(path: string, data: string) {
    return callNativeMethodSync('Retribution.fs.write', [path, data])
}

export function rmSync(path: string) {
    return callNativeMethodSync('Retribution.fs.delete', [path])
}

export function deleteFileSync(path: string) {
    return callNativeMethodSync('Retribution.fs.delete', [path])
}

export function getConstants() {
    return callNativeMethodSync('Retribution.fs.getConstants', [])
}

declare module '@retribution-mod/modules/native' {
    export interface NativeMethods {
        'Retribution.fs.getConstants': [
            [],
            {
                data: string
                files: string
                cache: string
            },
        ]
        'Retribution.fs.read': [[path: string], string]
        'Retribution.fs.write': [[path: string, data: string], void]
        'Retribution.fs.exists': [[path: string], boolean]
        'Retribution.fs.delete': [[path: string], boolean]
    }
}
