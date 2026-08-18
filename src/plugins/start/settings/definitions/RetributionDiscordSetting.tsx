import TableRowAssetIcon from '@retribution-mod/components/TableRowAssetIcon'
import { Linking } from 'react-native'
import { Setting } from '../constants'
import type { SettingsItem } from '@retribution-mod/discord/modules/settings'

const RetributionDiscordSetting: SettingsItem = {
    parent: Setting.Retribution,
    IconComponent: () => <TableRowAssetIcon name="Discord" />,
    useTitle: () => 'Discord Server',
    useDescription: () => __BUILD_DISCORD_SERVER_URL__,
    onPress: () => {
        Linking.openURL(__BUILD_DISCORD_SERVER_URL__)
    },
    type: 'pressable',
}

export default RetributionDiscordSetting
