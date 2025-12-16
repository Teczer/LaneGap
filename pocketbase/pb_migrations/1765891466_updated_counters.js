/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_90131592')

    // remove field
    collection.fields.removeById('relation1997663227')

    // remove field
    collection.fields.removeById('relation2176257890')

    // remove field
    collection.fields.removeById('text4287111257')

    // remove field
    collection.fields.removeById('text3231985621')

    return app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_90131592')

    // add field
    collection.fields.addAt(
      1,
      new Field({
        cascadeDelete: false,
        collectionId: 'pbc_3010207096',
        hidden: false,
        id: 'relation1997663227',
        maxSelect: 1,
        minSelect: 0,
        name: 'my_champion',
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
        id: 'relation2176257890',
        maxSelect: 1,
        minSelect: 0,
        name: 'enemy_champion',
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
        autogeneratePattern: '',
        hidden: false,
        id: 'text4287111257',
        max: 0,
        min: 0,
        name: 'tips_en',
        pattern: '',
        presentable: false,
        primaryKey: false,
        required: true,
        system: false,
        type: 'text',
      })
    )

    // add field
    collection.fields.addAt(
      4,
      new Field({
        autogeneratePattern: '',
        hidden: false,
        id: 'text3231985621',
        max: 0,
        min: 0,
        name: 'tips_fr',
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
