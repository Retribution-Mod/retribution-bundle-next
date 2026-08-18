import { callNativeMethod } from '@retribution-mod/modules/native'
import { getErrorStack } from '@retribution-mod/utils/error'
import { BuildEnvironment, FullVersion } from '~constants'
import type { Metro } from '@retribution-mod/modules/types'

// @ts-expect-error
globalThis.ErrorUtils = {
    // RN JSI only requires these two properties:
    // https://github.com/facebook/react-native/blob/802e1a7/packages/react-native/ReactCommon/cxxreact/ErrorUtils.h#L18-L19
    reportError: onError,
    reportFatalError: onError,
}

Object.defineProperty(globalThis, '__registerSegment', {
    configurable: true,
    set(registerSegment: Metro.RegisterSegmentFn) {
        // @ts-expect-error
        // biome-ignore lint/performance/noDelete: Prevent infinite set loop
        delete globalThis.__registerSegment
        globalThis.__registerSegment = registerSegment

        // @as-require
        import('./preinit')
    },
})

export function onError(error: unknown) {
    const stack = getErrorStack(error)

    callNativeMethod('Retribution.alertError', [
        stack,
        `${FullVersion} (${BuildEnvironment})`,
    ])

    nativeLoggingHook(`\u001b[31m${stack}\u001b[0m`, 2)
}

declare module '@retribution-mod/modules/native' {
    export interface NativeMethods {
        'Retribution.alertError': [[error: string, version: string], void]
    }
}
