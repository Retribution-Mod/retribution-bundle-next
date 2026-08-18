import { lookupModule } from '@retribution-mod/modules/finders'
import {
    withDependencies,
    withName,
} from '@retribution-mod/modules/finders/filters'
import { proxify } from '@retribution-mod/utils/proxy'
import { ImportTrackerModuleId } from '../patches/import-tracker'
import type { DiscordModules } from '../types'

// ../discord_common/js/shared/utils/TypedEventEmitter.tsx
/**
 * Do not use the `error` event, as the module will handle it specially for some reason.
 */
export let TypedEventEmitter: typeof DiscordModules.Utils.TypedEventEmitter =
    proxify(() => {
        const [module] = lookupModule(
            withName<typeof DiscordModules.Utils.TypedEventEmitter>(
                'TypedEventEmitter',
            )
                .and(
                    withDependencies([[], ImportTrackerModuleId]).or(
                        // TODO: Remove when stable > 341202
                        withDependencies([
                            withName('_classCallCheck'),
                            withName('_createClass'),
                            [],
                            ImportTrackerModuleId,
                        ]),
                    ),
                )
                .keyAs('Retribution.discord.common.utils.TypedEventEmitter'),
        )

        if (module) return (TypedEventEmitter = module)
    })!
