export const ChartConfig = {
    NumberMinutes: 1440,
    DistanceMinutes: 60,
    ChartType: {
        Temp: 'Temp',
        Humi: 'Humi'
    }
}

export const LineChartConfig = {
    Temp: {
        title: 'report_chart_temp_title',
        toolTipTitle: 'report_chart_temp_tool_tip_title',
        xAxisName: 'report_chart_temp_x_axis_title',
        yAxisName: 'report_chart_temp_y_axis_title',  
        xAxisUnit: 'h',
        yAxisUnit: '\u00B0C',
        extraValueY: 10,
    },
    Humi: {
        title: 'report_chart_humi_title',
        toolTipTitle: 'report_chart_humi_tool_tip_title',
        xAxisName: 'report_chart_humi_x_axis_title',
        yAxisName: 'report_chart_humi_y_axis_title',       
        xAxisUnit: 'h',
        yAxisUnit: '%',
        extraValueY: 20,
    },
}

export const ToastId  = {
    CreatePlant: 'create-plant-id',
    ConfigPlant: 'config-plant-id',
    CreateStorage: 'create-storage-id',
    ConfigStorage: 'config-storage-id',
    Login: 'login-id'
}