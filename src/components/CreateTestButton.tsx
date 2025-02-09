import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import CreateTestModal from './CreateTestModal';

const CreateTestButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        <Plus className="w-5 h-5" />
        Create New Test
      </button>

      {isModalOpen && <CreateTestModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default CreateTestButton;