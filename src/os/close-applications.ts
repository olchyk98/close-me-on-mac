import { safe } from '../_internal'
import { exec } from './exec'

export const closeApplications = safe(
  async (pids: number[]): Promise<void> => {
    const payload = pids.join(' ')
    const { error } = await exec(`kill -15 ${payload}`)
    if (error) throw Error(`Could not close processes "${payload}": ${error}`)
  },
)
