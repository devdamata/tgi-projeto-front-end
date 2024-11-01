'use client'
import { toast } from 'react-toastify'

export default function Home() {
  const showToast = () => {
    toast.success('Funcionou! 🎉')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <button 
        onClick={showToast}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Testar Toast
      </button>
    </main>
  )
}