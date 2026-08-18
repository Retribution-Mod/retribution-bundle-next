import {
    InternalPluginFlags,
    PluginFlags,
    registerInternalPlugin,
} from '@retribution-mod/plugins/_'
import defer * as UtilsCallback from '@retribution-mod/utils/callback'
import defer * as UtilsDiscord from '@retribution-mod/utils/discord'
import defer * as UtilsError from '@retribution-mod/utils/error'
import defer * as UtilsObject from '@retribution-mod/utils/object'
import defer * as UtilsPromise from '@retribution-mod/utils/promise'
import defer * as UtilsProxy from '@retribution-mod/utils/proxy'
import defer * as UtilsReact from '@retribution-mod/utils/react'
import defer * as UtilsTree from '@retribution-mod/utils/tree'

registerInternalPlugin(
    {
        id: 'Retribution.api.utils',
        name: 'Utils API',
        description: '@retribution-mod/utils API for plugins.',
        author: 'Retribution',
        icon: 'PollsIcon',
    },
    {
        preInit({ unscoped }) {
            unscoped.utils = {
                callback: UtilsCallback,
                error: UtilsError,
                object: UtilsObject,
                promise: UtilsPromise,
                proxy: UtilsProxy,
                tree: UtilsTree,
                react: UtilsReact,
            }
        },
        init({ unscoped: { utils } }) {
            utils.discord = UtilsDiscord
        },
    },
    PluginFlags.Enabled,
    // biome-ignore format: Don't format this
    InternalPluginFlags.Internal |
    InternalPluginFlags.Essential |
    InternalPluginFlags.API,
)
