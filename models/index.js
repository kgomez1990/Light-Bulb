//Need to edit the foreign keys for Innovation/Comments

const User = require('./User');
const Innovation = require('./Innovation');
const Comment = require('./Comment');

User.hasMany(Innovation, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Innovation.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Innovation.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Innovation, {
  foreignKey: 'user_id'
});  

module.exports = { User, Innovation, Comment };
