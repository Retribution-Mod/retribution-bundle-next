import * as PluginsApiConstants from '@retribution-mod/plugins/constants'
import * as PluginsApiUtils from '@retribution-mod/plugins/utils'

export interface PluginApiPlugins {
    utils: typeof import('@retribution-mod/plugins/utils')
    constants: typeof import('@retribution-mod/plugins/constants')
}

export const plugins: PluginApiPlugins = {
    constants: PluginsApiConstants,
    utils: PluginsApiUtils,
}
