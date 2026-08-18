import { ToastActionCreators } from '@retribution-mod/discord/actions'
import { getStore, Stores } from '@retribution-mod/discord/flux'
import { getModules } from '@retribution-mod/modules/finders'
import { withProps } from '@retribution-mod/modules/finders/filters'
import { instead } from '@retribution-mod/patcher'
import {
    InternalPluginFlags,
    PluginFlags,
    registerInternalPlugin,
} from '@retribution-mod/plugins/_'
import { lookupGeneratedIconComponent } from '@retribution-mod/utils/discord'
import type { DiscordModules } from '@retribution-mod/discord/types'

registerInternalPlugin(
    {
        id: 'Retribution.staff-settings',
        name: 'Staff Settings',
        description: "Allows accessing Discord's Staff Settings.",
        author: 'Retribution',
        icon: 'StaffBadgeIcon',
    },
    {
        start({ cleanup, logger, plugin }) {
            const CircleInformationIcon = lookupGeneratedIconComponent(
                'CircleInformationIcon',
                'CircleInformationIcon-secondary',
                'CircleInformationIcon-primary',
            )

            const showToast = () =>
                ToastActionCreators.open({
                    key: 'staff-settings-action',
                    content: 'Navigate out of Settings to apply changes',
                    IconComponent: CircleInformationIcon,
                })

            function reset() {
                getStore<{
                    initialize(): void
                }>('DeveloperExperimentStore', store => {
                    logger.log(
                        'Reinitializing DeveloperExperimentStore to apply changes...',
                    )

                    const unpatch = instead(
                        Object,
                        'defineProperties',
                        args => args[0],
                    )

                    store.initialize()
                    unpatch()
                })
            }

            cleanup(
                getModules(withProps('isStaffEnv'), UserStoreUtils => {
                    logger.log('Patching UserStoreUtils...')

                    cleanup(
                        instead(
                            UserStoreUtils,
                            'isStaffEnv',
                            ([user]) =>
                                user ===
                                (
                                    Stores.UserStore as DiscordModules.Flux.Store<{
                                        getCurrentUser(): unknown
                                    }>
                                ).getCurrentUser(),
                        ),
                        reset,
                        showToast,
                    )

                    reset()
                    if (plugin.startedLate) showToast()
                }),
            )
        },
    },
    PluginFlags.Enabled,
    InternalPluginFlags.Internal,
)
