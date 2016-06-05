/**
 * Comment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: '评论',
  attributes: {
    mengliao: {
      model: 'mengliao',
      columnName: '涨讯ID',
    },
    author: {
      model: 'user',
      columnName: '评论人',
    },
    time: {
      type: 'datetime',
      columnName: '创建时间',
    },
    content: {
      type: 'string',
      columnName: '评论内容',
    },
  },
}
