export type Nullish = null | undefined
export type If<T, Then, Else> = T extends true ? Then : Else
export type Not<T extends boolean> = T extends true ? false : true
export type AnyObject = Record<PropertyKey, any>
export type AnyFunction = (...args: any[]) => any
export type LogicalOr<T1, T2> = T1 extends true
    ? true
    : T2 extends true
      ? true
      : false
export type LogicalAnd<T1, T2> = T1 extends true
    ? T2 extends true
        ? true
        : false
    : false
export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends AnyObject ? DeepPartial<T[K]> : T[K]
}
export type ExtractPredicate<T> = T extends (arg: any) => arg is infer R
    ? R
    : never
export type KeyWithType<O extends AnyObject, T> = {
    [K in keyof O]: O[K] extends T ? K : never
}[keyof O]

/// PLUGIN API EXTENSIONS

export interface PreInitPluginApiUtils {
    callback: typeof import('@retribution-mod/utils/callback')
    error: typeof import('@retribution-mod/utils/error')
    object: typeof import('@retribution-mod/utils/object')
    promise: typeof import('@retribution-mod/utils/promise')
    proxy: typeof import('@retribution-mod/utils/proxy')
    tree: typeof import('@retribution-mod/utils/tree')
    react: typeof import('@retribution-mod/utils/react')
}

export interface PluginApiUtils extends PreInitPluginApiUtils {
    discord: typeof import('@retribution-mod/utils/discord')
}

declare module '@retribution-mod/plugins/types' {
    export interface UnscopedPreInitPluginApi {
        utils: PreInitPluginApiUtils
    }

    export interface UnscopedInitPluginApi {
        utils: PluginApiUtils
    }
}
