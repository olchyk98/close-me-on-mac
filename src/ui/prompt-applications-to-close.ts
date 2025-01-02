import { select } from 'inquirer-select-pro'
import { RunningApplication } from '../os'
import { ApplicationsRenderFailed } from '../error'

export const promptApplicationsToClose = (apps: RunningApplication[]): Promise<number[]> => {
  try {
    const message = 'Select applications to close'
    const options = apps.map((l) => ({ value: l.pid, name: l.name }))
    return select({ message, options })
  } catch (e) {
    if (e instanceof Error) {
      throw new ApplicationsRenderFailed(e.message)
    }
    throw e
  }
}
