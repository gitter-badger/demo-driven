import * as minimist from 'minimist'

export interface CommandOptions {
  boolean?: {
    /**
     * Name - description
     */
    [optionName: string]: string
  },
  string?: {
    /**
     * Name - description or array of possible values
     */
    [optionName: string]: string | string[]
  }
  alias?: {
    /**
     * Option - array of alias
     */
    [optionName: string]: string[]
  },
  default?: {
    [optionName: string]: string
  }
}

export interface Command {
  /**
   * Name of the command.
   */
  name: string
  description: string
  alias?: string[]
  arguments?: Array<{
    name: string,
    required?: boolean
  }>
  options?: CommandOptions
}

function toMinimistOption(command: Command) {
  if (!command.options) {
    return {}
  }

  return {
    boolean: command.options.boolean ? Object.keys(command.options.boolean) : undefined,
    string: command.options.string ? Object.keys(command.options.string) : undefined,
    alias: command.options.alias,
    default: command.options.default
  }
}

export function parseCommand(rawArgv, command) {
  const options = toMinimistOption(command)
  const argv = minimist(rawArgv, options)
  // First entry is command name. Not used.
  argv._.shift()
  return argv
}
