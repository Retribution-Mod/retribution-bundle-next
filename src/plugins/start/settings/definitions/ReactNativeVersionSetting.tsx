import TableRowAssetIcon from '@retribution-mod/components/TableRowAssetIcon'
import { Setting } from '../constants'
import { CopyableSetting, getRNVersion } from './shared'
import type { SettingsItem } from '@retribution-mod/discord/modules/settings'

const ReactNativeVersionSetting: SettingsItem = CopyableSetting(
    {
        parent: Setting.Retribution,
        IconComponent: () => <TableRowAssetIcon name="ScienceIcon" />,
        useTitle: () => 'React Native',
    },
    getRNVersion,
)

export default ReactNativeVersionSetting
