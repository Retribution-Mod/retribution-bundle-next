import defer * as DiscordActions from '@retribution-mod/discord/actions'
import defer * as DiscordCommonConstants from '@retribution-mod/discord/common/constants'
import defer * as DiscordCommonFlux from '@retribution-mod/discord/common/flux'
import defer * as DiscordCommonLogger from '@retribution-mod/discord/common/logger'
import defer * as DiscordCommonTokens from '@retribution-mod/discord/common/tokens'
import defer * as DiscordDesign from '@retribution-mod/discord/design'
import defer * as DiscordFlux from '@retribution-mod/discord/flux'
import defer * as DiscordModulesMainTabsV2 from '@retribution-mod/discord/modules/main_tabs_v2'
import defer * as DiscordNative from '@retribution-mod/discord/native'
import defer * as DiscordUtilsFinders from '@retribution-mod/discord/utils/modules/finders'
import defer * as DiscordUtilsMetroSubscriptions from '@retribution-mod/discord/utils/modules/metro/subscriptions'
import { defineLazyProperties } from '@retribution-mod/utils/object'
import { guardIndexInitialized } from '.'

export interface PreInitPluginApiDiscord {
    actions: PluginApiDiscord.Actions
    common: PreInitPluginApiDiscordCommon
    design: PluginApiDiscord.Design
    flux: PluginApiDiscord.Flux
    modules: PluginApiDiscord.Modules
    native: PluginApiDiscord.Native
    utils: PluginApiDiscord.Utils
}

export interface InitPluginApiDiscord extends PreInitPluginApiDiscord {
    common: InitPluginApiDiscordCommon
}

interface PreInitPluginApiDiscordCommon {
    appStartPerformance: typeof import('@retribution-mod/discord/common/app-start-performance')
    importTracker: typeof import('@retribution-mod/discord/common/import-tracker')
    utils: typeof import('@retribution-mod/discord/common/utils')
    /** This API is available in and after the `init` phase. */
    constants: unknown
    /** This API is available in and after the `init` phase. */
    flux: unknown
    /** This API is available in and after the `init` phase. */
    logger: unknown
    /** This API is available in and after the `init` phase. */
    tokens: unknown
}

interface InitPluginApiDiscordCommon extends PreInitPluginApiDiscordCommon {
    constants: typeof import('@retribution-mod/discord/common/constants')
    flux: typeof import('@retribution-mod/discord/common/flux')
    logger: typeof import('@retribution-mod/discord/common/logger')
    tokens: typeof import('@retribution-mod/discord/common/tokens')
}

export type PluginApiDiscord = PreInitPluginApiDiscord | InitPluginApiDiscord

export namespace PluginApiDiscord {
    export type Actions = typeof import('@retribution-mod/discord/actions')
    export type Common =
        | PreInitPluginApiDiscordCommon
        | InitPluginApiDiscordCommon
    export type Design = typeof import('@retribution-mod/discord/design')
    export type Flux = typeof import('@retribution-mod/discord/flux')
    export type Native = typeof import('@retribution-mod/discord/native')

    export interface Utils {
        modules: {
            finders: typeof import('@retribution-mod/discord/utils/modules/finders')
            metro: {
                subscriptions: typeof import('@retribution-mod/discord/utils/modules/metro/subscriptions')
            }
        }
    }

    export interface Modules {
        mainTabsV2: typeof import('@retribution-mod/discord/modules/main_tabs_v2')
        settings: typeof import('@retribution-mod/discord/modules/settings') & {
            renderer: typeof import('@retribution-mod/discord/modules/settings/renderer')
        }
    }
}

export const discord = defineLazyProperties(
    {
        common: defineLazyProperties(
            {
                appStartPerformance: require('@retribution-mod/discord/common/app-start-performance'),
                importTracker: require('@retribution-mod/discord/common/import-tracker'),
                utils: require('@retribution-mod/discord/common/utils'),
            } as InitPluginApiDiscordCommon,
            {
                constants: () => {
                    guardIndexInitialized('Discord.common.constants')
                    return DiscordCommonConstants
                },
                flux: () => {
                    guardIndexInitialized('Discord.common.flux')
                    return DiscordCommonFlux
                },
                logger: () => {
                    guardIndexInitialized('Discord.common.logger')
                    return DiscordCommonLogger
                },
                tokens: () => {
                    guardIndexInitialized('Discord.common.tokens')
                    return DiscordCommonTokens
                },
            },
        ),
        modules: defineLazyProperties({} as PluginApiDiscord.Modules, {
            mainTabsV2: () => {
                return DiscordModulesMainTabsV2
            },
            settings: () => ({
                ...require('@retribution-mod/discord/modules/settings'),
                renderer: require('@retribution-mod/discord/modules/settings/renderer'),
            }),
        }),
        utils: {
            modules: {
                finders: DiscordUtilsFinders,
                metro: {
                    subscriptions: DiscordUtilsMetroSubscriptions,
                },
            },
        },
    } as PluginApiDiscord,
    {
        actions: () => {
            guardIndexInitialized('Discord.actions')
            return DiscordActions
        },
        flux: () => {
            return DiscordFlux
        },
        design: () => {
            guardIndexInitialized('Discord.design')
            return DiscordDesign
        },
        native: () => {
            return DiscordNative
        },
    },
)
