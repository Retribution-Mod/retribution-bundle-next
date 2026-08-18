import type { RouteNames } from './constants'

declare module '@retribution-mod/externals/react-navigation' {
    interface ReactNavigationParamList extends RetributionSettingsParamList {}
}

type RetributionSettingsParamList = {
    [K in (typeof RouteNames)[keyof typeof RouteNames]]: object
}
