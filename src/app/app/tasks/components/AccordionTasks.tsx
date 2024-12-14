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
            {category.task.length > 0 ? (
              category.task.map((task: any) => (
                <TaskCard
                  key={task.id}
                  title={task.title}
                  description={task.description}
                  date={task.due_date}
                  onDelete={() => handleDelete(task.id)}
                  onEdit={() => handleEdit(task.id)}
                />
              ))
            ) : (
              <p>Não há tarefas para esta categoria.</p>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default AccordionTasks;