import defer * as Browserify from '@retribution-mod/externals/browserify'
import defer * as ReactNativeClipboard from '@retribution-mod/externals/react-native-clipboard'
import defer * as ReactNativeSafeAreaContext from '@retribution-mod/externals/react-native-safe-area-context'
import defer * as ReactNavigation from '@retribution-mod/externals/react-navigation'
import defer * as Shopify from '@retribution-mod/externals/shopify'
import { defineLazyProperties } from '@retribution-mod/utils/object'

export interface PluginApiExternals {
    Browserify: typeof import('@retribution-mod/externals/browserify')
    ReactNativeClipboard: typeof import('@retribution-mod/externals/react-native-clipboard')
    ReactNativeSafeAreaContext: typeof import('@retribution-mod/externals/react-native-safe-area-context')
    ReactNavigation: typeof import('@retribution-mod/externals/react-navigation')
    Shopify: typeof import('@retribution-mod/externals/shopify')
}

export const externals: PluginApiExternals = defineLazyProperties(
    {} as PluginApiExternals,
    {
        Browserify: () => {
            return Browserify
        },
        ReactNativeClipboard: () => {
            return ReactNativeClipboard
        },
        ReactNativeSafeAreaContext: () => {
            return ReactNativeSafeAreaContext
        },
        ReactNavigation: () => {
            return ReactNavigation
        },
        Shopify: () => {
            return Shopify
        },
    },
)
