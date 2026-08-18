import { ImportTrackerModuleId } from '@retribution-mod/discord/common/import-tracker'
import { lookupModule } from '@retribution-mod/modules/finders'
import {
    withDependencies,
    withProps,
} from '@retribution-mod/modules/finders/filters'
import {
    ReactJSXRuntimeModuleId,
    ReactModuleId,
    ReactNativeModuleId,
} from '@retribution-mod/react'
import { proxify } from '@retribution-mod/utils/proxy'

export let FlashList: typeof import('@shopify/flash-list') = proxify(
    () => {
        const [module] = lookupModule(
            withProps<typeof FlashList>('FlashList')
                .and(
                    withDependencies([
                        ReactModuleId,
                        ReactNativeModuleId,
                        ReactJSXRuntimeModuleId,
                        null,
                        null,
                        null,
                        null,
                        null,
                        // TODO: Decouple?
                        ImportTrackerModuleId,
                    ]).or(
                        // TODO: Remove when stable > 340206+
                        // [React, JSXRuntime, (Platform), (FlashListExports), (Reanimated), (RNBottomSheet), (BottomSheet), ImportTracker]
                        withDependencies([
                            ReactModuleId,
                            ReactJSXRuntimeModuleId,
                            null,
                            null,
                            null,
                            null,
                            null,
                            // TODO: Decouple?
                            ImportTrackerModuleId,
                        ]),
                    ),
                )
                .keyAs('Retribution.externals.Shopify.FlashList'),
        )

        if (module) return (FlashList = module)
    },
    {
        hint: {},
    },
)!
