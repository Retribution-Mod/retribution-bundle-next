// Initialize init libraries
import '@retribution-mod/react/init'
import '@retribution-mod/json-storage/init'

import { onRunApplication } from '@retribution-mod/react/native'
import { onError } from '~index'

const unsub = onRunApplication(() => {
    unsub()

    try {
        // @as-require
        import('./start')
    } catch (e) {
        onError(e)
    }
})

// Run all init plugins
// @as-require
import '~/plugins/init'
// @as-require
import '@retribution-mod/plugins/init'
