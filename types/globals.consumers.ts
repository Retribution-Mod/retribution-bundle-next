import type {
    PluginApiExtensionsOptions,
    PluginOptions,
    UnscopedInitPluginApi,
    UnscopedPluginApi,
    UnscopedPreInitPluginApi,
} from '@retribution-mod/plugins/types'

declare global {
    /**
     * Defines an entrypoint for a Retribution JS plugin.
     */
    export function plugin<O extends PluginApiExtensionsOptions>(
        options: PluginOptions<O>,
    ): PluginOptions<O>

    /**
     * The unscoped plugin API. **Use directly only when necessary.**
     *
     * You should be using the `unscoped` property of the `PluginApi` object instead.
     */
    export const Retribution:
        | UnscopedPreInitPluginApi
        | UnscopedInitPluginApi
        | UnscopedPluginApi
}

export * from './globals'
