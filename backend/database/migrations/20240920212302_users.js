/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('googleID')
        table.string('name').notNullable()
        table.string('username').notNullable().unique()
        table.string('email').notNullable().unique()
        table.string('password')
        table.string('auth').notNullable()

        table.timestamps(true, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
};
