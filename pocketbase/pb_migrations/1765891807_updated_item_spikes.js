/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_1619282836')

    // update field
    collection.fields.addAt(
      1,
      new Field({
        cascadeDelete: false,
        collectionId: 'pbc_3010207096',
        hidden: false,
        id: 'relation1542800728',
        maxSelect: 1,
        minSelect: 0,
        name: 'champion',
        presentable: false,
        required: true,
        system: false,
        type: 'relation',
      })
    )

    return app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_1619282836')

    // update field
    collection.fields.addAt(
      1,
      new Field({
        cascadeDelete: false,
        collectionId: 'pbc_3010207096',
        hidden: false,
        id: 'relation1542800728',
        maxSelect: 1,
        minSelect: 0,
        name: 'field',
        presentable: false,
        required: true,
        system: false,
        type: 'relation',
      })
    )

    return app.save(collection)
  }
)
