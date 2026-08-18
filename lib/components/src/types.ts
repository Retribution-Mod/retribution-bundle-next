export interface PluginApiComponents {
    FormSwitch: typeof import('@retribution-mod/components/FormSwitch').default
    Page: typeof import('@retribution-mod/components/Page').default
    SearchInput: typeof import('@retribution-mod/components/SearchInput').default
    TableRowAssetIcon: typeof import('@retribution-mod/components/TableRowAssetIcon').default
}

declare module '@retribution-mod/plugins/types' {
    export interface UnscopedInitPluginApi {
        components: PluginApiComponents
    }
}
