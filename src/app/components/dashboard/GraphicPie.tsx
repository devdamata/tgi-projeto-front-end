// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import * as echarts from 'echarts';
// import type { EChartsOption } from 'echarts';

// const GraphicPie: React.FC = () => {
//     const chartRef = useRef<HTMLDivElement>(null);
//     const chartInstance = useRef<echarts.ECharts | null>(null);

//     const [chartData, setChartData] = useState<{ name: string, value: number }[]>([]);

//     const monthNames = [
//         "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
//         "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
//       ];
      
//       const currentDate = new Date();
//       const currentMonthName = monthNames[currentDate.getMonth()];

//       const fetchData = async () => {
//             try {
//                 const response = await use.get('/count/tasks/for/category'); // Ajuste para sua rota de backend
//                 const data = response.data; // Supondo que a resposta seja um array de objetos { name, value }
    
//                 setChartData(data); // Atualiza os dados do gráfico
//                 setIsDataLoaded(true); // Marca os dados como carregados
//             } catch (error) {
//                 console.error('Erro ao buscar dados:', error);
//             }
//         };

//     useEffect(() => {
//         // Não inicializar se o elemento DOM não existir
//         if (!chartRef.current) return;

//         // Inicializar o gráfico
//         chartInstance.current = echarts.init(chartRef.current);

//         const option: EChartsOption = {
//             title: {
//                 text: 'Relação de tarefas por categoria',
//                 subtext: currentMonthName,
//                 left: 'center'
//             },
//             tooltip: {
//                 trigger: 'item'
//             },
//             legend: {
//                 orient: 'vertical',
//                 left: 'left'
//             },
//             series: [
//                 {
//                     name: 'Quantidade de tarefas por categoria',
//                     type: 'pie',
//                     radius: '50%',
//                     data: 
//                     // data: [
//                     //     { value: 1048, name: 'Trabalho' },
//                     //     { value: 735, name: 'Estudo Lógica' },
//                     //     { value: 580, name: 'Lazer' },
//                     //     { value: 484, name: 'Tarefas Domestícas' },
//                     //     { value: 300, name: 'Inglês' }
//                     // ],
//                     emphasis: {
//                         itemStyle: {
//                             shadowBlur: 10,
//                             shadowOffsetX: 0,
//                             shadowColor: 'rgba(0, 0, 0, 0.5)'
//                         }
//                     }
//                 }
//             ]
//         };

//         // Configurar o gráfico
//         // @ts-ignore
//         chartInstance.current.setOption(option);

//         // Função para redimensionar o gráfico
//         const handleResize = () => {
//             chartInstance.current?.resize();
//         };

//         // Adicionar listener de redimensionamento
//         window.addEventListener('resize', handleResize);

//         // Cleanup
//         return () => {
//             window.removeEventListener('resize', handleResize);
//             chartInstance.current?.dispose();
//         };
//     }, []);

//     return <div ref={chartRef} style={{ width: '100%', height: '300px' }} />;
// };

// export default GraphicPie;


'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import axios from 'axios'; // Se você preferir usar axios
import useApi from '../useApi/UseApi';

const GraphicPie: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<echarts.ECharts | null>(null);

    const [chartData, setChartData] = useState<{ name: string, value: number }[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false); // Adiciona estado para controlar o carregamento de dados

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    
    const currentDate = new Date();
    const currentMonthName = monthNames[currentDate.getMonth()];

    // Função para buscar os dados do backend
    const fetchData = async () => {
        try {
            const response = await axios.get('https://damatatechnology.com.br/api/count/tasks/for/category'); // Ajuste para sua rota de backend
            const data = response.data; // Supondo que a resposta seja um array de objetos { name, value }

            setChartData(data); // Atualiza os dados do gráfico
            setIsDataLoaded(true); // Marca os dados como carregados
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    useEffect(() => {
        // Chama a função de carregar os dados apenas uma vez quando o componente for montado
        fetchData();

        // Não inicializar se o elemento DOM não existir
        if (!chartRef.current) return;

        // Inicializar o gráfico
        chartInstance.current = echarts.init(chartRef.current);

        // Função para redimensionar o gráfico
        const handleResize = () => {
            chartInstance.current?.resize();
        };

        // Adicionar listener de redimensionamento
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            chartInstance.current?.dispose();
        };
    }, []); // Efeito de carregamento dos dados que será executado apenas uma vez

    useEffect(() => {
        if (!isDataLoaded) return; // Evita renderização do gráfico antes de carregar os dados

        // Função para atualizar o gráfico com os dados
        const updateChart = () => {
            const option: EChartsOption = {
                title: {
                    text: 'Relação de tarefas por categoria',
                    subtext: currentMonthName,
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: 'Categorias de Tarefas',
                        type: 'pie',
                        radius: '50%',
                        data: chartData, // Usando os dados recebidos
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

            // Configurar o gráfico
            //@ts-ignore
            chartInstance.current?.setOption(option);
        };

        updateChart(); // Atualiza o gráfico com os dados obtidos
    }, [chartData, currentMonthName, isDataLoaded]); // Só executa quando os dados são carregados

    return <div ref={chartRef} style={{ width: '100%', height: '300px' }} />;
};

export default GraphicPie;

