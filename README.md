<p align="center">
  <picture>
    <source
      width="512px"
      media="(prefers-color-scheme: dark)"
      srcset="assets/wordmark/wordmark+slogan-dark.svg"
    >
    <img
      width="512px"
      src="assets/wordmark/wordmark+slogan-light.svg"
    >
  </picture>
  <br>
   <a href="https://discord.com/invite/ddcQf3s2Uq">
       <picture>
           <source height="32px" media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/13122796/178032563-d4e084b7-244e-4358-af50-26bde6dd4996.png" />
           <img height="32px" src="https://user-images.githubusercontent.com/13122796/178032563-d4e084b7-244e-4358-af50-26bde6dd4996.png" />
       </picture>
   </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <a href="https://github.com/Retribution-Mod">
       <picture>
           <source height="32px" media="(prefers-color-scheme: dark)" srcset="https://i.ibb.co/dMMmCrW/Git-Hub-Mark.png" />
           <img height="32px" src="https://i.ibb.co/9wV3HGF/Git-Hub-Mark-Light.png" />
       </picture>
   </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   </a>
</p>

# Retribution

**Discord, your way.** Retribution is a client modification for Discord Android.

Retribution aims to be a lightweight and lightning-fast client modification for Discord Android, while being user-friendly and developer-first. It provides a powerful framework, allowing developers to make add-ons with ease. The sky is the limit!

## ❓ About

This repository releases Hermes Bytecode to be executed on official Discord Android clients. The bytecode is not standalone and is meant to be used with official bootstrappers listed in the [⬇️ Download](#️-download) section.

## 💪 Features

- **🔌 Plugins**: Extend Discord with custom features
- **🎨 Themes & Fonts**: Customize Discord's appearance to your liking
- **🧪 Experiments**: Try out Discord's new features before they're rolled out

## ⬇️ Download

These are the official Retribution ways to install Retribution:

- **📵 Non-root**: [Retribution Manager](https://github.com/Retribution-Mod/retribution-manager/releases/latest)
- **🩹 Root with Xposed**: [RetributionXposed](https://github.com/Retribution-Mod/retribution-xposed/releases/latest)

Using the installation methods above will currently install [Retribution Classic](https://github.com/Retribution-Mod/Retribution). You'll need to update from Retribution Classic to Retribution Next manually.

### ⬆️ Updating to Retribution Next

> **It is recommended to do a separate installation of Retribution before updating to Retribution Next.**  
> Retribution Next does not offer an easy way to downgrade to Retribution Classic.

To update to Retribution Next from Retribution Classic, follow these steps:

1. Download the latest release asset from [Retribution Next's Actions tab](https://github.com/Retribution-Mod/retribution-bundle-next/actions/workflows/build.yml).
2. Extract the built bundle and host a local HTTP server that serves the `Retribution.bundle` file.
3. In Retribution Classic, go to **Settings** > **Retribution**, and toggle on **Developer Settings**.
4. Navigate back, and head into the **Developer** section.
5. Edit the **Load from custom URL** field to point to the URL of the `Retribution.bundle` file you hosted.
6. Restart Discord, and you should be running Retribution Next!

### 🔄️ Updating builds

Retribution Next is updated regularly with new features and bug fixes. To update to the latest build, follow these steps:

1. Host a HTTP server that points to a new `Retribution.bundle` file.
2. Head to **Settings** > **Developer** (under the **Retribution** section).
3. Tap on the **Evaluate JavaScript** option.
4. Paste and evaluate the following snippet. Make sure to modify the URL to point to your newly hosted `Retribution.bundle` file:

    ```js
    var Retribution_UPDATE_URL = "<URL here, keep the quotes>";
    Retribution.discord.native.FileModule.writeFile("documents", "pyoncord/loader.json", JSON.stringify({"customLoadUrl":{"enabled":true,"url":Retribution_UPDATE_URL}}), "utf8");
    "URL updated, please reload Retribution"
    ```

5. Restart Discord.

## 👷 Developing with Retribution Next

You'll need to have [Deno](https://deno.land/) installed. Once you have Deno, follow these steps:

```sh
# Install dependencies
deno install
```

---

```sh
# Build Retribution Next
deno run build

# Build Retribution Next with debugging enabled (slow, don't use in production)
deno run build --dev
```

```sh
# Start the development server
deno run dev

# Build as production
deno run dev --prod
```

<sub>Builds are generated at `dist/Retribution.bundle`.</sub>

### 📝 Generating types

```sh
# Build types for external consumers
deno run types
```

Types are generated at `dist/types`. To consume, simply add `@retribution-mod/types` as a dependency and include the following in your TypeScript config:

```json
{
  "compilerOptions": {
    "types": ["@retribution-mod/types"]
  }
}
```

Bundlers will need to map imports to property access on `Retribution` turning `kebab-case` and `snake_case` to `camelCase`.  
Example: `@retribution-mod/discord/modules/main_tabs_v2` to `Retribution.discord.modules.mainTabsV2`

There's an exception for `@retribution-mod/externals`, which property accesses should turn into `PascalCase` instead of `camelCase`.

#### 🛠️ Developer Mode & Hidden API

The [hidden API](./lib/hidden) exposes internal fields and methods that are **not** part of the public API. They can break or change at any time, and are only meant for debugging.
Some experimental APIs may also be exposed through the hidden API before they are added to the public API.

You must enable **Developer Mode** in Retribution's settings in order to expose the [hidden API](./lib/hidden) to plugins that depend on [`Retribution.api.hidden`](./src/plugins/preinit/api.hidden).

To consume the hidden API, add the following to your TypeScript config:

```json
{
  "compilerOptions": {
    "types": ["@retribution-mod/types", "@retribution-mod/types/hidden"]
  }
}
```
