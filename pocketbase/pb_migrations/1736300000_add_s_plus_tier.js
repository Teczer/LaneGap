/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("counters")

  // Find the tier field and add S+ to its options
  const tierField = collection.fields.find(f => f.name === "tier")
  if (tierField) {
    // Add S+ to the values if not already present
    const values = tierField.values || []
    if (!values.includes("S+")) {
      tierField.values = ["S+", ...values]
    }
  }

  app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("counters")

  // Remove S+ from the tier field options
  const tierField = collection.fields.find(f => f.name === "tier")
  if (tierField) {
    tierField.values = tierField.values.filter(v => v !== "S+")
  }

  app.save(collection)
})
