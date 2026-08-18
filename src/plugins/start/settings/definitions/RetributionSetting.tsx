import TableRowAssetIcon from '@retribution-mod/components/TableRowAssetIcon'
import { FullVersion } from '~/constants'
import RetributionIcon from '~assets/RetributionIcon'
import { RouteNames, Setting } from '../constants'
import defer * as RetributionSettingScreen from '../screens/RetributionSettingScreen'
import type { SettingsItem } from '@retribution-mod/discord/modules/settings'

const RetributionSetting: SettingsItem = {
    parent: null,
    type: 'route',
    IconComponent: () => <TableRowAssetIcon id={RetributionIcon} />,
    useTitle: () => 'Retribution',
    useTrailing: () => FullVersion,
    screen: {
        route: RouteNames[Setting.Retribution],
        getComponent: () => RetributionSettingScreen.default,
    },
}

export default RetributionSetting
