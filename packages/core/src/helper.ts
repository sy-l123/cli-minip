import * as fs from 'path'
import * as chalk from 'chalk'

export const helper = {
    fs,
    chalk,
    createDebug: id => require('debug')(id)
}

export default helper