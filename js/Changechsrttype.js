<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ApexCharts Dynamic Type Switcher</title>
    <!-- Tailwind CSS for Styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- ApexCharts CDN -->
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <style>
        body {
            font-family: 'Noto Sans KR', sans-serif;
            background-color: #f3f4f6;
        }
        .chart-container {
            min-height: 400px;
        }
    </style>
</head>
<body class="flex items-center justify-center min-h-screen p-4">

    <div class="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Header -->
        <div class="bg-indigo-600 p-6">
            <h1 class="text-2xl font-bold text-white text-center">📊 차트 타입 동적 변경 예제</h1>
            <p class="text-indigo-200 text-center mt-2 text-sm">동일한 데이터로 차트 타입을 변경하며 다시 그립니다.</p>
        </div>

        <!-- Controls -->
        <div class="p-6 bg-gray-50 border-b border-gray-200">
            <div class="flex flex-wrap justify-center gap-4" id="button-container">
                <!-- Buttons will be injected here by JS -->
            </div>
        </div>

        <!-- Chart Area -->
        <div class="p-6">
            <div id="chart" class="chart-container w-full"></div>
        </div>
    </div>

    <script>
        /**
         * 1. Data Definition (Immutable Data Source)
         * 모든 차트가 공유할 기본 데이터입니다.
         */
        const CHART_DATA = {
            categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월'],
            seriesData: [30, 40, 35, 50, 49, 60, 70, 91, 125],
            seriesName: '월별 수익'
        };

        const CHART_TYPES = ['bar', 'line', 'area', 'donut'];

        /**
         * 2. Functional Core (Pure Functions)
         * 차트 옵션을 생성하는 순수 함수입니다.
         * 입력값(type, data)에 따라 출력값(options)이 결정됩니다.
         */
        const createChartOptions = (type, data) => {
            // 원형 차트(도넛, 파이)와 XY축 차트(바, 라인)는 데이터 구조가 다릅니다.
            const isCircular = type === 'donut' || type === 'pie';

            const baseOptions = {
                chart: {
                    type: type,
                    height: 380,
                    toolbar: { show: true },
                    animations: {
                        enabled: true,
                        easing: 'easeinout',
                        speed: 800
                    }
                },
                colors: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
                title: {
                    text: `${type.toUpperCase()} 차트 분석`,
                    align: 'left',
                    style: { fontSize: '16px', color: '#666' }
                }
            };

            // 차트 타입에 따른 데이터 구조 변환 (Data Transformation)
            if (isCircular) {
                return {
                    ...baseOptions,
                    series: data.seriesData,
                    labels: data.categories,
                    plotOptions: {
                        pie: {
                            donut: {
                                labels: { show: true, total: { show: true, label: '총계' } }
                            }
                        }
                    }
                };
            } else {
                return {
                    ...baseOptions,
                    series: [{
                        name: data.seriesName,
                        data: data.seriesData
                    }],
                    xaxis: {
                        categories: data.categories
                    },
                    stroke: {
                        curve: 'smooth',
                        width: type === 'area' || type === 'line' ? 3 : 0
                    },
                    fill: {
                        type: type === 'area' ? 'gradient' : 'solid',
                        gradient: {
                            shadeIntensity: 1,
                            opacityFrom: 0.7,
                            opacityTo: 0.9,
                            stops: [0, 90, 100]
                        }
                    },
                    plotOptions: {
                        bar: { borderRadius: 4, columnWidth: '50%' }
                    }
                };
            }
        };

        /**
         * 3. DOM & State Management (Impure / Side Effects)
         * 실제 차트를 그리고 버튼 이벤트를 관리하는 로직입니다.
         */
        const App = (() => {
            let chartInstance = null; // Closure state to track the chart instance

            // 차트 렌더링 함수
            const renderChart = (type) => {
                const chartElement = document.querySelector("#chart");
                
                // 기존 차트가 있다면 삭제 (Destroy)
                if (chartInstance) {
                    chartInstance.destroy();
                    chartInstance = null;
                }

                // 새로운 옵션 생성 및 차트 렌더링
                const options = createChartOptions(type, CHART_DATA);
                chartInstance = new ApexCharts(chartElement, options);
                chartInstance.render();

                // 버튼 활성화 상태 업데이트 (UI Update)
                updateButtonStyles(type);
            };

            // 버튼 UI 생성 함수
            const createButtons = () => {
                const container = document.getElementById('button-container');
                
                CHART_TYPES.forEach(type => {
                    const btn = document.createElement('button');
                    btn.textContent = type.charAt(0).toUpperCase() + type.slice(1);
                    btn.dataset.type = type;
                    btn.className = `
                        px-6 py-2 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                        border border-gray-300 bg-white text-gray-700 hover:bg-gray-50
                    `;
                    
                    btn.onclick = () => renderChart(type);
                    container.appendChild(btn);
                });
            };

            // 활성 버튼 스타일 업데이트 함수
            const updateButtonStyles = (activeType) => {
                const buttons = document.querySelectorAll('#button-container button');
                buttons.forEach(btn => {
                    if (btn.dataset.type === activeType) {
                        // Active Style
                        btn.className = `
                            px-6 py-2 rounded-full font-semibold transition-all duration-200 transform scale-105 shadow-md
                            bg-indigo-600 text-white border-transparent
                        `;
                    } else {
                        // Inactive Style
                        btn.className = `
                            px-6 py-2 rounded-full font-semibold transition-all duration-200 hover:bg-gray-100
                            bg-white text-gray-600 border border-gray-200
                        `;
                    }
                });
            };

            // 초기화
            const init = () => {
                createButtons();
                renderChart('bar'); // 기본 차트 설정
            };

            return { init };
        })();

        // 애플리케이션 실행
        document.addEventListener('DOMContentLoaded', App.init);

    </script>
</body>
</html>

