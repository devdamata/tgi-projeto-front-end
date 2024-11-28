import { useState, useEffect } from 'react';

const Calendar = () => {
  // Função para formatar a data em português (ex: 23 Dezembro, quarta-feira)
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  };

  // Função para calcular as datas da semana atual
  const getWeekDates = (date: Date) => {
    const startOfWeek = date.getDate() - date.getDay(); // Ajusta para o domingo
    const weekDates = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(date.setDate(startOfWeek + i));
      weekDates.push(new Date(currentDate)); // Usar uma nova instância para evitar modificar a data original
    }

    return weekDates;
  };

  // Estado para armazenar o dia e a semana atual
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekDays] = useState(['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']);
  const [weekDates, setWeekDates] = useState<Date[]>([]);

  useEffect(() => {
    setWeekDates(getWeekDates(new Date())); // Atualiza as datas ao carregar o componente
  }, [currentDate]);

  const handleNextWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  };

  const handlePreviousWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  };

  return (
    <>
      {/* Exibindo a data atual no formato "23 Dezembro, quarta-feira" */}
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        {formatDate(currentDate)}
      </h2>

      {/* Botões para navegar entre as semanas */}
      <div className="flex justify-between mb-4">
        <button onClick={handlePreviousWeek} className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-2 py-1 rounded-md">
          Semana Anterior
        </button>
        <button onClick={handleNextWeek} className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-2 py-1 rounded-md">
          Próxima Semana
        </button>
      </div>

      {/* Grid de dias da semana */}
      <div className="grid grid-cols-7 gap-4">
        {weekDates.map((date, i) => (
          <div key={i} className="text-center">
            {/* Nome do dia da semana */}
            <div className="text-gray-500 dark:text-gray-400 mb-2">{weekDays[i]}</div>

            {/* Exibindo o número do dia */}
            <div
              className={`rounded-full w-8 h-8 mx-auto flex items-center justify-center ${
                date.getDate() === new Date().getDate() ? 'bg-blue-500 dark:bg-blue-600 text-white' : ''
              }`}
            >
              {date.getDate()}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Calendar;
