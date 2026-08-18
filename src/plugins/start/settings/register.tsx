import {
    registerSettingsItems,
    registerSettingsSection,
} from '@retribution-mod/discord/modules/settings'
import { Setting } from './constants'
import HermesVersionSetting from './definitions/HermesVersionSetting'
import LoaderVersionSetting from './definitions/LoaderVersionSetting'
import ReactNativeVersionSetting from './definitions/ReactNativeVersionSetting'
import ReactVersionSetting from './definitions/ReactVersionSetting'
import ReloadSetting from './definitions/ReloadSetting'
import RetributionDeveloperModeSetting from './definitions/RetributionDeveloperModeSetting'
import RetributionDiscordSetting from './definitions/RetributionDiscordSetting'
import RetributionLicenseSetting from './definitions/RetributionLicenseSetting'
import RetributionSetting from './definitions/RetributionSetting'
import RetributionSourceRepositorySetting from './definitions/RetributionSourceRepositorySetting'
import RetributionVersionSetting from './definitions/RetributionVersionSetting'

registerSettingsItems({
    [Setting.Retribution]: RetributionSetting,
    [Setting.RetributionSourceRepository]: RetributionSourceRepositorySetting,
    [Setting.RetributionLicense]: RetributionLicenseSetting,
    [Setting.RetributionDiscord]: RetributionDiscordSetting,
    [Setting.Reload]: ReloadSetting,
    [Setting.RetributionDeveloperMode]: RetributionDeveloperModeSetting,
    [Setting.RetributionVersion]: RetributionVersionSetting,
    [Setting.ReactVersion]: ReactVersionSetting,
    [Setting.ReactNativeVersion]: ReactNativeVersionSetting,
    [Setting.HermesVersion]: HermesVersionSetting,
    [Setting.LoaderVersion]: LoaderVersionSetting,
})

registerSettingsSection('Retribution', {
    label: 'Retribution',
    settings: [Setting.Retribution],
})
