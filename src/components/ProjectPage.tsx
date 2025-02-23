import React from 'react';
import { Github, ExternalLink, Code, BookOpen, Zap, Layout, Settings } from 'lucide-react';
import { Button } from './ui';

const ProjectPage = () => {
  const project = {
    title: 'Franco Labs Research Platform',
    description: 'A comprehensive research platform for user behavior analysis and testing',
    features: [
      'Real-time collaboration boards',
      'Interactive test builders',
      'Advanced analytics dashboard',
      'Team management tools',
      'Customizable workspace',
      'Secure data handling'
    ],
    technologies: [
      { name: 'React', icon: 'react.svg' },
      { name: 'TypeScript', icon: 'typescript.svg' },
      { name: 'Tailwind CSS', icon: 'tailwind.svg' },
      { name: 'Supabase', icon: 'supabase.svg' },
      { name: 'Vite', icon: 'vite.svg' },
      { name: 'Zustand', icon: 'zustand.png' }
    ],
    screenshots: [
      '/screenshots/dashboard.png',
      '/screenshots/board.png',
      '/screenshots/analytics.png'
    ],
    demoUrl: 'https://francolabs.com',
    repoUrl: 'https://github.com/glauberfrancodesign/fs-shibuya',
    installation: [
      'Clone the repository: git clone https://github.com/glauberfrancodesign/fs-shibuya.git',
      'Install dependencies: npm install',
      'Set up environment variables',
      'Run development server: npm run dev'
    ],
    contribution: [
      'Fork the repository',
      'Create a new branch: git checkout -b feature/your-feature',
      'Commit your changes: git commit -m "Add your feature"',
      'Push to the branch: git push origin feature/your-feature',
      'Create a new pull request'
    ],
    license: 'MIT'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">
          {project.title}
        </h1>
        <p className="text-xl text-dark-400 max-w-2xl mx-auto">
          {project.description}
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button
            variant="primary"
            leftIcon={<ExternalLink className="w-5 h-5" />}
            onClick={() => window.open(project.demoUrl, '_blank')}
          >
            Live Demo
          </Button>
          <Button
            variant="secondary"
            leftIcon={<Github className="w-5 h-5" />}
            onClick={() => window.open(project.repoUrl, '_blank')}
          >
            View Source
          </Button>
        </div>
      </header>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          <Zap className="w-6 h-6 text-accent-500" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.features.map((feature, index) => (
            <div
              key={index}
              className="bg-dark-900 rounded-xl p-6 border border-dark-800 hover:border-dark-700 transition-colors"
            >
              <div className="text-white font-medium mb-2">{feature}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Technologies Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          <Code className="w-6 h-6 text-accent-500" />
          Technologies Used
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {project.technologies.map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 bg-dark-900 rounded-xl p-4 border border-dark-800"
            >
              <img
                src={`/tech-icons/${tech.icon}`}
                alt={tech.name}
                className="w-12 h-12 object-contain"
              />
              <span className="text-white text-sm">{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          <Layout className="w-6 h-6 text-accent-500" />
          Screenshots
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.screenshots.map((screenshot, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden border border-dark-800"
            >
              <img
                src={screenshot}
                alt={`Screenshot ${index + 1}`}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Installation Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          <Settings className="w-6 h-6 text-accent-500" />
          Installation
        </h2>
        <div className="bg-dark-900 rounded-xl p-6 border border-dark-800">
          <pre className="text-sm text-white overflow-x-auto">
            {project.installation.join('\n')}
          </pre>
        </div>
      </section>

      {/* Contribution Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-accent-500" />
          Contribution Guidelines
        </h2>
        <div className="bg-dark-900 rounded-xl p-6 border border-dark-800">
          <ol className="list-decimal list-inside text-white space-y-2">
            {project.contribution.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </section>

      {/* License Section */}
      <section className="text-center">
        <p className="text-dark-400">
          This project is licensed under the{' '}
          <a
            href="https://opensource.org/licenses/MIT"
            className="text-accent-500 hover:text-accent-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            MIT License
          </a>
        </p>
      </section>
    </div>
  );
};

export default ProjectPage;
