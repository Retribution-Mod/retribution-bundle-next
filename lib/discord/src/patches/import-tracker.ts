import { getModules } from '@retribution-mod/modules/finders'
import { withProps } from '@retribution-mod/modules/finders/filters'
import { mInitializingId } from '@retribution-mod/modules/metro/patches'
import type { Metro } from '@retribution-mod/modules/types'

export type ModuleFinishedImportingCallback = (
    id: Metro.ModuleID,
    path: string,
) => void

export const sImportedPath = new Set<ModuleFinishedImportingCallback>()
export const mImportedPaths = new Map<string, Metro.ModuleID>()

export let ImportTrackerModuleId: Metro.ModuleID

getModules(withProps('fileFinishedImporting'), (exports, id) => {
    ImportTrackerModuleId = id

    const orig = exports.fileFinishedImporting
    exports.fileFinishedImporting = (path: string) => {
        orig(path)
        const id = mInitializingId!
        mImportedPaths.set(path, id)
        executeImportedPathSubscriptions(id, path)
    }
})

export function executeImportedPathSubscriptions(
    id: Metro.ModuleID,
    path: string,
) {
    for (const cb of sImportedPath)
        try {
            cb(id, path)
        } catch {}
}
