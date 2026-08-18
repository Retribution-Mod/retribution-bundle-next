import type { RunApplicationCallback } from '@retribution-mod/react/types'

export const sBeforeRunApplication = new Set<RunApplicationCallback>()
export const sAfterRunApplication = new Set<RunApplicationCallback>()
