/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    // Update user_notes - enable cascade delete on user relation
    const userNotes = app.findCollectionByNameOrId('user_notes')
    const userNotesUserField = userNotes.fields.find((f) => f.name === 'user')
    if (userNotesUserField) {
      userNotesUserField.cascadeDelete = true
    }
    app.save(userNotes)

    // Update user_favorites - enable cascade delete on user relation
    const userFavorites = app.findCollectionByNameOrId('user_favorites')
    const userFavoritesUserField = userFavorites.fields.find((f) => f.name === 'user')
    if (userFavoritesUserField) {
      userFavoritesUserField.cascadeDelete = true
    }
    app.save(userFavorites)
  },
  (app) => {
    // Revert - disable cascade delete
    const userNotes = app.findCollectionByNameOrId('user_notes')
    const userNotesUserField = userNotes.fields.find((f) => f.name === 'user')
    if (userNotesUserField) {
      userNotesUserField.cascadeDelete = false
    }
    app.save(userNotes)

    const userFavorites = app.findCollectionByNameOrId('user_favorites')
    const userFavoritesUserField = userFavorites.fields.find((f) => f.name === 'user')
    if (userFavoritesUserField) {
      userFavoritesUserField.cascadeDelete = false
    }
    app.save(userFavorites)
  }
)

