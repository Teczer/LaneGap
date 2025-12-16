/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_3010207096')

    // update field
    collection.fields.addAt(
      2,
      new Field({
        autogeneratePattern: '',
        hidden: false,
        id: 'text1031224004',
        max: 0,
        min: 0,
        name: 'name_en',
        pattern: '',
        presentable: false,
        primaryKey: false,
        required: true,
        system: false,
        type: 'text',
      })
    )

    // update field
    collection.fields.addAt(
      3,
      new Field({
        autogeneratePattern: '',
        hidden: false,
        id: 'text39531848',
        max: 0,
        min: 0,
        name: 'name_fr',
        pattern: '',
        presentable: false,
        primaryKey: false,
        required: true,
        system: false,
        type: 'text',
      })
    )

    // update field
    collection.fields.addAt(
      4,
      new Field({
        autogeneratePattern: '',
        hidden: false,
        id: 'text645829506',
        max: 0,
        min: 0,
        name: 'date_edited',
        pattern: '',
        presentable: false,
        primaryKey: false,
        required: true,
        system: false,
        type: 'text',
      })
    )

    // update field
    collection.fields.addAt(
      5,
      new Field({
        hidden: false,
        id: 'json4287111257',
        maxSize: 0,
        name: 'tips_en',
        presentable: false,
        required: true,
        system: false,
        type: 'json',
      })
    )

    // update field
    collection.fields.addAt(
      6,
      new Field({
        hidden: false,
        id: 'json3231985621',
        maxSize: 0,
        name: 'tips_fr',
        presentable: false,
        required: true,
        system: false,
        type: 'json',
      })
    )

    return app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_3010207096')

    // update field
    collection.fields.addAt(
      2,
      new Field({
        autogeneratePattern: '',
        hidden: false,
        id: 'text1031224004',
        max: 0,
        min: 0,
        name: 'name_en',
        pattern: '',
        presentable: false,
        primaryKey: false,
        required: false,
        system: false,
        type: 'text',
      })
    )

    // update field
    collection.fields.addAt(
      3,
      new Field({
        autogeneratePattern: '',
        hidden: false,
        id: 'text39531848',
        max: 0,
        min: 0,
        name: 'name_fr',
        pattern: '',
        presentable: false,
        primaryKey: false,
        required: false,
        system: false,
        type: 'text',
      })
    )

    // update field
    collection.fields.addAt(
      4,
      new Field({
        autogeneratePattern: '',
        hidden: false,
        id: 'text645829506',
        max: 0,
        min: 0,
        name: 'date_edited',
        pattern: '',
        presentable: false,
        primaryKey: false,
        required: false,
        system: false,
        type: 'text',
      })
    )

    // update field
    collection.fields.addAt(
      5,
      new Field({
        hidden: false,
        id: 'json4287111257',
        maxSize: 0,
        name: 'tips_en',
        presentable: false,
        required: false,
        system: false,
        type: 'json',
      })
    )

    // update field
    collection.fields.addAt(
      6,
      new Field({
        hidden: false,
        id: 'json3231985621',
        maxSize: 0,
        name: 'tips_fr',
        presentable: false,
        required: false,
        system: false,
        type: 'json',
      })
    )

    return app.save(collection)
  }
)
