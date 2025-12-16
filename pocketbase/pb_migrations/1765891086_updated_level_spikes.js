/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_950155400')

    // add field
    collection.fields.addAt(
      5,
      new Field({
        hidden: false,
        id: 'bool3399560672',
        name: 'important',
        presentable: false,
        required: false,
        system: false,
        type: 'bool',
      })
    )

    return app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_950155400')

    // remove field
    collection.fields.removeById('bool3399560672')

    return app.save(collection)
  }
)
