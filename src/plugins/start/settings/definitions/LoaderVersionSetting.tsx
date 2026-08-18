import TableRowAssetIcon from '@retribution-mod/components/TableRowAssetIcon'
import { getBridgeInfo } from '@retribution-mod/modules/native'
import { Setting } from '../constants'
import { CopyableSetting } from './shared'
import type { SettingsItem } from '@retribution-mod/discord/modules/settings'

const bridgeInfo = getBridgeInfo()

const LoaderVersionSetting: SettingsItem = CopyableSetting(
    {
        parent: Setting.Retribution,
        IconComponent: () => <TableRowAssetIcon name="SendMessageIcon" />,
        useTitle: () => 'Loader',
        usePredicate: () => Boolean(bridgeInfo),
    },
    () => `${bridgeInfo!.name} (${bridgeInfo!.version})`,
)

export default LoaderVersionSetting
