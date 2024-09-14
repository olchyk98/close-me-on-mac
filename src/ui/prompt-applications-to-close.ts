import { select } from 'inquirer-select-pro'
import { safe } from '../_internal'
import { RunningApplication } from '../os'

export const __fn = (apps: RunningApplication[]): Promise<number[]> => {
  const message = 'Select applications to close'
  const options = apps.map((l) => ({ value: l.pid, name: l.name }))
  return select({ message, options })
}

export const promptApplicationsToClose = safe(__fn)
