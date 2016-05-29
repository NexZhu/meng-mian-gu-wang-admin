/**
 * RelatedLink.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: '相关链接',
  attributes: {
    mengliao: {
      model: 'mengliao',
      columnName: '涨讯ID',
    },
    title: {
      type: 'string',
      columnName: '链接名称',
    },
    url: {
      type: 'string',
      columnName: '链接Url',  
    },
  },
}
