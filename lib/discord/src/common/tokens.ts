import { lookupModule } from '@retribution-mod/modules/finders'
import { withProps } from '@retribution-mod/modules/finders/filters'
import type { Metro } from '@retribution-mod/modules/types'

// ../discord_common/js/packages/tokens/native.tsx
export const [Tokens, TokensModuleId] = lookupModule(withProps('RawColor')) as [
    any,
    Metro.ModuleID,
]
