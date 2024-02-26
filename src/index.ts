#!/usr/bin/env node
import chalk from 'chalk'
import minimist from 'minimist'
import prompts from 'prompts'
import renderTemplate from './renderTemplate'
;(async function () {
  const isValidPackageName = (projectName: string) =>
    /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
      projectName
    )

  const toValidPackageName = (projectName: string) =>
    projectName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/^[._]/, '')
      .replace(/[^a-z0-9-~]+/g, '-')

  interface InitConfig {
    displayName: string
    namespace: string
    description: string
    icon: string
    implements: string[]
    permissions: string[]
  }

  let initConfig: Partial<InitConfig> = {}

  let permissionDetails: Record<string, string> = {}
  let confirmed: { value?: boolean } = {}
  let cleanParams: any = {}

  const argv = minimist(process.argv.slice(2), {})
  let targetDir = argv._[0]

  const implementsChoices = [
    {
      title: 'E-commerce events',
      value: 'ecommerce_events',
      description: 'required to enable handling of e-commerce data',
    },
    {
      title: 'Manager events',
      value: 'manager_events',
      description: 'required for pageview and/or clientcreated event handling',
    },
    {
      title: 'Client Events',
      value: 'client_events',
      description: 'e.g. mousedown, resize, scroll etc.',
    },
    {
      title: 'User events',
      value: 'user_events',
      description: 'required to enable handling of user-defined events',
    },
    {
      title: 'Widgets',
      value: 'widget',
      description: 'required to enable rendering widgets',
    },
    {
      title: 'Embeds',
      value: 'embed',
      description: 'required to enable rendering embeds',
    },
  ]

  const permissionChoices = [
    {
      title: 'Access Client KV',
      value: 'access_client_kv',
      description: 'required for:	client.get, client.set',
    },
    {
      title: 'Access Extended Client KV',
      value: 'access_extended_client_kv',
      description:
        'required for:	client.get when getting a key from another tool',
    },
    {
      title: 'Execute Unsafe Scripts',
      value: 'execute_unsafe_scripts',
      description: 'required for:	client.execute',
    },
    {
      title: 'Client Network Requests',
      value: 'client_network_requests',
      description: 'required for:	client.fetch',
    },
    {
      title: 'Server Network Requests',
      value: 'server_network_requests',
      description: 'required for:	manager.fetch',
    },
    {
      title: 'Serve Static Files',
      value: 'serve_static_files',
      description: 'required for:	serve',
    },
    {
      title: 'Provide Server Functionality',
      value: 'provide_server_functionality',
      description: 'required for:	proxy, route',
    },
    {
      title: 'Provide Widget',
      value: 'provide_widget',
      description: 'required for:	provideWidget',
    },
  ]

  const getPermissionPrompts = (selected: string[]) => {
    return permissionChoices
      .filter(({ value }) => selected.includes(value))
      .flatMap(({ title, value }, index) => {
        return [
          {
            type: 'text',
            name: `${value}_description`,
            message: `Permission #${index + 1} of ${
              selected.length
            } (${title}) description:`,
            initial:
              'This permission is used to facilitate better a user experience.',
          },
          {
            type: 'toggle',
            name: `${value}_required`,
            message: `Permission #${index + 1} of ${
              selected.length
            } (${title}) required?`,
            active: 'true',
            inactive: 'false',
            initial: true,
          },
        ]
      })
  }

  const getCleanParams = (
    initConfig: InitConfig,
    permissionDetails: Record<string, string>
  ) => {
    const permissions: any = {}
    if (initConfig.permissions) {
      initConfig.permissions.forEach((perm) => {
        permissions[perm] = {
          description: permissionDetails[`${perm}_description`],
          required: permissionDetails[`${perm}_required`],
        }
      })
    }
    return { ...initConfig, permissions }
  }

  try {
    initConfig = await prompts(
      [
        {
          name: 'displayName',
          type: 'text',
          message: 'Display name:',
          initial: 'MC Dynamite',
          onState: (state) =>
            (targetDir = String(state.value).trim() || 'MC Dynamite'),
        },
        {
          name: 'namespace',
          type: 'text',
          message: 'Namespace:',
          initial: () => toValidPackageName(targetDir),
          validate: (dir) =>
            isValidPackageName(dir) || 'Invalid package.json name',
        },
        {
          name: 'description',
          type: 'text',
          message: 'Description:',
          initial: 'A Managed Component for making the internet better',
        },
        {
          name: 'icon',
          type: 'text',
          message: 'Path to svg icon:',
          initial: 'assets/icon.svg',
        },
        // TBC - will re-enable when respected by webCM
        // {
        //   name: 'implements',
        //   type: 'multiselect',
        //   message: 'Required Implementations:',
        //   instructions: false,
        //   choices: implementsChoices,
        //   min: 1,
        // },
        {
          name: 'permissions',
          type: 'multiselect',
          message: 'Requested Permissions:',
          instructions: false,
          choices: permissionChoices,
        },
      ],
      {
        onCancel: () => {
          throw new Error(chalk.red('✖') + ' Operation cancelled')
        },
      }
    )
    if (initConfig.permissions) {
      permissionDetails = await prompts(
        getPermissionPrompts(initConfig.permissions) as any,
        {
          onCancel: () => {
            throw new Error(chalk.red('✖') + ' Operation cancelled')
          },
        }
      )
    }
    cleanParams = getCleanParams(
      initConfig as Required<InitConfig>,
      permissionDetails
    )
    confirmed = await prompts({
      type: 'confirm',
      name: 'value',
      message: `Confirm new managed component?: ${chalk.yellow(
        JSON.stringify(cleanParams, null, 2)
      )}`,
      initial: false,
    })
  } catch (cancelled: any) {
    console.log(cancelled.message)
    process.exit(1)
  }
  if (confirmed.value) {
    renderTemplate(cleanParams)
    console.log(
      chalk.greenBright.bold(
        `\n\n✅ ${cleanParams.displayName} Managed Component project initialised!\n   Now run: cd ${cleanParams.namespace} and start development in your src/index.ts file\n\n`
      )
    )
    console.log(
      chalk.yellow(
        '💡 Remember to update the README.md file with a populated Fields Description section and Tool Settings including all the information a Component Manager would need to run the component.\nSee https://managedcomponents.dev/components for inspiration.'
      ) + '\n'
    )
  }
})()

export {}
