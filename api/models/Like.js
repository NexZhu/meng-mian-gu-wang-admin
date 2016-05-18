/**
 * Like.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: '赞',
  attributes: {
    mengliao: {
      model: 'mengliao',
      columnName: '涨讯ID',
    },
  }
}
