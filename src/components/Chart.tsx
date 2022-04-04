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
            dimensions: [
                "x", "y", "z", "color"
            ],
            itemStyle: {
                normal: {
                    color: function (e: any) {
                        return e.data[3]
                    }
                }
            },
            data: graph.nodes.map(node => {
                return [node.pos.x, node.pos.y, node.pos.z, node.data];
            })
        });

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
                    color: "#e36161"
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
            type: 'value',
            axisPointer: {
                show: false
            }
        },
        yAxis3D: {
            type: 'value',
            axisPointer: {
                show: false
            }
        },
        zAxis3D: {
            name: '时间（小时）',
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