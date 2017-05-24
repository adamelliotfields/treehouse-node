const dateFormat = require('dateformat');

module.exports = function(sequelize, DataTypes) {
  const Article = sequelize.define('Article', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Title is required'
        }
      }
    },
    author: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      publishedAt: function() {
        return dateFormat(this.createdAt, 'dddd, mmmm dS, yyyy, h:MM TT');
      },
      shortDescription: function() {
        this.body.length > 30 ? `${this.body.substr(0, 30)} ...` : this.body;
      }
    }
  });
  return Article;
};
