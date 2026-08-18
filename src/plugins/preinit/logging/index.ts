import { AppStartPerformance } from '@retribution-mod/discord/preinit'
import {
    InternalPluginFlags,
    PluginFlags,
    registerInternalPlugin,
} from '@retribution-mod/plugins/_'
import { BuildEnvironment, FullVersion } from '~/constants'

if (__DEV__) {
    AppStartPerformance.mark('👊', 'Plugins register')

    const tsReg = performance.now()
    let tsPreInit: number
    let tsInit: number

    registerInternalPlugin(
        {
            id: 'Retribution.logging',
            name: 'Logging',
            description: 'Logs assisting Retribution developers.',
            author: 'Retribution',
            icon: 'PaperIcon',
        },
        {
            preInit() {
                tsPreInit = performance.now()
                AppStartPerformance.mark(
                    '👊',
                    'Plugins preInit',
                    tsPreInit - tsReg,
                )
            },
            init() {
                tsInit = performance.now()
                AppStartPerformance.mark(
                    '👊',
                    'Plugins init',
                    tsInit - tsPreInit,
                )
            },
            start({ logger }) {
                nativeLoggingHook(`\u001b[31m--- START STAGE ---\u001b[0m`, 1)

                AppStartPerformance.mark(
                    '👊',
                    'Plugins start',
                    performance.now() - tsInit,
                )
                logger.log(
                    `👊 Retribution. Discord, your way. (${FullVersion} (${BuildEnvironment}))`,
                )
            },
        },
        PluginFlags.Enabled,
        InternalPluginFlags.Internal,
    )
}
