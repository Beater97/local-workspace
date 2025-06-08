import { mainsql } from './queryInit.module'
import dbInstance from './sqllite.module'

export function initialize() {
  console.log('init check')
  dbInstance.runSQLScript(mainsql())
}
