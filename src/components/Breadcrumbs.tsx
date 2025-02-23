import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const location = useLocation();
  
  return (
    <nav className="flex items-center text-sm text-dark-400">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.path && index < items.length - 1 ? (
            <Link
              to={item.path}
              className="hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <ChevronRight className="w-4 h-4 mx-2" />
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
