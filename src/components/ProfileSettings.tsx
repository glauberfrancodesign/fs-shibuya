import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Camera } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    job_role: user?.job_role || '',
    company_size: user?.company_size || '10-50',
    old_password: '',
    new_password: '',
    confirm_password: ''
  });

  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        full_name: user.full_name || '',
        email: user.email || '',
        job_role: user.job_role || '',
        company_size: user.company_size || '10-50'
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await updateProfile({
        full_name: formData.full_name,
        job_role: formData.job_role,
        company_size: formData.company_size
      });
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.new_password !== formData.confirm_password) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // Password update logic here
      // For now, we'll just show a message
      alert('Password update functionality will be implemented soon');
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
      console.error('Error updating password:', err);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="page-header">
        <div className="px-6 py-4">
          <div className="flex items-center text-dark-400 text-sm mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-1 -ml-1 mr-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span>Settings</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white">Personal settings</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white mb-2">Personal settings</h1>
              <p className="text-dark-400">Update your personal details</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-64 border-r border-dark-800 bg-dark-900">
          <div className="p-6">
            <nav className="space-y-1">
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 text-white bg-dark-800 rounded-lg"
              >
                <span className="w-5 h-5">👤</span>
                My account
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg"
              >
                <span className="w-5 h-5">✉️</span>
                Email preferences
              </a>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-2xl">
            <div className="bg-dark-900 rounded-xl border border-dark-800 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-white mb-6">About you</h2>

                {error && (
                  <div className="mb-6 px-4 py-3 bg-red-500/10 text-red-500 rounded-lg">
                    {error}
                  </div>
                )}

                <div className="flex items-center gap-6 mb-8">
                  {user?.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt={formData.full_name}
                      className="w-20 h-20 rounded-full"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-dark-800 flex items-center justify-center">
                      <span className="text-2xl font-medium text-dark-400">
                        {getInitials(formData.full_name)}
                      </span>
                    </div>
                  )}
                  <button className="flex items-center gap-2 px-4 py-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800">
                    <Camera className="w-4 h-4" />
                    Change avatar
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        First name
                      </label>
                      <input
                        type="text"
                        value={formData.full_name.split(' ')[0]}
                        onChange={(e) => setFormData({
                          ...formData,
                          full_name: `${e.target.value} ${formData.full_name.split(' ').slice(1).join(' ')}`
                        })}
                        className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Last name
                      </label>
                      <input
                        type="text"
                        value={formData.full_name.split(' ').slice(1).join(' ')}
                        onChange={(e) => setFormData({
                          ...formData,
                          full_name: `${formData.full_name.split(' ')[0]} ${e.target.value}`
                        })}
                        className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-dark-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Job role
                    </label>
                    <input
                      type="text"
                      value={formData.job_role}
                      onChange={(e) => setFormData({ ...formData, job_role: e.target.value })}
                      className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
                      placeholder="e.g. UX Researcher"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Company size
                    </label>
                    <select
                      value={formData.company_size}
                      onChange={(e) => setFormData({ ...formData, company_size: e.target.value })}
                      className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                    >
                      <option value="1-10">1-10 employees</option>
                      <option value="10-50">10-50 employees</option>
                      <option value="50-200">50-200 employees</option>
                      <option value="200+">200+ employees</option>
                    </select>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-glow px-4 py-2 text-white rounded-lg disabled:opacity-50"
                    >
                      {loading ? 'Updating...' : 'Update my information'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="mt-6 bg-dark-900 rounded-xl border border-dark-800 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-white mb-6">Change your password</h2>

                <form onSubmit={handlePasswordUpdate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Old password
                    </label>
                    <input
                      type="password"
                      value={formData.old_password}
                      onChange={(e) => setFormData({ ...formData, old_password: e.target.value })}
                      className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      New password
                    </label>
                    <input
                      type="password"
                      value={formData.new_password}
                      onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
                      className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Confirm new password
                    </label>
                    <input
                      type="password"
                      value={formData.confirm_password}
                      onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                      className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-glow px-4 py-2 text-white rounded-lg disabled:opacity-50"
                    >
                      {loading ? 'Updating...' : 'Update my password'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
