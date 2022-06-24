import chalk from 'chalk'
import fs from 'fs'
import minimist from 'minimist'
import prompts from 'prompts'
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
    displayName?: string
    namespace?: string
    needsVitest?: boolean
    needsEslint?: boolean
    needsPrettier?: boolean
  } = {}

  const argv = minimist(process.argv.slice(2), {})
  let targetDir = argv._[0]
  try {
    // Prompts:
    // - Component name
    // - Namespace (aka package name)
    // - Add Vitest for testing?
    // - Add ESLint for code quality?
    // - Add Prettier for code formatting?
    // - TODO, select required permissions?
    // - TODO, set manifest description
    // - TODO, set manifest categories
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

  console.log(
    'creating new Managed Component project with parameters:',
    chalk.green(JSON.stringify(result, null, 2))
  )

  const templateDir = './template'
  const files = fs.readdirSync(templateDir)
  if (!fs.existsSync(result.namespace as string)) {
    fs.mkdirSync(result.namespace as string)
  }
  for (const file of files) {
    const src = `${templateDir}/${file}`
    const dest = `${result.namespace}/${file}`
    if (fs.lstatSync(src).isDirectory()) {
      if (file === 'src') {
        fs.mkdirSync(dest)
        const srcFiles = fs.readdirSync(src)
        for (const file of srcFiles) {
          const srcFile = `${src}/${file}`
          const destFile = `${dest}/${file}`
          fs.copyFileSync(srcFile, destFile)
        }
      }
      continue
    } else {
      const data = fs.readFileSync(src, 'utf8')
      const replaced = data.replace(
        /{{ displayName }}/g,
        result.displayName as string
      )
      const replaced2 = replaced.replace(
        /{{ namespace }}/g,
        result.namespace as string
      )
      const replaced3 = replaced2.replace(
        /\[ \] find & replace /g,
        '[x] find & replace '
      )
      await fs.writeFileSync(dest, replaced3)
    }
  }
  console.log(chalk.green('✔') + ' Project created')
})()

export {}
