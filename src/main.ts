import { closeApplications, fetchRunningApplications } from './os'
import { promptApplicationsToClose } from './ui'

export async function main (): Promise<0 | 100> {
  const { error: appsError, value: apps } = await fetchRunningApplications()
  if (appsError) {
    throw new Error(`Could not fetch running applications: ${appsError}`)
  }

  const { error: pidsError, value: pids } = await promptApplicationsToClose(apps)
  if (pidsError) throw new Error(`Could not render the list of applications: ${pidsError}`)
  if (!pids.length) {
    console.log('No applications were chosen.')
    return 100
  }

  const { error: closeError } = await closeApplications(pids)
  if (closeError) throw new Error(`Could not close chosen applications: ${closeError}`)
  console.log(`Closed ${pids.length} application(s)!`)

  return 0
}

export type ExitStatus =
  | 0 // Main Flow
  | 100 // Interrupted by User
