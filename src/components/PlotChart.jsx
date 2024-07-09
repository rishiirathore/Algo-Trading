import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import fallbackData from '../../data.json'; 

const PlotlyChart = ({ plotData, result }) => {
  
  const ohlc = fallbackData.ohlc; // Use fallback data if props.data is undefined or empty
  
  const parsedPlotData = plotData ? JSON.parse(plotData) : null;

  useEffect(() => {
    // Any side effects based on `ohlc` can be handled here
  }, [ohlc]);

  const plotData2 = [
    {
      x: ohlc.map(data => data.time.slice(16,22)),
      close: ohlc.map(data => data.Close),
      decreasing: { line: { color: 'red' } },
      high: ohlc.map(data => data.High),
      increasing: { line: { color: 'green' } },
      low: ohlc.map(data => data.Low),
      open: ohlc.map(data => data.Open),
      type: 'candlestick',
      xaxis: 'x',
      yaxis: 'y',
    }
  ];

  const layout = {
    title: {
      text: result ? result.properties.symbolInfo : 'AAPL.NAS (2nd May 2023)',
      font: {
        size: 24,  // Increase the font size
        weight: 'bold',  // Make the title bold
      },
    },
    dragmode: 'zoom',
    showlegend: true,
    legend: {
      orientation: 'w',
      y: -0.15, // Move the legend below the plot area
    },
    xaxis: {
      title: 'Time',
      rangeslider: {
        visible: false,
      },
      gridcolor: '',    // grid line color
      zerolinecolor: '#444444', // zero line color
      // tickfont: {
      //   size: 13,  // Adjust x-axis label font size
      // }
    },
    yaxis: {
      title: 'Price',
      gridcolor: '#444444',    // grid line color
      zerolinecolor: '#444444' // zero line color
    },
    margin: {
      t: 40,  // Adjust top margin to position plot area below title
    },
    paper_bgcolor: '000000',  // background color
    plot_bgcolor: '000000',   // plot area background color
    font: {
      color: '#ffffff'         // text color
    },
  };

  const config = {
    displayModeBar: true,
    modeBarButtonsToRemove: ['toImage', 'toggleSpikelines'],
    displaylogo: false,
  };

  return (
    <Plot
      data={parsedPlotData ? parsedPlotData.data : plotData2}
      layout={layout}
      useResizeHandler
      style={{ width: '100%', height: '100%' }}
      config={parsedPlotData ? parsedPlotData.config : config}  
    />
  );  
};

export default PlotlyChart;
