'use client';

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

const GraphicPie: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<echarts.ECharts | null>(null);

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
      ];
      
      const currentDate = new Date();
      const currentMonthName = monthNames[currentDate.getMonth()];

    useEffect(() => {
        // Não inicializar se o elemento DOM não existir
        if (!chartRef.current) return;

        // Inicializar o gráfico
        chartInstance.current = echarts.init(chartRef.current);

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
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1048, name: 'Trabalho' },
                        { value: 735, name: 'Estudo Lógica' },
                        { value: 580, name: 'Lazer' },
                        { value: 484, name: 'Tarefas Domestícas' },
                        { value: 300, name: 'Inglês' }
                    ],
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
        // @ts-ignore
        chartInstance.current.setOption(option);

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
    }, []);

    return <div ref={chartRef} style={{ width: '100%', height: '300px' }} />;
};

export default GraphicPie;