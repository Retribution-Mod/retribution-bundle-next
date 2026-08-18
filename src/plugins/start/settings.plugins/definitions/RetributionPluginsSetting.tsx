import TableRowAssetIcon from '@retribution-mod/components/TableRowAssetIcon'
import {
    isDefaultsOnlyBoot,
    isPluginEnabled,
    pEmitter,
    pList,
} from '@retribution-mod/plugins/_'
import { useReRender } from '@retribution-mod/utils/react'
import { useEffect } from 'react'
import { RouteNames, Setting } from '../constants'
import defer * as RetributionPluginsSettingScreen from '../screens/RetributionPluginsSettingScreen'
import type { SettingsItem } from '@retribution-mod/discord/modules/settings'

const RetributionPluginsSetting: SettingsItem = {
    parent: null,
    type: 'route',
    IconComponent: () => <TableRowAssetIcon name="PuzzlePieceIcon" />,
    useTitle: () => 'Plugins',
    useTrailing: () =>
        `${useEnabledPluginCount()} enabled` +
        (isDefaultsOnlyBoot ? ' (recovery)' : ''),
    screen: {
        route: RouteNames[Setting.RetributionPlugins],
        getComponent: () => RetributionPluginsSettingScreen.default,
    },
}

let enabledCount = 0

for (const plugin of pList.values()) if (isPluginEnabled(plugin)) enabledCount++

pEmitter.on('disabled', () => {
    enabledCount--
})

pEmitter.on('enabled', () => {
    enabledCount++
})

function useEnabledPluginCount() {
    const reRender = useReRender()

    useEffect(() => {
        pEmitter.on('disabled', reRender)
        pEmitter.on('enabled', reRender)

        return () => {
            pEmitter.off('disabled', reRender)
            pEmitter.off('enabled', reRender)
        }
    }, [reRender])

    return enabledCount
}

export default RetributionPluginsSetting
