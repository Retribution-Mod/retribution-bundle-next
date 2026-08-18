import { callNativeMethodSync } from '@retribution-mod/modules/native'

export function reloadApp() {
    callNativeMethodSync('Retribution.app.reload', [])
}

declare module '@retribution-mod/modules/native' {
    interface NativeMethods {
        'Retribution.app.reload': [[], null]
    }
}
