'use client';

import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EventIcon from '@mui/icons-material/Event';

interface TaskCardProps {
  title: string;
  description: string;
  date: string;
  onDelete: () => void;
  onEdit: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, description, date, onDelete, onEdit }) => {
  return (
    <div className="bg-rose-200 rounded-md shadow-lg p-4 w-64 flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="bg-white pl-2 pr-2 rounded font-bold text-lg text-gray-900">{title}</h2>
        <div className="flex space-x-2">
          <IconButton size="small" sx={{ color: 'red' }} onClick={onDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="primary" onClick={onEdit}>
            <EditIcon fontSize="small" />
          </IconButton>
        </div>
      </div>

      {/* Description */}
      <p className="bg-white p-2 h-20 rounded text-gray-900 text-sm mb-4">{description}</p>

      {/* Footer */}
      <div className="flex items-center space-x-2">
        <EventIcon fontSize="small" className="text-gray-900" />
        <span className="text-gray-900 text-sm">Data</span>
        <span className="ml-auto text-gray-900 text-sm font-medium">{date}</span>
      </div>
    </div>
  );
};

export default TaskCard;
