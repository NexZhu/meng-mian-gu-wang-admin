/**
 * MengliaoContent.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: '涨讯内容',
  attributes: {
    mengliao: {
      model: 'mengliao',
      columnName: '涨讯ID',
    },
    type: {
      type: 'string',
      columnName: '类型',
    },
    content: {
      type: 'string',
      columnName: '内容',
    },
  },
}
