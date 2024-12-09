'use client';

import { useState, useEffect } from 'react';
import { useTheme } from "@/app/hooks/useTheme";
import Header from "../dashboard/components/header";
import SideBar from "../dashboard/components/sideBar";
import { toast } from 'react-toastify';
import { Box, Grid, Card, Typography, Button, Modal, TextField, CircularProgress } from '@mui/material';
// import * as React from 'react';
import AccordionTasks from './components/AccordionTasks';
import useApi from '@/app/components/useApi/UseApi';

export default function TaskPage() {
  const { theme } = useTheme();
  const [tasksData, setTasksData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from API
  useEffect(() => {
    const tasksList = async () => {
      try {
        const response = await useApi.get('/task/list');

        if (response.status !== 200) {
          throw new Error("Erro ao carregar categorias.");
        }
        const data = await response.data.category;
        console.log(data)
        setTasksData(data.length !== 0 ? data : []);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw error
      }
    };

    tasksList();
  }, []);
  
  // Handle add new category
  const handleAddCategory = async () => {
    // if (newCategory.trim()) {
    //   setIsLoading(true);
    //   try {
    //     const response = await fetch('http://localhost/api/category', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ name: newCategory }),
    //     });

    //     if (!response.ok) {
    //       throw new Error("Erro ao criar a categoria.");
    //     }

    //     const createdCategory = await response.json();
    //     //@ts-ignore
    //     setCategories((prev) => [...prev, createdCategory.category]);
    //     setNewCategory("");
    //     setIsModalOpen(false);
    //     toast.success("Categoria criada com sucesso!");
    //   } catch (error) {
    //     throw error;
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
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
                Nova Categoria
              </Typography>
              <TextField
                fullWidth
                label="Nome da categoria"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                variant="outlined"
                margin="dense"
              />
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
                  onClick={handleAddCategory}
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
