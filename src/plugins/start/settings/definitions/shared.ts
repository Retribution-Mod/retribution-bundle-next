import { ToastActionCreators } from '@retribution-mod/discord/actions'
import { Clipboard } from '@retribution-mod/externals/react-native-clipboard'
import { ReactNative } from '@retribution-mod/react'
import { lookupGeneratedIconComponent } from '@retribution-mod/utils/discord'
import type { SettingsItem } from '@retribution-mod/discord/modules/settings'

const CopyIcon = lookupGeneratedIconComponent('CopyIcon')

export const CopyableSetting = (
    item: Omit<SettingsItem, 'type' | 'onClick'>,
    description: () => string,
): SettingsItem => ({
    ...item,
    useDescription: item.useDescription ?? (() => description()),
    type: 'pressable',
    onPress() {
        Clipboard.setString(description())
        ToastActionCreators.open({
            key: 'Retribution_SETTING_COPIED',
            content: 'Copied to clipboard',
            IconComponent: CopyIcon,
        })
    },
})

export const getRNVersion = () => {
    const { major, minor, patch, prerelease } =
        ReactNative.Platform.constants.reactNativeVersion
    return `${major}.${minor}.${patch}${prerelease ? `-${prerelease}` : ''}`
}
