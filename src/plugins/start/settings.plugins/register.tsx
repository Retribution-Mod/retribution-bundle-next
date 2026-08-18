import {
    addSettingsItemToSection,
    registerSettingsItems,
} from '@retribution-mod/discord/modules/settings'
import { Setting } from './constants'
import RetributionPluginsAdvancedSetting from './definitions/RetributionPluginsAdvancedSetting'
import RetributionPluginsBrowseSetting from './definitions/RetributionPluginsBrowseSetting'
import RetributionPluginsSetting from './definitions/RetributionPluginsSetting'

registerSettingsItems({
    [Setting.RetributionPlugins]: RetributionPluginsSetting,
    [Setting.RetributionPluginsAdvanced]: RetributionPluginsAdvancedSetting,
    [Setting.RetributionPluginsBrowse]: RetributionPluginsBrowseSetting,
})

// The settings plugin registers this section, and it always starts before us (we depend on it).
addSettingsItemToSection('Retribution', Setting.RetributionPlugins, 1)
