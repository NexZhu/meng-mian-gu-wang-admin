/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: '用户',
  attributes: {
    name: {
      type: 'string',
      columnName: '昵称',
    },
    mengliaos: {
      collection: 'mengliao',
      via: 'author',
    },
    following: {
      collection: 'follow',
      via: 'follower',
    },
    follower: {
      collection: 'follow',
      via: 'user',
    },
  },
}
