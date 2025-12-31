/// <reference path="../pb_data/types.d.ts" />

/**
 * Migration: Rename 'field' column to 'tier' in counters collection
 */
migrate((app) => {
  const collection = app.findCollectionByNameOrId("counters")
  
  // Find the field named 'field' and rename it to 'tier'
  const fieldToRename = collection.fields.find(f => f.name === "field")
  if (fieldToRename) {
    fieldToRename.name = "tier"
  }
  
  app.save(collection)
}, (app) => {
  // Revert: rename back to 'field'
  const collection = app.findCollectionByNameOrId("counters")
  
  const fieldToRename = collection.fields.find(f => f.name === "tier")
  if (fieldToRename) {
    fieldToRename.name = "field"
  }
  
  app.save(collection)
})

