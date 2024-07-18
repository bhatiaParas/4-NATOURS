const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  //Schema-hume jo basic information chaiye
  name: {
    type: String,
    required: [true, 'A user name must be provided'],
    trim: true, //  "  Paras Bhatia   "   "Paras Bhatia"
  },
  email: {
    type: String,
    required: [true, 'A user email must be provided'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'A user email must be provided'], //Built in Validator
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'A user password must be provided'],
    minlength: 8,
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, 'A user password must be provided'],
    validate: {
      //This only works on CREATE and SAVE!!!
      validator: function (value) {
        //User Defined Validator
        return value === this.password;
      },
      message: 'Password are not the same as your current password',
    },
  },
  passwordChangedAt: {
    type: Date,
    // default: Date,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false, //this will not show in the output when we fetch data
  },
});

// DOCUMENT MIDDLEWARE- save() and create()... runs before .save() and .create()
userSchema.pre('save', async function (next) {
  //this.password = 123;
  //this.passwordConfirm = 123;
  if (!this.isModified('password')) return next();

  //finally time to encrypt or hash the password
  //we will use very popular hashing algorithm using bcrypt
  //so this algo will first sort and and hash our password in order to make our password really strong proctected against attacks
  this.password = await bcrypt.hash(this.password, 12); //hash promise return karta ha
  //encrypted version of the password with the cost of 12

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000; // by writing -1000 ensures that the token is created after the password has been changed
  next();
});

// candidatePassword: This is the password entered by the user trying to log in.
// userPassword: This is the hashed password that is stored in the database.
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre(/^find/, function (next) {
  //this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    // console.log(changedTimestamp, JWTTimeStamp);
    return JWTTimeStamp < changedTimestamp;
  }

  //False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

//model variables are always in first capital letter
const User = mongoose.model('User', userSchema);

module.exports = User;
