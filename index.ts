import minimist from 'minimist'
import prompts from 'prompts'
import chalk from 'chalk'
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

  let result: {
    projectName?: string
    packageName?: string
    needsVitest?: boolean
    needsEslint?: boolean
    needsPrettier?: boolean
  } = {}

  const argv = minimist(process.argv.slice(2), {})
  let targetDir = argv._[0]
  try {
    // Prompts:
    // - Project name
    // - Namespace (aka package name)
    // - Project language: JavaScript / TypeScript
    // - Add Vitest for testing?
    // - Add ESLint for code quality?
    // - Add Prettier for code formatting?
    result = await prompts(
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
          type: () => (isValidPackageName(targetDir) ? null : 'text'),
          message: 'Namespace:',
          initial: () => toValidPackageName(targetDir),
          validate: (dir) =>
            isValidPackageName(dir) || 'Invalid package.json name',
        },
        {
          name: 'needsVitest',
          type: 'toggle',
          message: 'Add Vitest for Unit Testing?',
          initial: true,
          active: 'Yes',
          inactive: 'No',
        },
        {
          name: 'needsEslint',
          type: 'toggle',
          message: 'Add ESLint for code quality?',
          initial: true,
          active: 'Yes',
          inactive: 'No',
        },
        {
          name: 'needsPrettier',
          type: 'toggle',
          message: 'Add Prettier for code formatting?',
          initial: true,
          active: 'Yes',
          inactive: 'No',
        },
      ],
      {
        onCancel: () => {
          throw new Error(chalk.red('✖') + ' Operation cancelled')
        },
      }
    )
  } catch (cancelled: any) {
    console.log(cancelled.message)
    process.exit(1)
  }

  console.log(chalk.green(JSON.stringify(result, null, 2)))
})()

export {}
