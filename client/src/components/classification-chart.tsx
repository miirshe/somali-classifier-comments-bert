import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const ClassificationChart = ({ data }: { data: any }) => {
    // Convert the data object to an array suitable for the PieChart
    const chartData = Object.entries(data).map(([label, value], id) => ({
        id,
        value: parseFloat(value as any).toFixed(2),  // Ensure the value is a number
        label,
    }));

    return (
        <section className='text-black dark:text-white'>
            <PieChart
                series={[
                    {
                        arcLabel: (item) => `${item.value}`,
                        data: chartData,
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 2,
                        cornerRadius: 3,
                        startAngle: -90,
                        endAngle: 276,
                        cx: 148,
                        cy: 150,
                    },
                ]}
                width={500}
                height={350}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                        fill: 'white',
                        fontWeight: 'bold',
                    },
                }}
            />
        </section>
    );
};

export default ClassificationChart;
