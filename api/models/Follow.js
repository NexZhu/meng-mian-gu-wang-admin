/**
 * Follow.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: '用户关注',
  attributes: {
    user: {
      model: 'user',
      columnName: '用户',
    },
    follower: {
      model: 'user',
      columnName: '粉丝',
    },
  },
}
