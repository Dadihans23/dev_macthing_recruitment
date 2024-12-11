const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: null, // Optionnel
  },
  jobTitle: {
    type: String,
    required: true,
  },
  globalExperience: {
    type: Number, // Années d'expérience globale
    required: true,
  },
  workPreference: {
    type:  [String],
    enum: ['Freelance', 'CDI', 'CDD', 'Remote', 'Hybride'],
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  salaryExpectation: {
    type: Number,
    required: true,
  },
  programmingLanguages: [
    {
      name: { type: String, required: true },
      level: { type: String, enum: ['Débutant', 'Intermédiaire', 'Avancé'], required: true },
      years: { type: Number, required: true },
    },
  ],
  frameworks: [
    {
      name: { type: String, required: true },
      level: { type: String, enum: ['Débutant', 'Intermédiaire', 'Avancé'], required: true },
      years: { type: Number, required: true },
    },
  ],
  versioningTools: [String],
  projectManagementTools: [String],
  portfolioLink: {
    type: String,
    default: null,
  },
  projects: [
    {
      projectName: { type: String, required: true },
      description: { type: String, required: true },
      technologiesUsed: [String],
      demoLink: { type: String, default: null },
    },
  ],
  bio: {
    type: String,
    required: true,
  },
  careerGoals: {
    type: String,
    required: true,
  },
  preferredEnvironment: {
    type: String,
    enum: ['Startup', 'Grande entreprise', 'Freelance', 'Remote'],
    required: true,
  },
}, { timestamps: true });

// const Developer = mongoose.model('Developer', developerSchema);
const Developer = mongoose.models.Developer || mongoose.model('Developer', developerSchema);

module.exports = Developer;
