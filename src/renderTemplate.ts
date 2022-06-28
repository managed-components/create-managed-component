import fs from 'fs'

type Permission =
  | 'access_client_kv'
  | 'access_extended_client_kv'
  | 'execute_unsafe_scripts'
  | 'client_network_requests'
  | 'serve_static_files'
  | 'provide_server_functionality'
  | 'provide_widget'

interface Config {
  displayName: string
  namespace: string
  description: string
  icon: string
  permissions: {
    [Key in Permission]: {
      description: string
      required: boolean
    }
  }
}

export default async (config: Config) => {
  const { displayName, namespace, description, icon, permissions } = config
  const templateDir = './template'
  const files = fs.readdirSync(templateDir)
  if (!fs.existsSync(namespace as string)) {
    fs.mkdirSync(namespace as string)
  }
  const manifest = {
    name: displayName,
    namespace,
    description,
    icon,
    permissions,
  }
  fs.writeFileSync(
    `${namespace}/manifest.json`,
    JSON.stringify(manifest, null, 2)
  )
  for (const file of files) {
    const src = `${templateDir}/${file}`
    const dest = `${namespace}/${file}`
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
      // TODO - write description, icon and permissions of manifest.json
      const data = fs.readFileSync(src, 'utf8')
      const replaced = data.replace(/{{ displayName }}/g, displayName as string)
      const replaced2 = replaced.replace(
        /{{ namespace }}/g,
        namespace as string
      )
      const replaced3 = replaced2.replace(
        /\[ \] find & replace /g,
        '[x] find & replace '
      )
      await fs.writeFileSync(dest, replaced3)
    }
  }
}
