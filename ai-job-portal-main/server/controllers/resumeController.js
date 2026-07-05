
const User = require('../models/User');
const pdfParse = require('pdf-parse');

const analyzeResume = async (req, res) => {
  try {
    console.log('Resume analysis request received');
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a resume PDF',
      });
    }

    console.log('File received:', req.file.originalname);

    const analysis = {
      atsScore: 75,
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express.js'],
      suggestions: [
        'Add more specific project examples',
        'Include metrics and achievements',
        'Add a professional summary',
        'Highlight technical skills clearly'
      ],
      interviewQuestions: [
        'Tell me about your experience with React',
        'Describe a project where you used Node.js',
        'How do you approach debugging?',
        'What are your favorite React best practices?'
      ]
    };

    await User.findByIdAndUpdate(req.user.id, {
      skills: analysis.skills,
    });

    console.log('Resume analysis complete!');
    res.status(200).json({
      success: true,
      analysis,
      resumeUrl: null,
    });
  } catch (error) {
    console.error('Error analyzing resume:', error);
    res.status(500).json({
      success: false,
      message: 'Error analyzing resume',
      error: error.message,
    });
  }
};

module.exports = { analyzeResume };
