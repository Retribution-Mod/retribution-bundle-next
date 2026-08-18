import TableRowAssetIcon from '@retribution-mod/components/TableRowAssetIcon'
import { ToastActionCreators } from '@retribution-mod/discord/actions'
import {
    disablePlugin,
    enablePlugin,
    isDefaultsOnlyBoot,
    isPluginEnabled,
    pEmitter,
    pList,
    runPluginLate,
} from '@retribution-mod/plugins/_'
import { lookupGeneratedIconComponent } from '@retribution-mod/utils/discord'
import { useReRender } from '@retribution-mod/utils/react'
import { useEffect } from 'react'
import pluginHiddenApi from '~plugins/preinit/api.hidden'
import { Setting } from '../constants'
import type { SettingsItem } from '@retribution-mod/discord/modules/settings'
import type { AnyPlugin } from '@retribution-mod/plugins/_'

const RetributionDeveloperModeSetting: SettingsItem = {
    parent: Setting.Retribution,
    type: 'toggle',
    IconComponent: () => <TableRowAssetIcon name="WrenchIcon" />,
    useTitle: () => 'Developer Mode',
    useDescription: () =>
        isDefaultsOnlyBoot
            ? 'Unavailable in Recovery Mode. Reload to exit.'
            : 'Exposes internal Retribution APIs for development purposes. Use with caution.',
    useIsDisabled: () => isDefaultsOnlyBoot,
    useValue: useDeveloperModeEnabled,
    onValueChange: enabled => {
        const plugin = pList.get(pluginHiddenApi)
        if (!plugin) return

        if (enabled)
            enablePlugin(plugin)
                .then(() => runPluginLate(plugin))
                .catch(showFailureToast)
        else disablePlugin(plugin).catch(showFailureToast)
    },
}

function useDeveloperModeEnabled() {
    const plugin = pList.get(pluginHiddenApi)
    const reRender = useReRender()

    useEffect(() => {
        const handle = (changed: AnyPlugin) => {
            if (changed === plugin) reRender()
        }

        pEmitter.on('enabled', handle)
        pEmitter.on('disabled', handle)

        return () => {
            pEmitter.off('enabled', handle)
            pEmitter.off('disabled', handle)
        }
    }, [plugin, reRender])

    return plugin ? isPluginEnabled(plugin) : false
}

function showFailureToast(e: unknown) {
    ToastActionCreators.open({
        key: 'Retribution_DEVELOPER_MODE_FAILED',
        content: `Failed to toggle Developer Mode: ${e instanceof Error ? e.message : String(e)}`,
        IconComponent: lookupGeneratedIconComponent(
            'CircleXIcon',
            'CircleXIcon-primary',
            'CircleXIcon-secondary',
        )!,
    })
}

export default RetributionDeveloperModeSetting
