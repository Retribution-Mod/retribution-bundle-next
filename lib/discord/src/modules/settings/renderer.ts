import { lookupModule } from '@retribution-mod/modules/finders'
import {
    withDependencies,
    withProps,
} from '@retribution-mod/modules/finders/filters'
import {
    ReactJSXRuntimeModuleId,
    ReactModuleId,
    ReactNativeModuleId,
} from '@retribution-mod/react'
import { proxify } from '@retribution-mod/utils/proxy'
import type { DiscordModules } from '../../types'

const { loose, relative } = withDependencies

export type SettingListRenderer =
    DiscordModules.Modules.Settings.SettingListRenderer

// modules/settings/native/renderer/SettingListRenderer.tsx
export let SettingListRenderer: SettingListRenderer = proxify(
    () => {
        const [module] = lookupModule(
            withProps<SettingListRenderer>('SettingsList')
                .and(
                    withDependencies(
                        loose([
                            ReactModuleId,
                            ReactNativeModuleId,
                            relative(1),
                            relative(2),
                            null,
                            ReactJSXRuntimeModuleId,
                        ]),
                    ),
                )
                .keyAs(
                    'Retribution.discord.modules.settings.renderer.SettingListRenderer',
                ),
        )

        if (module) return (SettingListRenderer = module)
    },
    {
        hint: {},
    },
)!
