'use client';
import { useState, useEffect } from 'react';
import { useTheme } from "@/app/hooks/useTheme";
import Header from "../dashboard/components/header";
import SideBar from "../dashboard/components/sideBar";
import { toast } from 'react-toastify';

export default function CategoryPage() {
  const { theme, toggleTheme } = useTheme();
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost/api/category/list');
        if (!response.ok) {
          toast.error("Erro ao carregar categorias.");
        }
        const data = await response.json();
        setCategories(data.categories.length !== 0 ? data.categories : []);
      } catch (error) {
        setError(error.message);
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
        setCategories((prev) => [...prev, createdCategory.category]);
        setNewCategory("");
        setIsModalOpen(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={`flex h-screen bg-gray-100 dark:bg-gray-900`}>
      <SideBar />
      <div className="flex-1 overflow-auto">
        <Header />
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Categorias
              </h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Nova Categoria
              </button>
            </div>
            {error && (
              <div className="mb-4 text-red-500">
                Erro: {error}
              </div>
            )}
            <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">
                    ID
                  </th>
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">
                    Nome
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.length !== 0 ? categories.map((category) => (
                  <tr
                    key={category.id}
                    className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900"
                  >
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                      {category.id}
                    </td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                      {category.name}
                    </td>
                  </tr>
                )) : <tr><td><h3>Sem dados</h3></td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-1/3">
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">
              Nova Categoria
            </h2>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Nome da categoria"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Salvando..." : "Adicionar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
