import { getAssetIdByName } from '@retribution-mod/assets'
import { Design } from '@retribution-mod/discord/design'
import type { DiscordModules } from '@retribution-mod/discord/types'

export default function TableRowAssetIcon(props: TableRowAssetIconProps) {
    return (
        <Design.TableRow.Icon
            source={props.name ? getAssetIdByName(props.name)! : props.id!}
            {...props}
        />
    )
}

export type TableRowAssetIconProps = Omit<
    DiscordModules.Components.TableRowIconProps,
    'source'
> &
    (
        | {
              name: string
              id?: never
          }
        | {
              name?: never
              id: number
          }
    )
