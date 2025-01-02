export class Signal extends Error {
  __signal__: 'signal'

  constructor (message: string) {
    super(message)
    this.__signal__ = 'signal'
  }
}

export class ApplicationsFetchFailed extends Error {
  constructor (description: string) {
    super(`Could not fetch running applications: ${description}`)
  }
}

export class ApplicationsRenderFailed extends Error {
  constructor (description: string) {
    super(`Could not render the list of applications: ${description}`)
  }
}

export class ApplicationsKillFailed extends Error {
  constructor (description: string) {
    super(`Could not close chosen applications: ${description}`)
  }
}

export class NoApplicationsSelected extends Signal {
  constructor () {
    super('No applications were chosen.')
  }
}
