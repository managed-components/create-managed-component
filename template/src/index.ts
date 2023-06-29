import { ComponentSettings, Manager } from '@managed-components/types'

export default async function (manager: Manager, _settings: ComponentSettings) {
  manager.addEventListener('pageview', event => {
    console.log('Hello server!')
    event.client.execute("console.log('Hello browser')")
  })
}
