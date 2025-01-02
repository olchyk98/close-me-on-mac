import { ApplicationsFetchFailed } from '../error'
import { exec } from './exec'
import { RunningApplication } from './types'

const payload = 'osascript -e \'tell application "System Events" to set output to ""\' -e \'tell application "System Events" to repeat with proc in (processes where background only is false)\' -e \'set output to output & name of proc & " ||| " & unix id of proc & linefeed\' -e \'end repeat\' -e \'return output\''

export const fetchRunningApplications = async (): Promise<RunningApplication[]> => {
  const { error: execError, value: errorResult } = await exec(payload)
  if (execError) throw new ApplicationsFetchFailed(execError.message)
  return errorResult
    .split('\n')
    .filter(Boolean)
    .map((payload) => {
      const parts = payload.split('|||')
      const name = parts[0].trim()
      const pid = Number(parts[1].trim())
      return { name, pid }
    })
}

