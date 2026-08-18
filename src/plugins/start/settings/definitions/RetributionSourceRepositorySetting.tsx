import TableRowAssetIcon from '@retribution-mod/components/TableRowAssetIcon'
import { Linking } from 'react-native'
import { Setting } from '../constants'
import type { SettingsItem } from '@retribution-mod/discord/modules/settings'

const RetributionSourceRepositorySetting: SettingsItem = {
    parent: Setting.Retribution,
    IconComponent: () => <TableRowAssetIcon name="PaperIcon" />,
    useTitle: () => 'Source Code',
    useDescription: () => __BUILD_SOURCE_REPOSITORY_URL__,
    onPress: () => {
        Linking.openURL(__BUILD_SOURCE_REPOSITORY_URL__)
    },
    type: 'pressable',
}

export default RetributionSourceRepositorySetting
