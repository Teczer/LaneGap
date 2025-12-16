/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_90131592')

    // add field
    collection.fields.addAt(
      1,
      new Field({
        cascadeDelete: false,
        collectionId: 'pbc_3010207096',
        hidden: false,
        id: 'relation1162051252',
        maxSelect: 1,
        minSelect: 0,
        name: 'champion',
        presentable: false,
        required: true,
        system: false,
        type: 'relation',
      })
    )

    // add field
    collection.fields.addAt(
      2,
      new Field({
        cascadeDelete: false,
        collectionId: 'pbc_3010207096',
        hidden: false,
        id: 'relation161744310',
        maxSelect: 1,
        minSelect: 0,
        name: 'counter_champion',
        presentable: false,
        required: true,
        system: false,
        type: 'relation',
      })
    )

    // add field
    collection.fields.addAt(
      3,
      new Field({
        hidden: false,
        id: 'select1542800728',
        maxSelect: 1,
        name: 'field',
        presentable: false,
        required: false,
        system: false,
        type: 'select',
        values: ['S', 'A+', 'A', 'B+', 'B', 'B-', 'C'],
      })
    )

    return app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_90131592')

    // remove field
    collection.fields.removeById('relation1162051252')

    // remove field
    collection.fields.removeById('relation161744310')

    // remove field
    collection.fields.removeById('select1542800728')

    return app.save(collection)
  }
)
