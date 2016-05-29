/**
 * Mengliao.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: '涨讯',
  attributes: {
    author: {
      model: 'user',
      columnName: '发布人',
    },
    authorRole: {
      model: 'role',
      columnName: '发布角色',
    },
    time: {
      type: 'datetime',
      columnName: '更新时间',
    },
    contents: {
      collection: 'mengliaoContent',
      via: 'mengliao',
    },
    likes: {
      collection: 'like',
      via: 'mengliao',
    },
    comments: {
      collection: 'comment',
      via: 'mengliao',
    },
  },
}
