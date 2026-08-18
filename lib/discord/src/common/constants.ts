import { lookupModule } from '@retribution-mod/modules/finders'
import {
    withDependencies,
    withProps,
} from '@retribution-mod/modules/finders/filters'
import type { DiscordModules } from '@retribution-mod/discord/types'

const { loose, relative } = withDependencies

export const [Constants, ConstantsModuleId] = lookupModule(
    withProps<DiscordModules.Constants>('ME')
        .and(
            withDependencies(
                loose([
                    null,
                    relative.withDependencies(loose([relative(2, true)]), 1),
                ]),
            ),
        )
        .keyAs('Retribution.discord.common.Constants'),
)
