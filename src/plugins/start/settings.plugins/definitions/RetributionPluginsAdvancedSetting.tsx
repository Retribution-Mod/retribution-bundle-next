import TableRowAssetIcon from '@retribution-mod/components/TableRowAssetIcon'
import { RouteNames, Setting } from '../constants'
import defer * as RetributionPluginsAdvancedSettingScreen from '../screens/RetributionPluginsAdvancedSettingScreen'
import type { SettingsItem } from '@retribution-mod/discord/modules/settings'

const RetributionPluginsAdvancedSetting: SettingsItem = {
    parent: null,
    type: 'route',
    IconComponent: () => <TableRowAssetIcon name="SettingsIcon" />,
    useTitle: () => 'Advanced',
    screen: {
        route: RouteNames[Setting.RetributionPluginsAdvanced],
        getComponent: () => RetributionPluginsAdvancedSettingScreen.default,
    },
}

export default RetributionPluginsAdvancedSetting
