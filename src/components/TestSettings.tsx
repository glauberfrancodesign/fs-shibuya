import React from 'react';
import { Share2, Mail, Globe, Code } from 'lucide-react';
import { TestSettings } from '../types';

interface TestSettingsProps {
  settings: TestSettings;
  onUpdate: (settings: TestSettings) => void;
}

const TestSettings: React.FC<TestSettingsProps> = ({ settings, onUpdate }) => {
  const handleChange = (field: keyof TestSettings, value: any) => {
    onUpdate({ ...settings, [field]: value });
  };

  const handleShareOptionChange = (field: keyof TestSettings['shareOptions'], value: any) => {
    onUpdate({
      ...settings,
      shareOptions: {
        ...settings.shareOptions,
        [field]: value
      }
    });
  };

  return (
    <div className="bg-dark-900 rounded-xl border border-dark-800">
      <div className="p-6 border-b border-dark-800">
        <h2 className="text-lg font-medium text-white mb-6">Test Settings</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Target Number of Responses
            </label>
            <input
              type="number"
              value={settings.targetResponses}
              onChange={(e) => handleChange('targetResponses', parseInt(e.target.value))}
              className="input-field"
              min="1"
            />
            <p className="mt-1 text-sm text-dark-400">
              The test will automatically close when this number is reached
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white">Response Collection</h3>
                <p className="text-sm text-dark-400">Configure how responses are collected</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.allowAnonymousResponses}
                  onChange={(e) => handleChange('allowAnonymousResponses', e.target.checked)}
                  className="rounded border-dark-700 text-accent-500 focus:ring-accent-500"
                />
                <span className="text-sm text-white">Allow anonymous responses</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.requireEmail}
                  onChange={(e) => handleChange('requireEmail', e.target.checked)}
                  className="rounded border-dark-700 text-accent-500 focus:ring-accent-500"
                />
                <span className="text-sm text-white">Require email address</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white">Sharing Options</h3>
                <p className="text-sm text-dark-400">Configure how your test can be accessed</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.shareOptions.publicLink}
                  onChange={(e) => handleShareOptionChange('publicLink', e.target.checked)}
                  className="rounded border-dark-700 text-accent-500 focus:ring-accent-500"
                />
                <span className="text-sm text-white">Enable public link</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.shareOptions.embedCode}
                  onChange={(e) => handleShareOptionChange('embedCode', e.target.checked)}
                  className="rounded border-dark-700 text-accent-500 focus:ring-accent-500"
                />
                <span className="text-sm text-white">Allow embedding</span>
              </label>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Restrict to Domain (optional)
                </label>
                <input
                  type="text"
                  value={settings.shareOptions.restrictDomain || ''}
                  onChange={(e) => handleShareOptionChange('restrictDomain', e.target.value)}
                  className="input-field"
                  placeholder="example.com"
                />
                <p className="mt-1 text-sm text-dark-400">
                  Only allow responses from specific email domains
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-dark-800">
        <div className="space-y-4">
          <button className="w-full btn-glow flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg">
            <Share2 className="w-5 h-5" />
            Launch Test
          </button>

          <div className="grid grid-cols-3 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-dark-900 text-dark-400 hover:text-white rounded-lg hover:bg-dark-700">
              <Globe className="w-4 h-4" />
              Public Link
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-dark-900 text-dark-400 hover:text-white rounded-lg hover:bg-dark-700">
              <Mail className="w-4 h-4" />
              Email
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-dark-900 text-dark-400 hover:text-white rounded-lg hover:bg-dark-700">
              <Code className="w-4 h-4" />
              Embed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSettings;
