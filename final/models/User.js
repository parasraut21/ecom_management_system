const Sequelize = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');
const { ARRAY } = require('sequelize');

const sequelize = new Sequelize('ecom', 'root', 'aditi12358', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => {
    console.log('User Connected to MySQL server');
  })
  .catch((error) => {
    console.error('Unable to connect to MySQL server:', error);
  });


  // const customers = sequelize.define('customers', {
  //   name: {
  //     type: Sequelize.STRING,
  //     allowNull: false
  //   },
  //   email: {
  //     type: Sequelize.STRING,
  //     allowNull: false,
  //     unique: true
  //   },
  //   cpassword: {
  //     type: Sequelize.STRING,
  //     allowNull: false
  //   },
  //   confirmPassword :{
  //     type: Sequelize.STRING,
  //     allowNull:false
  //   }
  // });

  const customers = sequelize.define('customers', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    cpassword: {
      type: Sequelize.STRING,
      allowNull: false
    },
    confirmPassword :{
      type: Sequelize.STRING,
      allowNull:false
    }
  });

  const delivery_boy = sequelize.define('delivery_boy', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    customerId: {
      type: Sequelize.INTEGER,
      references: {
        model: customers,
        key: 'id'
      }
    }
   
  });






  const Otp = sequelize.define('Otp', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    customerId: {
      type: Sequelize.INTEGER,
      references: {
        model: customers,
        key: 'id'
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
otp :{
    type : Sequelize.INTEGER,
    allowNull : false
}
  });


  const reset = sequelize.define('reset', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    customerId: {
      type: Sequelize.INTEGER,
      references: {
        model: customers,
        key: 'id'
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    newPassword:{
      type : Sequelize.STRING,
      allowNull : false
    },
otp :{
    type : Sequelize.INTEGER,
    allowNull : false
}
  });

  
  const Order = sequelize.define('Order', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    customerId: {
      type: Sequelize.INTEGER,
      references: {
        model: customers,
        key: 'id'
      }
    },
    userEmail: {
      type: Sequelize.STRING,
      allowNull: false
    },
    orderData: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    orderDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  });
  
  Otp.belongsTo(customers);
  reset.belongsTo(customers);
  Order.belongsTo(customers);
  delivery_boy.belongsTo(customers);


  sequelize.sync()
  .then(() => {
    console.log('Schema synchronized with database');
  })
  .catch((error) => {
    console.error('Unable to synchronize schema with database:');
  });
  module.exports =  {customers,Otp,reset,Order,delivery_boy} 