// 'use client';

// import React, { useEffect, useRef } from 'react';
// import * as echarts from 'echarts';
// import type { EChartsOption } from 'echarts';

// const GraphicPie: React.FC = () => {
//     const chartRef = useRef<HTMLDivElement>(null);
//     const chartInstance = useRef<echarts.ECharts | null>(null);

//     const monthNames = [
//         "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
//         "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
//       ];
      
//       const currentDate = new Date();
//       const currentMonthName = monthNames[currentDate.getMonth()];

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
//                     data: [
//                         { value: 1048, name: 'Trabalho' },
//                         { value: 735, name: 'Estudo Lógica' },
//                         { value: 580, name: 'Lazer' },
//                         { value: 484, name: 'Tarefas Domestícas' },
//                         { value: 300, name: 'Inglês' }
//                     ],
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

    const [chartData, setChartData] = useState<{ name: string, task_count: number }[]>([]);

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    
    const currentDate = new Date();
    const currentMonthName = monthNames[currentDate.getMonth()];

    useEffect(() => {
        // Função para buscar os dados do backend
        const fetchData = async () => {
            try {
                const response = await useApi.get('/count/tasks/for/category'); // Ajuste para sua rota de backend
                const data = response.data; // Supondo que a resposta seja um array de objetos { name, value }

                setChartData(data); // Atualiza os dados do gráfico
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();

        // Não inicializar se o elemento DOM não existir
        if (!chartRef.current) return;

        // Inicializar o gráfico
        chartInstance.current = echarts.init(chartRef.current);

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
            chartInstance.current?.setOption(option);
        };

        updateChart(); // Atualiza o gráfico com os dados obtidos

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
    }, [chartData, currentMonthName]); // Re-executa o efeito quando `chartData` mudar

    return <div ref={chartRef} style={{ width: '100%', height: '300px' }} />;
};

export default GraphicPie;
