/**
 * Role.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: '角色',
  attributes: {
    name: {
      type: 'string',
      columnName: '角色名称',
    },
    user: {
      model: 'user',
      columnName: '用户',
    },
    avatar: {
      type: 'string',
      columnName: '头像',
    },
    mengliaos: {
      collection: 'mengliao',
      via: 'authorRole',
    },
  }
}
