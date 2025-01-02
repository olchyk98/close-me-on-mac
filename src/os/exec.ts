import util from 'util'
import { exec as execWithCb } from 'child_process'
import { safe } from '../_internal'

const execPromised = util.promisify(execWithCb)

export const exec = safe(
  async (command: string): Promise<string> => {
    const { stderr, stdout } = await execPromised(command)
    if (stderr) throw new EvalError(stderr)
    return stdout
  },
)

