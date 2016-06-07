/**
 * SystemMessage.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: '涨讯',
  attributes: {
    time: {
      type: 'datetime',
      columnName: '创建时间',
    },
    mengliao: {
      model: 'mengliao',
      columnName: '关联_id',
    },
    type: {
      type: 'string',
      columnName: '类型',
    },
    content: {
      type: 'string',
      columnName: '内容',
    },
    read: {
      type: 'string',
      columnName: '是否阅读',
    },
    pushId: {
      type: 'string',
      columnName: '推送_id',
    },
    status: {
      type: 'string',
      columnName: '状态',
    },
    user: {
      model: 'user',
      columnName: '接收者_id',
    },
  },
}
