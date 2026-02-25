/**
 * ApexCharts용 동적 어노테이션 생성 함수
 * @param {Array} categories - X축 카테고리 배열 (예: ['1월', '2월', ...])
 * @param {Array} dataValues - Y축 수치 데이터 배열 (예: [10.5, -5.2, ...])
 * @returns {Array} ApexCharts points annotations 설정 객체 배열
 */
const generateDynamicAnnotations = (categories, dataValues) => {
    return dataValues.map((val, index) => {
        // 1. 양수/음수 판별
        const isPositive = val > 0;
        const isNegative = val < 0;

        // 2. 조건에 따른 텍스트 색상 및 포맷 결정
        // 한국 금융 기준: 양수(빨강), 음수(파랑), 제로(검정)
        const textColor = isPositive ? '#FF3B30' : (isNegative ? '#007AFF' : '#333333');
        const formattedText = isPositive ? `+${val}%` : `${val}%`;

        // 3. 어노테이션 객체 구성 및 반환
        return {
            x: categories[index], // 해당 데이터의 X축 이름
            y: val,               // 해당 데이터의 Y축 값
            marker: { size: 0 },  // 기본 점(Marker)은 숨김 처리
            label: {
                borderColor: 'transparent',
                // 양수면 막대 위(Offset 음수), 음수면 막대 아래(Offset 양수)로 텍스트 위치 조정
                offsetY: isPositive ? -20 : 10, 
                style: {
                    color: textColor,
                    fontSize: '14px',
                    fontWeight: '700',
                    background: 'transparent'
                },
                text: formattedText
            }
        };
    });
};

// --- ApexCharts 옵션 적용 예시 ---
/*
const chartOptions = {
    series: [{ data: dataValues }],
    xaxis: { categories: categories },
    annotations: {
        points: generateDynamicAnnotations(categories, dataValues)
    },
    // ... 기타 설정
};
*/

