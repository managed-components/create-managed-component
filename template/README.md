# {{ displayName }} Managed Component

New Component Instance TODOs

- [ ] find & replace "{{ displayName }}" string instances with the display name of your new component
- [ ] find & replace "{{ namespace }}" string instances with the kebab-case namespace of your new component
- [ ] add any assets (e.g. a logo?) for your new component under an `assets` folder at the root level
- [ ] update the component description & categories in [`manifest.json`](src/manifest.json)
- [ ] populate [`manifest.json`](src/manifest.json) with all required permissions
- [ ] populate Fields Description section and Tool Settings with all the information a Component Manager would need to run the component. See [Known Managed Components](https://managedcomponents.dev/components) for inspiration
- [ ] remove this TODO list

## Documentation

Managed Components docs are published at **https://managedcomponents.dev** .

Find out more about Managed Components [here](https://blog.cloudflare.com/zaraz-open-source-managed-components-and-webcm/) for inspiration and motivation details.

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Released under the Apache license.](https://img.shields.io/badge/license-apache-blue.svg)](./LICENSE)
[![PRs welcome!](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## 🚀 Quickstart local dev environment

1. Make sure you're running node version >=18.
2. Install dependencies with `npm i`
3. Run unit test watcher with `npm run test:dev`

## ⚙️ Tool Settings

> Settings are used to configure the tool in a Component Manager config file

### Example Setting `boolean`

`exampleSetting` can be the pixelID or any other essential/optional setting like the option to anonymize IPs, send ecommerce events etc.

## 🧱 Fields Description

> Fields are properties that can/must be sent with certain events

### Human Readable Field Name `type` _required_

`field_id` give it a short description and send to a more detailed reference [Find more about how to create your own Managed Component](https://managedcomponents.dev/).

## 📝 License

Licensed under the [Apache License](./LICENSE).

## 💜 Thanks

Thanks to everyone contributing in any manner for this repo and to everyone working on Open Source in general.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/simonabadoiu"><img src="https://avatars.githubusercontent.com/u/1610123?v=4?s=75" width="75px;" alt=""/><br /><sub><b>Simona Badoiu</b></sub></a><br /><a href="https://github.com/managed-components/@managed-components/{{ namespace }}/commits?author=simonabadoiu" title="Code">💻</a></td>
    <td align="center"><a href="https://yoavmoshe.com/about"><img src="https://avatars.githubusercontent.com/u/55081?v=4?s=75" width="75px;" alt=""/><br /><sub><b>Yo'av Moshe</b></sub></a><br /><a href="https://github.com/managed-components/@managed-components/{{ namespace }}/commits?author=bjesus" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jonnyparris"><img src="https://avatars.githubusercontent.com/u/6400000?v=4?s=75" width="75px;" alt=""/><br /><sub><b>Ruskin</b></sub></a><br /><a href="https://github.com/managed-components/@managed-components/{{ namespace }}/commits?author=jonnyparris" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
