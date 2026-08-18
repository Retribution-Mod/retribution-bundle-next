import { lookupModule } from '@retribution-mod/modules/finders'
import { withName } from '@retribution-mod/modules/finders/filters'
import type { DiscordModules } from '@retribution-mod/discord/types'
import type { Metro } from '@retribution-mod/modules/types'

// ../discord_common/js/packages/logger/Logger.tsx
export const [Logger, LoggerModuleId] = lookupModule(
    withName<typeof DiscordModules.Logger>('Logger'),
) as [typeof DiscordModules.Logger, Metro.ModuleID]
