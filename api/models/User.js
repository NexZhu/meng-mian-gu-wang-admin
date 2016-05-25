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
    gender: {
      type: 'string',
      columnName: '性别',
    },
    avatar: {
      type: 'string',
      columnName: '头像',
    },
    mengliaos: {
      collection: 'mengliao',
      via: 'author',
    },
    followings: {
      collection: 'follow',
      via: 'follower',
    },
    followers: {
      collection: 'follow',
      via: 'user',
    },
    likes: {
      collection: 'like',
      via: 'user',
    },
  },
}
