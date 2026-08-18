import TableRowAssetIcon from '@retribution-mod/components/TableRowAssetIcon'
import { reloadApp } from '@retribution-mod/modules/native/app'
import { Setting } from '../constants'
import type { SettingsItem } from '@retribution-mod/discord/modules/settings'

const ReloadSetting: SettingsItem = {
    parent: Setting.Retribution,
    IconComponent: () => <TableRowAssetIcon name="RetryIcon" />,
    useTitle: () => 'Reload App',
    onPress: () => {
        reloadApp()
    },
    type: 'pressable',
}

export default ReloadSetting
