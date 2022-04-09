import React from 'react';
import 'echarts-gl'
import ReactECharts from "echarts-for-react";
import {SimpleGraph3D} from "../graph";

const Chart = () => {
    let graph = SimpleGraph3D.generateFakeGraph();
    let chartInstance: any = null;

    let generateReferencePlane = (h: number) => {
        return {
            type: 'surface',
            itemStyle: {
                color: '#f5f5f5',
                opacity: 0.5
            },
            silent: true,
            equation: {
                x: {
                    step: 1,
                    min: 0,
                    max: 3,
                },
                y: {
                    step: 1,
                    min: 0,
                    max: 3,
                },
                z: function (x: number, y: number) {
                    return h
                }
            }
        }
    };

    let graph3DToSeries = (graph: SimpleGraph3D) => {
        let series: any[] = [];
        series.push({
            type: 'scatter3D',
            name: '调度任务',
            symbol: 'arrow',
            symbolOffset: [0, '-50%'],
            symbolSize: 15,
            dimensions: [
                "x", "y", "z", "color", "id", "desc"
            ],
            label: {
                show: true,
                formatter: function (params: any) {
                    return params.data[4]
                }
            },
            itemStyle: {
                normal: {
                    color: function (e: any) {
                        return e.data[3]
                    }
                }
            },
            encode: {
                x: 0,
                tooltip: [4, 5],
            },
            data: graph.nodes.map(node => {
                return [node.pos.x, node.pos.y, node.pos.z, node.data, node.id, `前置节点：${graph.getPredecessors(node).map(p => p.id).join(',')}`]
            })
        });
        console.log(series[0].data);

        for (let i = 0; i < graph.edges.length; i++) {
            let edge = graph.edges[i];
            let edgeSeries = {
                type: 'line3D',
                silent: true,
                data: [
                    [edge.source.pos.x, edge.source.pos.y, edge.source.pos.z],
                    [edge.target.pos.x, edge.target.pos.y, edge.target.pos.z]
                ],
                lineStyle: {
                    color: "#9f9f9f"

                }
            };
            series.push(edgeSeries);
        }

        return series;
    };

    let series = graph3DToSeries(graph);
    series.push(generateReferencePlane(0));
    let option: any = {
        tooltip: {},
        backgroundColor: '#fff',
        xAxis3D: {
            name: '',
            type: 'value',
            axisLine: {
                show: true,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            axisPointer: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        yAxis3D: {
            name: '',
            type: 'value',
            axisLine: {
                show: true,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            axisPointer: {
                show: false
            },
            splitLine: {
                show: false
            },
            splitArea: {
                show: false
            }
        },
        zAxis3D: {
            name: '↑ 时间（小时）',
            type: 'value',
            min: 0,
            max: 24,
            interval: 4,
            axisPointer: {
                show: true
            }
        },
        grid3D: {
            viewControl: {
                projection: 'orthographic',
                orthographicSize: 200,
                rotateSensitivity: 6,
            }
        },
        series: series
    }

    function onChartClick(param: any, echarts: any) {
        let series = graph3DToSeries(graph);
        series.push(generateReferencePlane(param.data[2]));
        chartInstance.setOption({
            series
        })
    }

    return (
        <div style={{height: '800px', width: '800px'}}>
            <ReactECharts
                option={option}
                style={{height: '800px'}}
                onEvents={{
                    'click': onChartClick,
                }}
                onChartReady={(chart) => {
                    chartInstance = chart;
                }}
            />
        </div>
    );
};

export default Chart;