import path from 'path'
import fs from 'fs'
import _locreq from 'locreq'
const locreq = _locreq(__dirname)

type Permission =
  | 'access_client_kv'
  | 'access_extended_client_kv'
  | 'execute_unsafe_scripts'
  | 'client_network_requests'
  | 'serve_static_files'
  | 'provide_server_functionality'
  | 'provide_widget'
  | 'server_network_requests'

interface Config {
  displayName: string
  namespace: string
  description: string
  icon: string
  implements: string[]
  permissions: {
    [Key in Permission]: {
      description: string
      required: boolean
    }
  }
}

export default function initTemplate(config: Config) {
  const {
    displayName,
    namespace,
    description,
    icon,
    implements: imps,
    permissions,
  } = config
  if (!fs.existsSync(namespace)) {
    fs.mkdirSync(namespace)
  }
  const manifest = {
    name: displayName,
    namespace,
    description,
    icon,
    implements: imps,
    permissions,
  }
  fs.writeFileSync(
    `${namespace}/manifest.json`,
    JSON.stringify(manifest, null, 2)
  )
  fs.writeFileSync(`${namespace}/.npmignore`, 'src')
  processDir(config)
}

function processDir(config: Config, subdir = '.') {
  const { displayName, namespace, description, implements: imps } = config
  const templateDir = path.resolve(locreq.resolve('template'), subdir)
  const targetDir = path.resolve(namespace, subdir)
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir)
  }

  const files = fs.readdirSync(templateDir)
  for (const file of files) {
    const src = path.resolve(templateDir, file)
    const dest = path.resolve(targetDir, file)
    if (fs.lstatSync(src).isDirectory()) {
      processDir(config, subdir + '/' + path.basename(src))
    } else {
      const data = fs.readFileSync(src, 'utf8')
      const replaced = data.replace(/{{ displayName }}/g, displayName as string)
      const replaced2 = replaced.replace(
        /{{ namespace }}/g,
        namespace as string
      )
      const replaced3 = replaced2.replace(
        /{{ description }}/g,
        description as string
      )
      fs.writeFileSync(dest, replaced3)
    }
  }
}
