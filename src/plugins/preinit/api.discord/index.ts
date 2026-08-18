import {
    InternalPluginFlags,
    PluginFlags,
    registerInternalPlugin,
} from '@retribution-mod/plugins/_'
import { defineLazyProperty } from '@retribution-mod/utils/object'

registerInternalPlugin(
    {
        id: 'Retribution.api.discord',
        name: 'Discord API',
        description: '@retribution-mod/discord API for plugins.',
        author: 'Retribution',
        icon: 'PollsIcon',
    },
    {
        init({
            decorate,
            unscoped: {
                discord: {
                    common: {
                        logger: { Logger },
                    },
                },
            },
        }) {
            decorate(plugin => {
                defineLazyProperty(
                    plugin.api,
                    'logger',
                    () =>
                        new Logger(`Retribution > Plugins (${plugin.manifest.id})`),
                )
            })
        },
    },
    PluginFlags.Enabled,
    // biome-ignore format: Don't format this
    InternalPluginFlags.Internal |
    InternalPluginFlags.Essential |
    InternalPluginFlags.API,
)
