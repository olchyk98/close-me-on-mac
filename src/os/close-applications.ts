import { ApplicationsKillFailed } from '../error'
import { exec } from './exec'

export const closeApplications = async (pids: number[]): Promise<void> => {
  const payload = pids.join(' ')
  const { error } = await exec(`kill -15 ${payload}`)
  if (error) throw new ApplicationsKillFailed(`"${payload}" - ${error}`)
}

