module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }, 
    token : {
      type: Sequelize.STRING,
      allowNull :true
    },
    tokenExpires : {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
         allowNull :true
    }
    
  },{ timestamps : true });
  return User;
};