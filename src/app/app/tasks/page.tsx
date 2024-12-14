'use client';

import { useState, useEffect } from 'react';
import { useTheme } from "@/app/hooks/useTheme";
import Header from "../dashboard/components/header";
import SideBar from "../dashboard/components/sideBar";
import { toast } from 'react-toastify';
import { Box, Grid, Card, Typography, Button, Modal, TextField, CircularProgress, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import AccordionTasks from './components/AccordionTasks';
import useApi from '@/app/components/useApi/UseApi';

export default function TaskPage() {
  const { theme } = useTheme();
  const [tasksData, setTasksData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from API
  useEffect(() => {
    const categoryList = async () => {
      try {
        const response = await useApi.get('/category/list');

        if (response.status !== 200) {
          throw new Error("Erro ao carregar categorias.");
        }
        const data = response.data.categories; // Use 'categories' in the response
        setTasksData(data.length !== 0 ? data : []);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Erro ao carregar categorias.");
      }
    };

    categoryList();
  }, []);

  // Handle add new task
  const handleAddTask = async () => {
    if (newTaskTitle.trim() && newTaskDescription.trim() && selectedCategory) {
      setIsLoading(true);
      try {
        const response = await useApi.post('/task/create', {
          title: newTaskTitle,
          description: newTaskDescription,
          category_id: selectedCategory,
        });

        if (response.status !== 200) {
          throw new Error("Erro ao criar a tarefa.");
        }

        toast.success("Tarefa criada com sucesso!");
        setIsModalOpen(false);
        // Reset form fields
        setNewTaskTitle("");
        setNewTaskDescription("");
        setSelectedCategory("");
      } catch (error) {
        toast.error("Erro ao criar a tarefa.");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Por favor, preencha todos os campos.");
    }
  };

  return (
    <>
      {/* Conteúdo da página */}
      <div className={`flex h-screen bg-gray-100 dark:bg-gray-900`}>
        <SideBar />
        <div className="flex-1 overflow-auto">
          <Header />
          <Box p={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card 
                  sx={{
                    padding: 2,
                    backgroundColor: theme === 'dark' ? '#263238' : '#fff',
                    borderColor: theme === 'dark' ? '#37474f' : '#e0e0e0',
                    color: theme === 'dark' ? '#fff' : '#333'
                  }}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}
                    sx={{
                      backgroundColor: theme === 'dark' ? '#263238' : '#fff',
                      borderColor: theme === 'dark' ? '#37474f' : '#e0e0e0',
                    }}
                  >
                    <Typography variant="h5" component="h1">
                      Tarefas
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setIsModalOpen(true)}
                      sx={{
                        backgroundColor: theme === 'dark' ? '#5c6bc0' : '#1a237e'
                      }}
                    >
                      Nova Tarefa
                    </Button>
                  </Box>
                  {error && (
                    <Typography variant="body2" color="error">
                      {error}
                    </Typography>
                  )}
                  {isLoading && (
                    <div className="flex items-center justify-center min-h-screen">
                      <CircularProgress /> {/* Loader enquanto os dados carregam */}
                    </div>
                  )}
                  {!isLoading && (
                    <AccordionTasks categories={tasksData} />
                  )}
                </Card>
              </Grid>
            </Grid>
          </Box>
          {/* Modal */}
          <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: theme === 'dark' ? '#263238' : '#fff',
                boxShadow: 24,
                borderRadius: 2,
                p: 4,
                width: 400,
              }}
            >
              <Typography id="modal-title" variant="h6" mb={2} sx={{color: theme === 'dark' ? '#fff' : '#333'}}>
                Nova Tarefa
              </Typography>
              <TextField
                fullWidth
                label="Título da Tarefa"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                variant="outlined"
                margin="dense"
              />
              <TextField
                fullWidth
                label="Descrição"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                variant="outlined"
                margin="dense"
                multiline
                rows={4}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel id="category-select-label">Categoria</InputLabel>
                <Select
                  labelId="category-select-label"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Categoria"
                >
                  {tasksData.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                  onClick={() => setIsModalOpen(false)}
                  variant="outlined"
                  color="secondary"
                  sx={{ mr: 1 }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleAddTask}
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Salvando..." : "Adicionar"}
                </Button>
              </Box>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
}
