import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TaskCard from './TaskCard';

const AccordionTasks = ({categories }: {categories: any[]}) => {

  const handleDelete = (id: any) => {
    alert("Tarefa excluída!");
  };

  const handleEdit = (id: any) => {
    alert("Editar tarefa!");
  };
  
  return (
    <div>
      {categories.map((category, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            {category.nameCategory}
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-wrap gap-4 p-4">
              {category.task.length > 0 ? (
                category.task.map((task: any) => (
                  <TaskCard
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    date={task.due_date}
                    priority={task.priority}
                    onDelete={() => handleDelete(task.id)}
                    onEdit={() => handleEdit(task.id)}
                  />
                ))
              ) : (
                <p>Não há tarefas para esta categoria.</p>
              )}
            </div>
          </AccordionDetails>

        </Accordion>
      ))}
    </div>
  );
}

export default AccordionTasks;