export class StadisticsBalance {
    static optionsAmount: { [key: string]: any } = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: '#ffffff'
                },
                title: {
                    display: true,
                    text: 'Amounts',
                    color: '#4ade80',
                    font: {
                        size: 20
                    }
                }
            }
        }
    };

    static optionsExpenses: { [key: string]: any } = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: '#ffffff'
                },
                title: {
                    display: true,
                    text: 'Expenses',
                    color: '#fb923c',
                    font: {
                        size: 20
                    }
                }
            }
        }
    };

    static optionsWeek: { [key: string]: any } = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: '#ffffff'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'white'
                },
                grid: {
                    color: '#FFFFFF',
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: '#4ade80'
                },
                grid: {
                    color: '#BBBBBB',
                    drawBorder: false
                }
            }
        }
    };

    static labelDays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
}