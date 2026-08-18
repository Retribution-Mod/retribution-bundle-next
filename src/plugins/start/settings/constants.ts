export const Setting = {
    // MAIN SETTINGS

    Retribution: 'Retribution',

    // SUBSETTINGS

    RetributionDiscord: 'RetributionDiscord',
    RetributionSourceRepository: 'RetributionSourceRepository',
    RetributionLicense: 'RetributionLicense',
    Reload: 'Reload',
    RetributionDeveloperMode: 'RetributionDeveloperMode',
    RetributionEnterRecoveryMode: 'RetributionEnterRecoveryMode',

    RetributionVersion: 'RetributionVersion',
    ReactVersion: 'ReactVersion',
    ReactNativeVersion: 'ReactNativeVersion',
    HermesVersion: 'HermesVersion',
    LoaderVersion: 'LoaderVersion',
} as const

export const RouteNames = {
    [Setting.Retribution]: 'Retribution',
} as const
