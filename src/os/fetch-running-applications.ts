import { ApplicationsFetchFailed } from '../error'
import { exec } from './exec'
import { RunningApplication } from './types'

export const fetchRunningApplications = async (): Promise<RunningApplication[]> => {
  const { error: execError, value: result } = await exec('lsappinfo list')
  if (execError) throw new ApplicationsFetchFailed(execError.message)
  return result
    .split(/\d+\)/)
    .filter((content) => {
      if (content.trim().length <= 0) return false
      // (...) - is a capturing group. value.match::[1] will
      // return only value within the capturing group in this case.
      const typeAttr = content.match(/type="([A-Za-z]+)"/)?.[1]
      return typeAttr === 'Foreground'
    })
    .map((content) => {
      const name = content.match(/"(.*)"/)?.[1]
      const pidStr = content.match(/pid = (\d+)/)?.[1]
      const pid = Number(pidStr)
      if (!name || !pid) return null
      return { name, pid }
    })
    .filter(Boolean) as RunningApplication[]
}

