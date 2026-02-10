/**
 * Series 데이터를 분석하여 동적으로 yaxis 설정 배열을 생성하는 함수
 * @param {Array} series - ApexCharts 시리즈 배열
 * @returns {Array} yaxis 설정 배열
 */
function generateDynamicYAxis(series) {
    let hasLeftAxisShown = false;  // 왼쪽 축 표시 여부 플래그
    let hasRightAxisShown = false; // 오른쪽 축 표시 여부 플래그

    return series.map((s, index) => {
        // 1. 증감률 데이터 (line 타입)인 경우 설정
        if (s.type === 'line') {
            const config = {
                seriesName: s.name,
                opposite: true, // 오른쪽 배치
                axisTicks: { show: true },
                axisBorder: { show: true },
                title: {
                    text: hasRightAxisShown ? undefined : "증감률 (%)",
                    style: { color: '#EF4444' }
                },
                labels: {
                    show: !hasRightAxisShown, // 이미 표시됐다면 라벨 숨김
                    formatter: (val) => val !== undefined ? val.toFixed(1) + "%" : val
                },
                show: !hasRightAxisShown // 첫 번째 증감률 시리즈의 축만 화면에 표시
            };
            hasRightAxisShown = true; // 이후 증감률 시리즈는 축 표시 생략
            return config;
        } 
        
        // 2. 매출액 데이터 (column 또는 기타)인 경우 설정
        else {
            const config = {
                seriesName: s.name,
                opposite: false, // 왼쪽 배치
                axisTicks: { show: true },
                axisBorder: { show: true },
                title: {
                    text: hasLeftAxisShown ? undefined : "매출액 (원)",
                    style: { color: '#4F46E5' }
                },
                labels: {
                    show: !hasLeftAxisShown,
                    formatter: (val) => val !== undefined ? val.toLocaleString() + "원" : val
                },
                show: !hasLeftAxisShown // 첫 번째 매출 시리즈의 축만 화면에 표시
            };
            hasLeftAxisShown = true;
            return config;
        }
    });
}

// 사용 예시
const mySeries = [
    { name: '매출 A', type: 'column', data: [100, 200, 300] },
    { name: '매출 B', type: 'column', data: [150, 250, 350] },
    { name: '매출 C', type: 'column', data: [120, 220, 320] },
    { name: '증감률 A', type: 'line', data: [5, 10, -2] },
    { name: '증감률 B', type: 'line', data: [3, 8, 1] },
    { name: '증감률 C', type: 'line', data: [1, 5, 4] }
];

var options = {
    series: mySeries,
    chart: {
        height: 450,
        type: 'line',
    },
    // 함수를 호출하여 yaxis 설정을 동적으로 할당
    yaxis: generateDynamicYAxis(mySeries),
    
    dataLabels: {
        enabled: true,
        // line 타입인 시리즈의 인덱스만 추출하여 라벨 표시
        enabledOnSeries: mySeries
            .map((s, idx) => s.type === 'line' ? idx : null)
            .filter(idx => idx !== null),
        formatter: (val) => val + "%"
    },
    // ... 나머지 설정
};

