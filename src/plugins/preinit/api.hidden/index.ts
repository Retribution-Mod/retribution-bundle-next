import { hiddenApi } from '@retribution-mod/hidden'
import {
    InternalPluginFlags,
    PluginFlags,
    registerInternalPlugin,
} from '@retribution-mod/plugins/_'

const pluginHiddenApi = registerInternalPlugin(
    {
        id: 'Retribution.api.hidden',
        name: 'Developer Mode',
        description: 'Exposes Retribution internal APIs for debugging.',
        author: 'Retribution',
        icon: 'WrenchIcon',
    },
    {
        preInit({ decorate }) {
            decorate(plugin => {
                plugin.api.unscoped.hidden = hiddenApi

                return () => {
                    // biome-ignore lint/performance/noDelete: We want to remove the API completely
                    delete plugin.api.unscoped.hidden
                }
            })
        },
    },
    // Dev builds always get it, release builds go through the settings toggle.
    __DEV__ ? PluginFlags.Enabled : 0,
    InternalPluginFlags.Internal,
)

export default pluginHiddenApi
