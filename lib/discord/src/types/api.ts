import type { DiscordModules } from '.'

declare module '@retribution-mod/plugins/types' {
    export interface InitPluginApi<O extends PluginApiExtensionsOptions> {
        logger: DiscordModules.Logger
    }
}
