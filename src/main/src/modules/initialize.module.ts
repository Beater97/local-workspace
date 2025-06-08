import dbInstance from './sqllite.module'
import { mainsql } from './queryInit.module'

export function initialize() {
  console.log('init check')
  dbInstance.runSQLScript(mainsql())
}
