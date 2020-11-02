

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({


  merchant: {
    individual: {
      type: Boolean,
      default: true
    },
    buttonDisable: {
      type: Boolean,
      default: false
    },
    businessType: {
      type: String,
      default: "individual",
    },
    businessName: {
      type: String
    }
  },
  customerReceipt: {
    type: String,
    default: ''
  },
  productSellOption: {
    type: Array,
    default: []
  },
  userMainInfo: {
    firstName: {
      type: String,
      optional: false
    },
    lastName: {
      type: String,
      optional: false
    },
    businessType: {
      type: String,
      optional: false
    },
    businessCategories: {
      type: String,
      optional: false
    },
    acceptCards: {
      type: String,
      optional: false
    },
    businessName: {
      type: String,
      optional: false
    },
    taxID: {
      type: String,
      optional: false
    },
    address1: {
      type: String,
      optional: false
    },
    address2: {
      type: String,
      optional: false
    },
    cityName: {
      type: String,
      optional: false
    },
    postalCode: {
      type: String,
      optional: false
    },
    phoneNumber: {
      type: String,
      optional: false
    },
    websiteUrl: {
      type: String,
      optional: false
    },
    businessDescription: {
      type: String,
      optional: false
    },
    DOB: {
      type: String,
      optional: false
    },
    ssn: {
      type: String,
      optional: false
    },
  },
  UserInfo: {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      optional: false
    },
    country: {
      type: String,
      optional: false
    },
  },
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');

