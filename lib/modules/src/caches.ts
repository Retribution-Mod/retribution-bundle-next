import {
    callNativeMethod,
    callNativeMethodSync,
} from '@retribution-mod/modules/native'
import { debounce } from '@retribution-mod/utils/callback'
import type { Metro } from '@retribution-mod/modules/types'
import type { FilterResultFlag } from './finders/_internal'
import type { Filter } from './finders/filters'

const ExpectedCacheVersion = 3

export const Uncached: Cache = {
    blacklist: [],
    finds: {},
    version: ExpectedCacheVersion,
}

// In-memory cache
export let cache: Cache =
    callNativeMethodSync('Retribution.caches.modules.read', []) ?? Uncached

if (cache.version !== ExpectedCacheVersion) {
    Uncached.outdated = true
    cache = Uncached
}

export type Blacklist = Metro.ModuleID[]
export type Finds = Record<
    Filter['key'],
    Record<Metro.ModuleID, FilterResultFlag> | null
>

export interface Cache {
    blacklist: Blacklist
    finds: Finds
    version: number
    /** Indicates if the loader cache on an outdated format */
    outdated?: boolean
}

const save = debounce(() => {
    callNativeMethod('Retribution.caches.modules.write', [
        cache.blacklist,
        cache.finds,
    ])
}, 1000)

export function cacheBlacklistedModule(id: Metro.ModuleID): boolean {
    cache.blacklist.push(id)
    save()

    return true
}

export function cacheFilterResultForId(
    key: keyof Finds,
    id: Metro.ModuleID,
    flag: FilterResultFlag,
): FilterResultFlag {
    const reg = (cache.finds[key] ??= {})
    reg[id] = flag

    save()

    return flag
}

export function cacheFilterNotFound(key: keyof Finds) {
    cache.finds[key] = null
}

export const getFilterMatches = (
    key: keyof Finds,
): Finds[keyof Finds] | undefined => cache.finds[key]

export const getBlacklistedModules = () => cache.blacklist

declare module '@retribution-mod/modules/native' {
    interface NativeMethods {
        'Retribution.caches.modules.read': [[], Cache | null]
        'Retribution.caches.modules.write': [
            [blacklist: Blacklist, finds: Finds],
            void,
        ]
    }
}
