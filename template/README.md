# {{ displayName }} Managed Component

## Documentation

Managed Components docs are published at **https://managedcomponents.dev** .

Find out more about Managed Components [here](https://blog.cloudflare.com/zaraz-open-source-managed-components-and-webcm/) for inspiration and motivation details.

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
