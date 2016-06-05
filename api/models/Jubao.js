/**
 * Jubao.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: '举报内容',
  attributes: {
    comment: {
      model: 'comment',
      columnName: '评论_ID',
    },
    reporter: {
      model: 'user',
      columnName: '举报人',
    },
    reported: {
      model: 'user',
      columnName: '被举报人',
    },
    time: {
      type: 'datetime',
      columnName: '创建时间',
    },
    content: {
      type: 'string',
      columnName: '内容',
    },
  },
}
