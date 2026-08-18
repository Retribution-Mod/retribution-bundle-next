import { Design } from '@retribution-mod/discord/design'
import { lookupGeneratedIconComponent } from '@retribution-mod/utils/discord'
import type { DiscordModules } from '@retribution-mod/discord/types'

const MagnifyingGlassIcon = lookupGeneratedIconComponent('MagnifyingGlassIcon')

export default function SearchInput(
    props: DiscordModules.Components.TextInputProps,
) {
    return (
        <Design.TextInput
            leadingIcon={MagnifyingGlassIcon}
            placeholder="Search"
            returnKeyType="search"
            size="md"
            {...props}
        />
    )
}
