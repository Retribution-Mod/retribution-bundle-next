import TableRowAssetIcon from '@retribution-mod/components/TableRowAssetIcon'
import { reloadApp } from '@retribution-mod/modules/native/app'
import {
    isDefaultsOnlyBoot,
    requestNextBootDefaultsOnly,
} from '@retribution-mod/plugins/_'
import { Setting } from '~plugins/start/settings/constants'
import type { SettingsItem } from '@retribution-mod/discord/modules/settings'

const RetributionEnterRecoveryModeSetting: SettingsItem = {
    parent: Setting.Retribution,
    type: 'pressable',
    useIsDisabled: () => isDefaultsOnlyBoot,
    useTitle: () => 'Enter Recovery Mode',
    useDescription: () =>
        isDefaultsOnlyBoot
            ? 'Currently in Recovery Mode. Reload to exit.'
            : 'Run Retribution with default plugins only for one boot. Use if plugins are causing issues.',
    IconComponent: () => <TableRowAssetIcon name="ShieldIcon" />,
    onPress: () => {
        requestNextBootDefaultsOnly()
        reloadApp()
    },
}

export default RetributionEnterRecoveryModeSetting
