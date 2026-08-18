import {
    onSettingsModulesLoaded,
    registerSettingsItem,
} from '@retribution-mod/discord/modules/settings'
import { Setting } from '~plugins/start/settings/constants'
import RetributionEnterRecoveryModeSetting from './definitions/RetributionEnterRecoveryModeSetting'

onSettingsModulesLoaded(() => {
    registerSettingsItem(
        Setting.RetributionEnterRecoveryMode,
        RetributionEnterRecoveryModeSetting,
    )
})
