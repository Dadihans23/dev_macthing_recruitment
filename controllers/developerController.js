const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Developer = require('../models/developer');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

const createDeveloper = async (req, res) => {
  try {
    console.log("Received data:", req.body);  // 🔍 Debugging

    const {
      name,
      email,
      password,
      country,
      jobTitle,
      globalExperience,
      workPreference,
      availability,
      salaryExpectation,
      programmingLanguages,
      frameworks,
      versioningTools,
      projectManagementTools,
      portfolioLink,
      projects,
      bio,
      careerGoals,
      preferredEnvironment,
    } = req.body;

    // Validation des champs obligatoires
    if (!name || !email || !password || !country || !jobTitle || !globalExperience) {
      return res.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const developer = await Developer.create({
      name,
      email,
      password: hashedPassword,
      country,
      jobTitle,
      globalExperience,
      workPreference,
      availability,
      salaryExpectation,
      programmingLanguages,
      frameworks,
      versioningTools,
      projectManagementTools,
      portfolioLink,
      projects,
      bio,
      careerGoals,
      preferredEnvironment,
    });

    if (developer) {
      res.status(201).json({
        _id: developer.id,
        name: developer.name,
        email: developer.email,
        token: generateToken(developer.id),
      });
    }
  } catch (error) {
    console.error("Error creating developer:", error);
    res.status(500).json({ message: error.message });
  }
};

const loginDeveloper = async (req, res) => {
  const { email, password } = req.body;

  try {
    const developer = await Developer.findOne({ email });

    if (developer && (await bcrypt.compare(password, developer.password))) {
      res.status(200).json({
        _id: developer.id,
        name: developer.name,
        email: developer.email,
        token: generateToken(developer.id),
      });
    } else {
      res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateDeveloperProfile = async (req, res) => {
  try {
    const developer = await Developer.findById(req.userId);
    console.log (req.userId) ;
    if (developer) {
      const {
        name,
        jobTitle,
        globalExperience,
        workPreference,
        availability,
        salaryExpectation,
        programmingLanguages,
        frameworks,
        versioningTools,
        projectManagementTools,
        portfolioLink,
        projects,
        bio,
        careerGoals,
        preferredEnvironment,
        country
      } = req.body;

      if (name) developer.name = name;
      if (jobTitle) developer.jobTitle = jobTitle;
      if (globalExperience) developer.globalExperience = globalExperience;
      if (availability) developer.availability = availability;
      if (salaryExpectation) developer.salaryExpectation = salaryExpectation;
      if (careerGoals) developer.careerGoals = careerGoals;
      if (preferredEnvironment) developer.preferredEnvironment = preferredEnvironment;
      if (bio) developer.bio = bio;

      const updatedDeveloper = await developer.save();

      res.status(200).json({
        _id: updatedDeveloper.id,
        name: updatedDeveloper.name,
        email: updatedDeveloper.email,
        token: generateToken(updatedDeveloper.id)
      });
    } else {
      res.status(404).json({ message: 'Développeur non trouvé.' });
      console.log (req.userId) ;

    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log('Update error:', error.message);
  }
};


const deleteDeveloperAccount = async (req, res) => {
  try {
    const developer = await Developer.findById(req.developer.id);

    if (developer) {
      await developer.remove();
      res.status(200).json({ message: 'Compte développeur supprimé avec succès.' });
    } else {
      res.status(404).json({ message: 'Développeur non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addProjectToPortfolio = async (req, res) => {
  const { projectName, description, technologiesUsed, demoLink } = req.body;

  // Validation des champs requis
  if (!projectName || !description || !technologiesUsed) {
    return res.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis.' });
  }

  try {
    const developer = await Developer.findById(req.userId);

    if (!developer) {
      return res.status(404).json({ message: 'Développeur non trouvé.' });
    }

    // Création du nouveau projet
    const newProject = {
      projectName,
      description,
      technologiesUsed,
      demoLink: demoLink || null,
    };

    // Ajout du projet au portfolio
    developer.projects.push(newProject);
    await developer.save();

    res.status(201).json({
      message: 'Projet ajouté au portfolio avec succès.',
      project: newProject,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(req.developer.id);
  }
};




module.exports = { createDeveloper , loginDeveloper , updateDeveloperProfile , deleteDeveloperAccount , addProjectToPortfolio};
