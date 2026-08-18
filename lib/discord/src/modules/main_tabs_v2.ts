import { lookupModule } from '@retribution-mod/modules/finders'
import {
    withDependencies,
    withProps,
} from '@retribution-mod/modules/finders/filters'
import { proxify } from '@retribution-mod/utils/proxy'
import { ImportTrackerModuleId } from '../common/import-tracker'
import type { NavigationContainerRef } from '@react-navigation/core'

const { loose, relative } = withDependencies

export interface RootNavigationRef {
    getRootNavigationRef<
        T extends object = Record<string, unknown>,
    >(): NavigationContainerRef<T>
}

// modules/main_tabs_v2/RootNavigationRef.native.tsx
export let RootNavigationRef: RootNavigationRef = proxify(
    () => {
        const [module] = lookupModule(
            withProps<RootNavigationRef>('getRootNavigationRef')
                .and(
                    withDependencies([
                        loose([
                            relative.withDependencies([], 1),
                            relative.withDependencies(
                                loose([relative(1), relative(2)]),
                                2,
                            ),
                        ]),
                        // TODO: Decouple?
                        ImportTrackerModuleId,
                    ]),
                )
                .keyAs('Retribution.discord.modules.mainTabsV2.RootNavigationRef'),
        )

        if (module) return (RootNavigationRef = module)
    },
    {
        hint: {},
    },
)!
