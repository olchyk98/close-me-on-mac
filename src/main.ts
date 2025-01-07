import { NoApplicationsSelected, NoApplicationsToSelect, Signal } from './error'
import { closeApplications, fetchRunningApplications } from './os'
import { promptApplicationsToClose } from './ui'

export async function main (): Promise<void> {
  await Promise.resolve(console.log('Fetching applications...'))
    .then(fetchRunningApplications)
    .then((apps) => {
      if (apps.length <= 0) {
        throw new NoApplicationsToSelect()
      }
      return apps
    })
    .then(promptApplicationsToClose)
    .then((pids) => {
      if (pids.length <= 0) {
        throw new NoApplicationsSelected()
      }
      return pids
    })
    .then(async (pids) => {
      await closeApplications(pids)
      console.log(`Closed ${pids.length} application(s)!`)
    })
    .catch((e) => {
      if (e instanceof Signal) {
        console.log(e.message)
        return
      }
      throw e
    })
}
