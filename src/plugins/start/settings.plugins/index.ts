import { ToastActionCreators } from '@retribution-mod/discord/actions'
import { onSettingsModulesLoaded } from '@retribution-mod/discord/modules/settings'
import { JsonStorageUpdateMode } from '@retribution-mod/json-storage'
import {
    InternalPluginFlags,
    PluginFlags,
    registerInternalPlugin,
} from '@retribution-mod/plugins/_'
import {
    refreshAllRepos,
    updateAllPlugins,
} from '@retribution-mod/plugins/_/repositories'
import { lookupGeneratedIconComponent } from '@retribution-mod/utils/discord'
import pluginSettings from '../settings'
import { addDefaultRepoIfNeeded } from './repos'
import type { JsonStorage } from '@retribution-mod/json-storage'
import type { PluginApi } from '@retribution-mod/plugins/types'

export interface Storage {
    autoUpdate: boolean
    lastUpdateCheck?: number
    defaultRepoRestored?: boolean
}

const OUTDATED_THRESHOLD = 60 * 60 * 1000 // 1 hour
const AUTO_UPDATE_CHECK_DELAY = 10_000

const CircleXIconComponent = lookupGeneratedIconComponent(
    'CircleXIcon',
    'CircleXIcon-primary',
    'CircleXIcon-secondary',
)!

registerInternalPlugin<{ jsonStorage: Storage }>(
    {
        id: 'Retribution.settings.plugins',
        name: 'Plugin Settings',
        description: 'Plugin management UI for Retribution.',
        author: 'Retribution',
        icon: 'PuzzlePieceIcon',
        dependencies: { [pluginSettings]: {} },
    },
    {
        jsonStorage: {
            load: true,
            default: {
                autoUpdate: true,
            },
        },
        async start(api_) {
            api = api_

            // @as-require
            import('./plugins')

            onSettingsModulesLoaded(() => {
                // @as-require
                import('./register')
            })

            const settings = await api.jsonStorage.get()
            autoUpdateService(settings)
            defaultRepoRestoreService(settings, api.jsonStorage)
        },
    },
    PluginFlags.Enabled,
    InternalPluginFlags.Internal | InternalPluginFlags.Essential,
)

function autoUpdateService(settings: Storage) {
    if (!settings.autoUpdate) return
    if (
        settings.lastUpdateCheck !== undefined &&
        Date.now() - settings.lastUpdateCheck <= OUTDATED_THRESHOLD
    )
        return

    setTimeout(async () => {
        try {
            const { errors } = await refreshAllRepos()
            await updateAllPlugins()

            if (!errors.length)
                await api.jsonStorage.set({
                    lastUpdateCheck: Date.now(),
                })
        } catch (e) {
            ToastActionCreators.open({
                key: 'PLUGIN_UPDATE_CHECK_FAILED',
                content: 'Failed to check for plugin updates',
                IconComponent: CircleXIconComponent,
            })

            api.logger.warn('Failed to check for plugin updates', e)
        }
    }, AUTO_UPDATE_CHECK_DELAY)
}

// TODO: Add UI for this?
function defaultRepoRestoreService(
    settings: Storage,
    storage: JsonStorage<Storage>,
) {
    if (!settings.defaultRepoRestored) addDefaultRepoIfNeeded()
    storage.subscribe((update, mode) => {
        // If user cleared storage, restore the default repo if needed
        if (mode === JsonStorageUpdateMode.Load && !update.defaultRepoRestored)
            addDefaultRepoIfNeeded()
    })
}

// Exposed for the Advanced settings screen (auto-update toggle)
export let api: PluginApi<{ jsonStorage: Storage }>
