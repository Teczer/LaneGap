/// <reference path="../pb_data/types.d.ts" />

/**
 * Auto-update champion's date_edited field when:
 * - Champion record is directly modified
 * - Related records (counters, level_spikes, item_spikes) are created/updated/deleted
 */

// ============================================
// CHAMPION DIRECT UPDATE
// ============================================

onRecordAfterUpdateSuccess((e) => {
  const today = new Date().toISOString().split('T')[0]
  const currentDate = e.record.get('date_edited')

  if (currentDate !== today) {
    e.record.set('date_edited', today)
    $app.save(e.record)
  }
}, 'champions')

// ============================================
// RELATED RECORDS - Update champion date
// ============================================

const RELATED_COLLECTIONS = ['counters', 'level_spikes', 'item_spikes']

RELATED_COLLECTIONS.forEach((collection) => {
  // After create
  onRecordAfterCreateSuccess((e) => {
    const championId = e.record.get('champion')
    if (championId) {
      const today = new Date().toISOString().split('T')[0]
      const champion = $app.findRecordById('champions', championId)
      if (champion && champion.get('date_edited') !== today) {
        champion.set('date_edited', today)
        $app.save(champion)
      }
    }
  }, collection)

  // After update
  onRecordAfterUpdateSuccess((e) => {
    const championId = e.record.get('champion')
    if (championId) {
      const today = new Date().toISOString().split('T')[0]
      const champion = $app.findRecordById('champions', championId)
      if (champion && champion.get('date_edited') !== today) {
        champion.set('date_edited', today)
        $app.save(champion)
      }
    }
  }, collection)

  // After delete
  onRecordAfterDeleteSuccess((e) => {
    const championId = e.record.get('champion')
    if (championId) {
      const today = new Date().toISOString().split('T')[0]
      const champion = $app.findRecordById('champions', championId)
      if (champion && champion.get('date_edited') !== today) {
        champion.set('date_edited', today)
        $app.save(champion)
      }
    }
  }, collection)
})
