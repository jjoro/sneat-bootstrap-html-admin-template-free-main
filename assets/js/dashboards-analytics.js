
/**
 * Dashboard Analytics
 */

'use strict';

document.addEventListener('DOMContentLoaded', function (e) {
  // 색상 및 폰트 변수 설정
  let cardColor, headingColor, legendColor, labelColor, shadeColor, borderColor, fontFamily;
  cardColor = config.colors.cardColor;
  headingColor = config.colors.headingColor;
  legendColor = config.colors.bodyColor;
  labelColor = config.colors.textMuted;
  borderColor = config.colors.borderColor;
  fontFamily = config.fontFamily;

  // Order Area Chart (주문 영역 차트)
  // --------------------------------------------------------------------
  const orderAreaChartEl = document.querySelector('#orderChart'),
    orderAreaChartConfig = {
      // chart: 차트의 기본적인 설정을 담당합니다.
      chart: {
        height: 80, // 차트의 높이
        type: 'area', // 차트 유형 (영역 차트)
        toolbar: {
          show: false // 차트 오른쪽 상단의 도구 모음 숨기기
        },
        // sparkline: 축, 범례 등을 숨겨 간결한 인라인 차트(미니 차트)로 만듭니다.
        sparkline: {
          enabled: true
        }
      },
      // markers: 데이터 포인트를 표시하는 마커에 대한 설정입니다.
      markers: {
        size: 6, // 마커 크기
        colors: 'transparent', // 마커 색상 (투명)
        strokeColors: 'transparent', // 마커 테두리 색상 (투명)
        strokeWidth: 4, // 마커 테두리 두께
        // discrete: 특정 데이터 포인트에만 개별적인 스타일을 적용합니다.
        discrete: [
          {
            fillColor: cardColor, // 채우기 색상
            seriesIndex: 0, // 스타일을 적용할 시리즈의 인덱스 (0부터 시작)
            dataPointIndex: 6, // 스타일을 적용할 데이터 포인트의 인덱스
            strokeColor: config.colors.success, // 테두리 색상
            strokeWidth: 2, // 테두리 두께
            size: 6, // 마커 크기
            radius: 8 // 마커 모서리 둥글기
          }
        ],
        offsetX: -1, // 마커의 x축 위치 조정
        hover: {
          size: 7 // 마우스 오버 시 마커 크기
        }
      },
      // grid: 차트 배경의 격자무늬에 대한 설정입니다.
      grid: {
        show: false, // 격자 숨기기
        padding: { // 차트 내부 여백
          top: 15,
          right: 7,
          left: 0
        }
      },
      // colors: 차트의 시리즈 색상을 지정합니다.
      colors: [config.colors.success],
      // fill: 영역 및 막대의 채우기 옵션입니다.
      fill: {
        type: 'gradient', // 채우기 유형 (그라데이션)
        gradient: {
          shadeIntensity: 1, // 그라데이션 음영 강도
          opacityFrom: 0.4, // 시작 투명도
          gradientToColors: [config.colors.cardColor], // 그라데이션 끝 색상
          opacityTo: 0.4, // 끝 투명도
          stops: [0, 100] // 그라데이션 중지점
        }
      },
      // dataLabels: 각 데이터 포인트 위에 표시되는 라벨(값)에 대한 설정입니다.
      dataLabels: {
        enabled: false // 데이터 라벨 숨기기
      },
      // stroke: 데이터 라인이나 막대의 테두리 선에 대한 설정입니다.
      stroke: {
        width: 2, // 선의 굵기
        curve: 'smooth' // 선의 곡선 형태 ('smooth', 'straight', 'stepline')
      },
      // series: 차트에 표시될 실제 데이터입니다.
      series: [
        {
          data: [180, 175, 275, 140, 205, 190, 295]
        }
      ],
      // xaxis: x축에 대한 설정입니다.
      xaxis: {
        show: false, // x축 숨기기
        lines: {
          show: false // x축 관련 선 숨기기
        },
        labels: {
          show: false // x축 라벨 숨기기
        },
        stroke: {
          width: 0 // x축 선 두께
        },
        axisBorder: {
          show: false // x축 테두리 선 숨기기
        }
      },
      // yaxis: y축에 대한 설정입니다.
      yaxis: {
        stroke: {
          width: 0
        },
        show: false // y축 숨기기
      }
    };
  if (typeof orderAreaChartEl !== 'undefined' && orderAreaChartEl !== null) {
    const orderAreaChart = new ApexCharts(orderAreaChartEl, orderAreaChartConfig);
    orderAreaChart.render();
  }

  // Total Revenue Report Chart - Bar Chart (총 수익 보고서 차트 - 막대 차트)
  // --------------------------------------------------------------------
  const totalRevenueChartEl = document.querySelector('#totalRevenueChart'),
    totalRevenueChartOptions = {
      series: [
        {
          name: new Date().getFullYear() - 1, // 시리즈 이름 (범례에 표시)
          data: [18, 7, 15, 29, 18, 12, 9] // y축 데이터 값
        },
        {
          name: new Date().getFullYear() - 2,
          data: [-13, -18, -9, -14, -8, -17, -15]
        }
      ],
      chart: {
        height: 300,
        stacked: true, // 막대를 쌓아 누적 막대 차트로 표시
        type: 'bar',
        toolbar: { show: false }
      },
      plotOptions: {
        bar: {
          horizontal: false, // 막대 방향 (false: 세로, true: 가로)
          columnWidth: '30%', // 각 막대의 너비
          borderRadius: 8, // 막대 모서리 둥글기
          startingShape: 'rounded', // 막대 시작 부분 모양
          endingShape: 'rounded', // 막대 끝 부분 모양
          borderRadiusApplication: 'around' // 막대의 모든 모서리에 둥글기 적용
        }
      },
      colors: [config.colors.primary, config.colors.info],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 6,
        lineCap: 'round', // 선의 끝 모양을 둥글게 처리
        colors: [cardColor]
      },
      legend: {
        show: true,
        horizontalAlign: 'left', // 범례의 가로 정렬
        position: 'top', // 범례의 위치
        markers: {
          size: 4,
          radius: 12,
          shape: 'circle', // 마커 모양
          strokeWidth: 0
        },
        fontSize: '13px',
        fontFamily: fontFamily,
        fontWeight: 400,
        labels: {
          colors: legendColor,
          useSeriesColors: false // 라벨 색상을 시리즈 색상과 동기화할지 여부
        },
        itemMargin: {
          horizontal: 10 // 범례 항목 간 가로 간격
        }
      },
      grid: {
        strokeDashArray: 7, // 격자무늬를 점선으로 표시 (점선 길이)
        borderColor: borderColor,
        padding: {
          top: 0,
          bottom: -8,
          left: 20,
          right: 20
        }
      },
      fill: {
        opacity: [1, 1] // 각 시리즈의 채우기 투명도
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        labels: {
          style: {
            fontSize: '13px',
            fontFamily: fontFamily,
            colors: labelColor
          }
        },
        axisTicks: {
          show: false // 축의 눈금 표시 숨기기
        },
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '13px',
            fontFamily: fontFamily,
            colors: labelColor
          }
        }
      },
      // responsive: 화면 크기에 따른 반응형 옵션을 설정합니다.
      responsive: [
        {
          breakpoint: 1700, // 이 해상도 이하일 때 아래 옵션 적용
          options: {
            plotOptions: {
              bar: {
                borderRadius: 10,
                columnWidth: '35%'
              }
            }
          }
        },
        {
          breakpoint: 1440,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 12,
                columnWidth: '43%'
              }
            }
          }
        },
        {
          breakpoint: 1300,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 11,
                columnWidth: '45%'
              }
            }
          }
        },
        {
          breakpoint: 1200,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 11,
                columnWidth: '37%'
              }
            }
          }
        },
        {
          breakpoint: 1040,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 12,
                columnWidth: '45%'
              }
            }
          }
        },
        {
          breakpoint: 991,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 12,
                columnWidth: '33%'
              }
            }
          }
        },
        {
          breakpoint: 768,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 11,
                columnWidth: '28%'
              }
            }
          }
        },
        {
          breakpoint: 640,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 11,
                columnWidth: '30%'
              }
            }
          }
        },
        {
          breakpoint: 576,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 10,
                columnWidth: '38%'
              }
            }
          }
        },
        {
          breakpoint: 440,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 10,
                columnWidth: '50%'
              }
            }
          }
        },
        {
          breakpoint: 380,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 9,
                columnWidth: '60%'
              }
            }
          }
        }
      ],
      // states: 사용자와의 상호작용(마우스 오버 등)에 따른 차트 상태 변화를 설정합니다.
      states: {
        hover: {
          filter: {
            type: 'none' // 마우스 오버 시 시각적 필터 효과 없음
          }
        },
        active: {
          filter: {
            type: 'none' // 클릭(활성화) 시 시각적 필터 효과 없음
          }
        }
      }
    };
  if (typeof totalRevenueChartEl !== 'undefined' && totalRevenueChartEl !== null) {
    const totalRevenueChart = new ApexCharts(totalRevenueChartEl, totalRevenueChartOptions);
    totalRevenueChart.render();
  }

  // Growth Chart - Radial Bar Chart (성장 차트 - 방사형 막대 차트)
  // --------------------------------------------------------------------
  const growthChartEl = document.querySelector('#growthChart'),
    growthChartOptions = {
      series: [78], // 백분율 값
      labels: ['Growth'], // 시리즈 라벨
      chart: {
        height: 200,
        type: 'radialBar' // 방사형 막대 차트
      },
      plotOptions: {
        radialBar: {
          size: 150, // 차트 전체 크기
          offsetY: 10, // y축 위치 조정
          startAngle: -150, // 시작 각도
          endAngle: 150, // 끝 각도
          hollow: {
            size: '55%' // 중앙의 빈 공간(구멍) 크기
          },
          track: {
            background: cardColor, // 차트의 배경 트랙 색상
            strokeWidth: '100%'
          },
          dataLabels: {
            name: { // 시리즈 이름('Growth') 라벨 설정
              offsetY: 15,
              color: legendColor,
              fontSize: '15px',
              fontWeight: '500',
              fontFamily: fontFamily
            },
            value: { // 값(78) 라벨 설정
              offsetY: -25,
              color: headingColor,
              fontSize: '22px',
              fontWeight: '500',
              fontFamily: fontFamily
            }
          }
        }
      },
      colors: [config.colors.primary],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark', // 그라데이션 음영 유형
          shadeIntensity: 0.5,
          gradientToColors: [config.colors.primary],
          inverseColors: true, // 그라데이션 색상 반전
          opacityFrom: 1,
          opacityTo: 0.6,
          stops: [30, 70, 100]
        }
      },
      stroke: {
        dashArray: 5 // 선을 점선으로 만듦
      },
      grid: {
        padding: {
          top: -35,
          bottom: -10
        }
      },
      states: {
        hover: {
          filter: {
            type: 'none'
          }
        },
        active: {
          filter: {
            type: 'none'
          }
        }
      }
    };
  if (typeof growthChartEl !== 'undefined' && growthChartEl !== null) {
    const growthChart = new ApexCharts(growthChartEl, growthChartOptions);
    growthChart.render();
  }

  // Revenue Bar Chart (수익 막대 차트)
  // --------------------------------------------------------------------
  const revenueBarChartEl = document.querySelector('#revenueChart'),
    revenueBarChartConfig = {
      chart: {
        height: 95,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          barHeight: '80%', // 막대 높이 (가로 막대 차트에서 주로 사용)
          columnWidth: '75%', // 막대 너비
          startingShape: 'rounded',
          endingShape: 'rounded',
          borderRadius: 4,
          distributed: true // 각 막대에 다른 색상을 분산하여 적용
        }
      },
      grid: {
        show: false,
        padding: {
          top: -20,
          bottom: -12,
          left: -10,
          right: 0
        }
      },
      colors: [
        config.colors.primary,
        config.colors.primary,
        config.colors.primary,
        config.colors.primary,
        config.colors.primary,
        config.colors.primary,
        config.colors.primary
      ],
      dataLabels: {
        enabled: false
      },
      series: [
        {
          data: [40, 95, 60, 45, 90, 50, 75]
        }
      ],
      legend: {
        show: false
      },
      xaxis: {
        categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: labelColor,
            fontSize: '13px'
          }
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      }
    };
  if (typeof revenueBarChartEl !== 'undefined' && revenueBarChartEl !== null) {
    const revenueBarChart = new ApexCharts(revenueBarChartEl, revenueBarChartConfig);
    revenueBarChart.render();
  }

  // Profit Report Line Chart (이익 보고서 라인 차트)
  // --------------------------------------------------------------------
  const profileReportChartEl = document.querySelector('#profileReportChart'),
    profileReportChartConfig = {
      chart: {
        height: 75,
        width: 240,
        type: 'line',
        toolbar: {
          show: false
        },
        // dropShadow: 차트에 그림자 효과를 추가합니다.
        dropShadow: {
          enabled: true,
          top: 10,
          left: 5,
          blur: 3,
          color: config.colors.warning,
          opacity: 0.15
        },
        sparkline: {
          enabled: true
        }
      },
      grid: {
        show: false,
        padding: {
          right: 8
        }
      },
      colors: [config.colors.warning],
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: 'smooth'
      },
      series: [
        {
          data: [110, 270, 145, 245, 205, 285]
        }
      ],
      xaxis: {
        show: false,
        lines: {
          show: false
        },
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        show: false
      },
      responsive: [
        {
          breakpoint: 1700,
          options: {
            chart: {
              width: 200
            }
          }
        },
        {
          breakpoint: 1579,
          options: {
            chart: {
              width: 180
            }
          }
        },
        {
          breakpoint: 1500,
          options: {
            chart: {
              width: 160
            }
          }
        },
        {
          breakpoint: 1450,
          options: {
            chart: {
              width: 140
            }
          }
        },
        {
          breakpoint: 1400,
          options: {
            chart: {
              width: 240
            }
          }
        }
      ]
    };
  if (typeof profileReportChartEl !== 'undefined' && profileReportChartEl !== null) {
    const profileReportChart = new ApexCharts(profileReportChartEl, profileReportChartConfig);
    profileReportChart.render();
  }

  // Order Statistics Chart (주문 통계 차트 - 도넛)
  // --------------------------------------------------------------------
  const chartOrderStatistics = document.querySelector('#orderStatisticsChart'),
    orderChartConfig = {
      chart: {
        height: 165,
        width: 136,
        type: 'donut', // 도넛 차트
        offsetX: 15 // 차트의 x축 위치 조정
      },
      labels: ['Electronic', 'Sports', 'Decor', 'Fashion'], // 각 조각의 라벨
      series: [50, 85, 25, 40], // 각 조각의 데이터 값
      colors: [config.colors.success, config.colors.primary, config.colors.secondary, config.colors.info],
      stroke: {
        width: 5,
        colors: [cardColor] // 조각 사이의 경계선 색상
      },
      dataLabels: {
        enabled: false,
        // formatter: 표시되는 값의 형식을 지정하는 함수
        formatter: function (val, opt) {
          return parseInt(val) + '%';
        }
      },
      legend: {
        show: false
      },
      grid: {
        padding: {
          top: 0,
          bottom: 0,
          right: 15
        }
      },
      states: {
        hover: {
          filter: { type: 'none' }
        },
        active: {
          filter: { type: 'none' }
        }
      },
      plotOptions: {
        pie: { // 파이/도넛 차트에 대한 설정
          donut: {
            size: '75%', // 도넛의 두께 (중앙 구멍의 크기)
            labels: { // 도넛 중앙에 표시될 라벨 설정
              show: true,
              value: { // 중앙에 표시될 값 (현재 선택된 조각의 값)
                fontSize: '1.125rem',
                fontFamily: fontFamily,
                fontWeight: 500,
                color: headingColor,
                offsetY: -17,
                formatter: function (val) {
                  return parseInt(val) + '%';
                }
              },
              name: { // 현재 선택된 조각의 이름
                offsetY: 17,
                fontFamily: fontFamily
              },
              total: { // 모든 조각의 합계
                show: true,
                fontSize: '13px',
                color: legendColor,
                label: 'Weekly', // 합계 라벨
                formatter: function (w) {
                  return '38%'; // 여기서는 고정된 값을 반환
                }
              }
            }
          }
        }
      }
    };
  if (typeof chartOrderStatistics !== 'undefined' && chartOrderStatistics !== null) {
    const statisticsChart = new ApexCharts(chartOrderStatistics, orderChartConfig);
    statisticsChart.render();
  }

  // Income Chart - Area chart (수입 차트 - 영역 차트)
  // --------------------------------------------------------------------
  const incomeChartEl = document.querySelector('#incomeChart'),
    incomeChartConfig = {
      series: [
        {
          data: [21, 30, 22, 42, 26, 35, 29]
        }
      ],
      chart: {
        height: 200,
        parentHeightOffset: 0, // 부모 요소로부터의 높이 오프셋 제거
        parentWidthOffset: 0, // 부모 요소로부터의 너비 오프셋 제거
        toolbar: {
          show: false
        },
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 3,
        curve: 'smooth'
      },
      legend: {
        show: false
      },
      markers: {
        size: 6,
        colors: 'transparent',
        strokeColors: 'transparent',
        strokeWidth: 4,
        discrete: [
          {
            fillColor: config.colors.white,
            seriesIndex: 0,
            dataPointIndex: 6,
            strokeColor: config.colors.primary,
            strokeWidth: 2,
            size: 6,
            radius: 8
          }
        ],
        offsetX: -1,
        hover: {
          size: 7
        }
      },
      colors: [config.colors.primary],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          gradientToColors: [config.colors.cardColor],
          opacityTo: 0.3,
          stops: [0, 100]
        }
      },
      grid: {
        borderColor: borderColor,
        strokeDashArray: 8,
        padding: {
          top: -20,
          bottom: -8,
          left: 0,
          right: 8
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: true,
          style: {
            fontSize: '13px',
            colors: labelColor
          }
        }
      },
      yaxis: {
        labels: {
          show: false
        },
        min: 10, // y축 최소값
        max: 50, // y축 최대값
        tickAmount: 4 // y축 눈금 개수
      }
    };
  if (typeof incomeChartEl !== 'undefined' && incomeChartEl !== null) {
    const incomeChart = new ApexCharts(incomeChartEl, incomeChartConfig);
    incomeChart.render();
  }

  // Expenses Mini Chart - Radial Chart (주간 지출 미니 차트)
  // --------------------------------------------------------------------
  const weeklyExpensesEl = document.querySelector('#expensesOfWeek'),
    weeklyExpensesConfig = {
      series: [65],
      chart: {
        width: 60,
        height: 60,
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          strokeWidth: '8',
          hollow: {
            margin: 2,
            size: '40%'
          },
          track: {
            background: borderColor
          },
          dataLabels: {
            show: true,
            name: {
              show: false
            },
            value: {
              formatter: function (val) {
                return '$' + parseInt(val);
              },
              offsetY: 5,
              color: legendColor,
              fontSize: '12px',
              fontFamily: fontFamily,
              show: true
            }
          }
        }
      },
      fill: {
        type: 'solid', // 단색으로 채우기
        colors: config.colors.primary
      },
      stroke: {
        lineCap: 'round'
      },
      grid: {
        padding: {
          top: -10,
          bottom: -15,
          left: -10,
          right: -10
        }
      },
      states: {
        hover: {
          filter: {
            type: 'none'
          }
        },
        active: {
          filter: {
            type: 'none'
          }
        }
      }
    };
  if (typeof weeklyExpensesEl !== 'undefined' && weeklyExpensesEl !== null) {
    const weeklyExpenses = new ApexCharts(weeklyExpensesEl, weeklyExpensesConfig);
    weeklyExpenses.render();
  }
});
