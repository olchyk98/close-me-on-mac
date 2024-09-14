import { safe } from '../_internal'
import { exec } from './exec'

export const __fn = async (pids: number[]): Promise<void> => {
  const payload = pids.join(' ')
  const { error } = await exec(`kill ${payload}`)
  if (error) throw Error(`Could not kill processes "${payload}": ${error}`)
}

export const closeApplications = safe(__fn)
