/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_3278018694')

    // remove field
    collection.fields.removeById('text492269170')

    // add field
    collection.fields.addAt(
      3,
      new Field({
        hidden: false,
        id: 'json492269170',
        maxSize: 0,
        name: 'favorite_champions',
        presentable: false,
        required: false,
        system: false,
        type: 'json',
      })
    )

    return app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_3278018694')

    // add field
    collection.fields.addAt(
      2,
      new Field({
        autogeneratePattern: '',
        hidden: false,
        id: 'text492269170',
        max: 0,
        min: 0,
        name: 'favorite_champions',
        pattern: '',
        presentable: false,
        primaryKey: false,
        required: false,
        system: false,
        type: 'text',
      })
    )

    // remove field
    collection.fields.removeById('json492269170')

    return app.save(collection)
  }
)
