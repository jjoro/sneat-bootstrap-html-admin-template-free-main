ApexCharts의 title/subtitle은 SVG `<text>` 요소로 렌더링되어 CSS만으로는 한계가 있습니다. CSS + JS 조합으로 완전히 해결합니다.

```javascript
/**
 * ApexCharts title/subtitle 텍스트 잘림 방지
 * SVG text 요소를 foreignObject(HTML)로 교체하여 완전한 줄바꿈 지원
 *
 * @param {string} chartSelector - 차트 컨테이너 CSS 선택자
 * @param {Object} [options={}]
 * @param {number} [options.paddingX=16] - 좌우 패딩
 * @param {number} [options.lineHeight=1.4] - 줄간격
 */
function fixApexChartsTitleClipping(chartSelector, {
  paddingX = 16,
  lineHeight = 1.4,
} = {}) {

  const container = document.querySelector(chartSelector);
  if (!container) return;

  const svg = container.querySelector('svg');
  if (!svg) return;

  const svgWidth = svg.getBoundingClientRect().width || svg.viewBox?.baseVal?.width || 600;

  // title / subtitle SVG text 요소 탐색
  const titleEls = svg.querySelectorAll('.apexcharts-title-text, .apexcharts-subtitle-text');

  titleEls.forEach((textEl) => {
    const text = textEl.textContent.trim();
    if (!text) return;

    const fontSize = window.getComputedStyle(textEl).fontSize || '14px';
    const fontWeight = window.getComputedStyle(textEl).fontWeight || 'normal';
    const fill = textEl.getAttribute('fill') || '#000';
    const y = parseFloat(textEl.getAttribute('y') || 0);
    const isTitle = textEl.classList.contains('apexcharts-title-text');

    // foreignObject로 교체 (HTML div → 자동 줄바꿈)
    const fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    fo.setAttribute('x', paddingX);
    fo.setAttribute('y', Math.max(0, y - parseFloat(fontSize)));
    fo.setAttribute('width', svgWidth - paddingX * 2);
    fo.setAttribute('height', '200'); // 충분한 높이 확보
    fo.classList.add(isTitle ? 'apexcharts-title-fo' : 'apexcharts-subtitle-fo');

    const div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    div.textContent = text;
    Object.assign(div.style, {
      fontSize,
      fontWeight,
      color: fill,
      lineHeight,
      wordBreak: 'break-word',
      whiteSpace: 'normal',
      overflow: 'visible',
      width: '100%',
      textAlign: 'center',
    });

    fo.appendChild(div);
    textEl.parentNode.replaceChild(fo, textEl);
  });
}
```

**CSS (잘림 방지 기본 세팅):**

```css
/* SVG overflow 허용 */
.apexcharts-canvas svg {
  overflow: visible !important;
}

/* title/subtitle 영역 클리핑 해제 */
.apexcharts-title-text,
.apexcharts-subtitle-text {
  overflow: visible !important;
  clip-path: none !important;
  text-overflow: clip !important;
  white-space: normal !important;
}

/* foreignObject로 교체된 요소 */
.apexcharts-title-fo,
.apexcharts-subtitle-fo {
  overflow: visible !important;
}

.apexcharts-title-fo div,
.apexcharts-subtitle-fo div {
  word-break: break-word;
  white-space: normal;
  overflow: visible;
}
```

**적용 예시:**

```javascript
const options = {
  chart: {
    type: 'bar',
    height: 400,
    events: {
      // ✅ 렌더링 완료 후 즉시 적용
      rendered() {
        fixApexChartsTitleClipping('#chart');
      },
      // ✅ 데이터 업데이트 후에도 재적용
      updated() {
        fixApexChartsTitleClipping('#chart');
      },
    },
  },
  title: {
    text: '매우 길어서 잘릴 수 있는 타이틀 텍스트입니다 - 2024년도 월별 전체 판매 실적 현황',
    align: 'center',
  },
  subtitle: {
    text: '서브타이틀도 길어지면 잘리는 문제가 발생합니다 - 본 데이터는 내부 집계 기준입니다',
    align: 'center',
  },
  // ✅ 상단 여백 확보 (멀티라인 대비)
  chart: {
    height: 400,
    sparkline: { enabled: false },
  },
  grid: {
    padding: { top: 30 },
  },
  series: [{ name: '매출', data: [100, 200, 150] }],
  xaxis: { categories: ['1월', '2월', '3월'] },
};

const chart = new ApexCharts(document.querySelector('#chart'), options);
chart.render();
```

**동작 원리 요약:**

| 단계 | 처리 내용 |
|---|---|
| ① CSS | SVG `overflow: visible`로 클리핑 해제 |
| ② JS 탐색 | `.apexcharts-title-text` SVG text 요소 탐색 |
| ③ 교체 | SVG `<text>` → `<foreignObject><div>` 로 교체 |
| ④ 스타일 | `word-break: break-word`로 자동 줄바꿈 적용 |
| ⑤ 재적용 | `rendered` / `updated` 이벤트마다 재실행 |

`grid.padding.top` 값을 늘리면 멀티라인 title이 차트 본문과 겹치는 것도 방지할 수 있습니다!
