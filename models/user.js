const Model = require('objection').Model

class User extends Model {
  static get tableName() {
    return 'users';
  }
  
  static get jsonSchema() {
    return {
      title: 'User',
      description: 'A verified user',
      type: 'object',

      properties: {
        username: { type: 'string' },
        password: { type: 'string' }
      },
      
      required: ['username', 'password'],
    };
  }
}

module.exports = User;