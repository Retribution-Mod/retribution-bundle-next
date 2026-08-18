import {
    callNativeMethod,
    callNativeMethodSync,
} from '@retribution-mod/modules/native'
import { debounce } from '@retribution-mod/utils/callback'
import type { Metro } from '@retribution-mod/modules/types'
import type { Asset } from './types'

const ExpectedCacheVersion = 2

export const Uncached: Cache = {
    data: {},
    version: ExpectedCacheVersion,
}

// In-memory cache
export let cache: Cache =
    callNativeMethodSync('Retribution.caches.assets.read', []) ?? Uncached

if (cache.version !== ExpectedCacheVersion) {
    Uncached.outdated = true
    cache = Uncached
}

export interface Cache {
    data: {
        [key: Asset['name']]: {
            [key: Asset['type']]: Metro.ModuleID
        }
    }
    version: number
    /** Indicates if the loader cache on an outdated format */
    outdated?: boolean
}

const save = debounce(() => {
    callNativeMethod('Retribution.caches.assets.write', [cache.data])
}, 1000)

export function cacheAsset(asset: Asset, moduleId: Metro.ModuleID) {
    const reg = (cache.data[asset.name] ??= {})
    reg[asset.type] = moduleId

    save()
}

declare module '@retribution-mod/modules/native' {
    interface NativeMethods {
        'Retribution.caches.assets.read': [[], Cache | null]
        'Retribution.caches.assets.write': [[data: Cache['data']], void]
    }
}
