import TableRowAssetIcon from '@retribution-mod/components/TableRowAssetIcon'
import { Setting } from '../constants'
import { CopyableSetting } from './shared'
import type { SettingsItem } from '@retribution-mod/discord/modules/settings'

const props = HermesInternal.getRuntimeProperties()

const HermesVersionSetting: SettingsItem = CopyableSetting(
    {
        parent: Setting.Retribution,
        IconComponent: () => <TableRowAssetIcon name="TranscriptOutlineIcon" />,
        useTitle: () => 'Hermes',
    },
    () => `${props['Bytecode Version']} (${props.Build})`,
)

export default HermesVersionSetting
