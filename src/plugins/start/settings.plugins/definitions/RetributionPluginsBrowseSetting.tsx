import TableRowAssetIcon from '@retribution-mod/components/TableRowAssetIcon'
import { RouteNames, Setting } from '../constants'
import defer * as RetributionPluginsBrowseSettingScreen from '../screens/RetributionPluginsBrowseSettingScreen'
import type { SettingsItem } from '@retribution-mod/discord/modules/settings'

const RetributionPluginsBrowseSetting: SettingsItem = {
    parent: null,
    type: 'route',
    IconComponent: () => <TableRowAssetIcon name="PlusLargeIcon" />,
    useTitle: () => 'Browse Plugins',
    screen: {
        route: RouteNames[Setting.RetributionPluginsBrowse],
        getComponent: () => RetributionPluginsBrowseSettingScreen.default,
    },
}

export default RetributionPluginsBrowseSetting
