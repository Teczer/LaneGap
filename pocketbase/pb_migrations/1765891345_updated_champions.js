/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_3010207096')

    // update field
    collection.fields.addAt(
      1,
      new Field({
        autogeneratePattern: '',
        hidden: false,
        id: 'text4202682347',
        max: 0,
        min: 0,
        name: 'champion_id',
        pattern: '',
        presentable: true,
        primaryKey: false,
        required: true,
        system: false,
        type: 'text',
      })
    )

    return app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_3010207096')

    // update field
    collection.fields.addAt(
      1,
      new Field({
        autogeneratePattern: '',
        hidden: false,
        id: 'text4202682347',
        max: 0,
        min: 0,
        name: 'champion_id',
        pattern: '',
        presentable: false,
        primaryKey: false,
        required: true,
        system: false,
        type: 'text',
      })
    )

    return app.save(collection)
  }
)
