import TableRowAssetIcon from '@retribution-mod/components/TableRowAssetIcon'
import { BuildEnvironment, FullVersion } from '~/constants'
import RetributionIcon from '~assets/RetributionIcon'
import { Setting } from '../constants'
import { CopyableSetting } from './shared'
import type { SettingsItem } from '@retribution-mod/discord/modules/settings'

const RetributionVersionSetting: SettingsItem = CopyableSetting(
    {
        parent: Setting.Retribution,
        IconComponent: () => <TableRowAssetIcon id={RetributionIcon} />,
        useTitle: () => 'Retribution',
    },
    () => `${FullVersion} (${BuildEnvironment})`,
)

export default RetributionVersionSetting
