$(document).ready(function () {
    let data;
    const lineGraph = document.getElementById('lineGraph');
    const countryFilter = document.getElementById('countryFilter');

    // Parse CSV
    Papa.parse('Life_Expectancy_with_GNP.csv', {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            console.log(results.data); // Log the parsed data for debugging
            data = results.data;

            // Populate the dropdown with unique countries
            const uniqueCountries = [...new Set(data.map(d => d["Country Name"]))];
            uniqueCountries.forEach(country => {
                const option = document.createElement('option');
                option.value = country;
                option.textContent = country;
                countryFilter.appendChild(option);
            });

            // Default to the first country
            plotLineGraph(uniqueCountries[0]);
        },
    });

    // Function to filter and plot line data
    function plotLineGraph(country) {
        const filteredData = data.filter(d => d["Country Name"] === country);

        const trace = {
            x: filteredData.map(d => d.Year),  // X-axis: Year
            y: filteredData.map(d => d.GNP),  // Y-axis: GNP
            mode: 'lines+markers',
            type: 'scatter',
            line: {
                color: '#ba8b92',  // Line color
                width: 2,         // Line width
            },
            marker: {
                size: 6,
                color: '#654247', // Marker color
            },
            text: filteredData.map(d =>
                `Year: ${d.Year}<br>GNP: $${d.GNP}` // Tooltip content
            ),
            hoverinfo: 'text',
        };

        const layout = {
    title: {
        text: `GNP Per Capita Over Time: ${country}`,
        font: {
            family: 'Times New Roman',
            size: 24,  // Font size for the title
            color: '#4B4B4B',
        },
    },
    xaxis: {
        title: {
            text: 'Year',
            font: {
                family: 'Times New Roman',
                size: 18,  // Font size for X-axis title
                color: '#4B4B4B',
            },
        },
        tickfont: {
            family: 'Times New Roman',
            size: 14,  // Font size for X-axis ticks
            color: '#4B4B4B',
        },
    },
    yaxis: {
        title: {
            text: 'GNP Per Capita (USD)',
            font: {
                family: 'Times New Roman',
                size: 18,  // Font size for Y-axis title
                color: '#4B4B4B',
            },
        },
        tickfont: {
            family: 'Times New Roman',
            size: 14,  // Font size for Y-axis ticks
            color: '#4B4B4B',
        },
    },
    hoverlabel: {
        font: {
            family: 'Times New Roman',
            size: 12,  // Tooltip font size
            color: '#000000',
        },
        bgcolor: '#ffffff',  // Tooltip background color
        bordercolor: '#cccccc',
    },
    height: 450,  // Graph height
    width: 900,   // Graph width
};


        Plotly.newPlot(lineGraph, [trace], layout);
    }

    // Event listener for country filter dropdown
    countryFilter.addEventListener('change', function () {
        plotLineGraph(this.value);
    });
});
