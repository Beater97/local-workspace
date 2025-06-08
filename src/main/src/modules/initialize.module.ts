import { getDB } from './sqllite.module'
import { mainsql } from './queryInit.module'

export function initialize() {
  console.log('init check')
  getDB().runSQLScript(mainsql())
}
