import { Button } from './ui';

const WorkspacePage = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button
        variant="primary"
        onClick={() => setIsCreateModalOpen(true)}
        leftIcon={<Plus className="w-4 h-4" />}
      >
        New Study
      </Button>

      <Button
        variant="secondary"
        onClick={() => navigate('/projects')}
      >
        Go to projects
      </Button>
    </div>
  );
};

export default WorkspacePage;
