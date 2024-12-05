'use client';

import { useState, useEffect } from 'react';
import { useTheme } from "@/app/hooks/useTheme";
import Header from "../dashboard/components/header";
import SideBar from "../dashboard/components/sideBar";
import { toast } from 'react-toastify';
import { Box, Grid, Card, Typography, Button, Modal, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import useApi from '@/app/components/useApi/UseApi'

export default function CategoryPage() {
  const { theme } = useTheme();
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {

        const response = await useApi.get('/category/list'); // O Axios adicionará o token automaticamente no header
        
    
        if (response.status !== 200) {
          throw new Error("Erro ao carregar categorias.");
        }
    
        const data = response.data;
        setCategories(data.categories.length !== 0 ? data.categories : []);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    fetchCategories();
  }, []);

  // Handle add new category
  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost/api/category', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newCategory }),
        });

        if (!response.ok) {
          throw new Error("Erro ao criar a categoria.");
        }

        const createdCategory = await response.json();
        //@ts-ignore
        setCategories((prev) => [...prev, createdCategory.category]);
        setNewCategory("");
        setIsModalOpen(false);
        toast.success("Categoria criada com sucesso!");
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Nome', flex: 1 },
    { field: 'criadoEm', headerName: 'Criado em', flex: 1}
  ];

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
                      Categorias
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setIsModalOpen(true)}
                      sx={{
                        backgroundColor: theme === 'dark' ? '#5c6bc0' : '#1a237e'
                      }}
                    >
                      Nova Categoria
                    </Button>
                  </Box>
                  {error && (
                    <Typography variant="body2" color="error">
                      {error}
                    </Typography>
                  )}
                  <Box sx={{ 
                        height: 400, 
                        mt: 2,
                        backgroundColor: theme === 'dark' ? '#263238' : '#fff',
                        borderColor: theme === 'dark' ? '#000' : '#e0e0e0',
                        color: theme === 'dark' ? '#fff' : '#333'  
                    }}>
                    <DataGrid
                      rows={categories}
                      columns={columns}
                      sx={{
                        backgroundColor: theme === 'dark' ? '#263238' : '#fff',
                        color: theme === 'dark' ? '#fff' : '#333',
                        borderColor: theme === 'dark' ? '#000' : '#e0e0e0',
                        '& .css-24bzw3-MuiDataGrid-root .MuiDataGrid-container--top [role=row], .css-24bzw3-MuiDataGrid-root .MuiDataGrid-container--bottom [role=row]': {
                          background: theme === 'dark' ? '#37474f' : '#f5f5f5',
                          color: theme === 'dark' ? '#ffffff' : '#333',
                        },
                        '& .MuiDataGrid-cell': {
                          color: theme === 'dark' ? '#ffffff' : '#333',
                        },
                        '& .MuiDataGrid-footerContainer': {
                          backgroundColor: theme === 'dark' ? '#37474f' : '#f5f5f5',
                        },
                      }}
                    />
                  </Box>
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
