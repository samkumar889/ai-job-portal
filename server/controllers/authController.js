
const User = require('../models/User');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

dotenv.config();

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    auth: {
      user: process.env.SMTP_EMAIL || 'test@example.com',
      pass: process.env.SMTP_PASSWORD || 'testpass',
    },
  });

  const message = {
    from: `${process.env.FROM_NAME || 'Job Portal'} <${process.env.FROM_EMAIL || 'noreply@jobportal.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transporter.sendMail(message);

  console.log('Email sent: %s', info.messageId);
};

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
    });

    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Auth Error:', error);
    let errorMessage = 'Server error';
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      errorMessage = errors.join(', ');
    } else if (error.code === 11000) {
      errorMessage = 'User with this email already exists';
    } else {
      errorMessage = error.message;
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Auth Error:', error);
    let errorMessage = 'Server error';
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      errorMessage = errors.join(', ');
    } else if (error.code === 11000) {
      errorMessage = 'User with this email already exists';
    } else {
      errorMessage = error.message;
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Auth Error:', error);
    let errorMessage = 'Server error';
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      errorMessage = errors.join(', ');
    } else if (error.code === 11000) {
      errorMessage = 'User with this email already exists';
    } else {
      errorMessage = error.message;
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with this email',
      });
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Reset Token',
        message,
      });

      res.status(200).json({
        success: true,
        message: 'Email sent successfully',
      });
    } catch (error) {
      console.error('Email Error:', error);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        success: false,
        message: 'Email could not be sent',
      });
    }
  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = { register, login, getMe, forgotPassword, resetPassword };
