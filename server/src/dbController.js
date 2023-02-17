import fs from 'fs'
import {resolve} from 'path'

const basePath = resolve()

const filenames = {
    exrciselog: resolve(basePath, 'src/db/workoutLog.json')
}

export const readDB = target => {
    try {
        return fs.readFileSync(filenames[target], 'utf-8')
    } catch(err) {
        console.error(err)
    }
}

export const writeDB = (target, data) => {
    try {
        return fs.writeFileSync(filenames[target], JSON.stringify(data))
    } catch(err) {
        console.error(err)
    }
}