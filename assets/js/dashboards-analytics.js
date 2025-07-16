
/**
 * Dashboard Analytics
 */

'use strict';

document.addEventListener('DOMContentLoaded', function (e) {
  // 색상 및 폰트 변수 설정
  let cardColor, headingColor, legendColor, labelColor, shadeColor, borderColor, fontFamily, eventData, descData;
  let chart;
  cardColor = config.colors.cardColor;
  headingColor = config.colors.headingColor;
  legendColor = config.colors.bodyColor;
  labelColor = config.colors.textMuted;
  borderColor = config.colors.borderColor;
  fontFamily = config.fontFamily;
  eventData = config.data.event;
  descData = config.data.desc;

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
          name: eventData.name[0], // 시리즈 이름 (범례에 표시)
          data: [18, 7, 15, 29, 18, 12, 9] // y축 데이터 값
        },
        {
          name: eventData.name[1],
          data: [13, 18, 9, 14, 8, 17, 15]
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
      stroke: { // 막대 테두리 선에 대한 설정
        curve: 'smooth',
        width: 4,
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
      series: [100], // 백분율 값
      labels: ['소명율'], // 시리즈 라벨
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
      labels: eventData.scrn_nm, // 각 조각의 라벨
      series: [1000, 2000, 4000, 8000], // 각 조각의 데이터 값
      colors: [config.colors.success, config.colors.primary, config.colors.secondary, config.colors.info],
      stroke: {
        width: 5,
        colors: [cardColor] // 조각 사이의 경계선 색상
      },
      dataLabels: {
        enabled: false,
        // formatter: 표시되는 값의 형식을 지정하는 함수
        formatter: function (val, opt) {
          return parseInt(val);
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
                  return parseInt(val);
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
                label: '당월 기준', // 합계 라벨
                formatter: function (w) {
                  return 1000; // 여기서는 고정된 값을 반환
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

  // 1. 차트에 사용될 데이터와 색상 정의
  let chartData = [
    { name: '정산', value: 35 },
    { name: '청구', value: 20 },
    { name: '결제', value: 14 },
    { name: '과금', value: 12 },
  ];

  //가로 막대 차트 설정
  const horizontalChartEl = document.querySelector('#chart'),
    // 2. ApexCharts 옵션 설정
    horizontalChartConfig = {
      // series: 차트에 표시될 데이터
      series: [
        {
          // data 속성에 값만 추출하여 배열로 전달
          data: chartData.map(item => item.value)
        }
      ],

      // chart: 차트의 전반적인 설정
      chart: {
        type: 'bar', // 막대 차트
        height: 350, // 차트 높이
        toolbar: {
          show: false // 차트 오른쪽 상단의 도구 모음 숨기기
        },
      },

      // plotOptions: 차트 유형별 세부 시각화 설정
      plotOptions: {
        bar: {
          horizontal: true, // 수평 막대 차트
          barHeight: '60%', // 막대의 높이
          borderRadius: 8, // 막대 모서리 둥글기
          distributed: true, // 각 막대에 다른 색상을 분산하여 적용
          dataLabels: {
            // 데이터 라벨을 막대의 중앙에 위치시킵니다.
            position: 'center'
          }
        }
      },

      // colors: 각 막대에 적용될 색상 배열
      colors: [config.colors.primary, config.colors.info, config.colors.success, config.colors.secondary, config.colors.warning, config.colors.danger],

      // dataLabels: 막대 위에 표시되는 텍스트 라벨
      dataLabels: {
        enabled: true,
        textAnchor: 'middle', // 라벨 텍스트의 정렬 기준 (막대 끝 부분)
        style: {
          colors: ['#FFFFFF'], // 라벨 색상
          fontSize: '14px', // 라벨 폰트 크기
          fontFamily: config.fontFamily, // 라벨 폰트 패밀리
          fontWeight: 500,
        },
        // formatter: 라벨의 텍스트를 동적으로 변경
        formatter: function (val, opt) {
          // 데이터 라벨에 카테고리 이름(예: 'UI Design')을 표시
          return opt.w.globals.labels[opt.dataPointIndex];
        },
        // 중앙 정렬을 위해 offsetX 값은 제거하거나 0으로 설정합니다.
        offsetX: 0,
      },

      // xaxis: x축 설정
      xaxis: {
        categories: chartData.map(item => item.name), // 카테고리 이름 설정
        labels: {
          // x축 라벨에 '%' 기호 추가
          formatter: function (val) {
            return val.toFixed(0) + '%';
          }
        }
      },

      // yaxis: y축 설정
      yaxis: {
        // 이미지와 같이 y축의 카테고리 라벨을 숨김
        labels: {
          show: true // y축 라벨 표시
        }
      },

      // grid: 차트 배경의 격자무늬 설정
      grid: {
        show: true,
        borderColor: '#f0f0f0', // 격자 선 색상
        strokeDashArray: 8, // 격자 선을 점선으로 변경
        xaxis: {
          lines: {
            show: true // 세로 격자선 표시
          }
        },
        yaxis: {
          lines: {
            show: false // 가로 격자선 숨김
          }
        }
      },

      // legend: 범례 설정
      legend: {
        show: false // 기본 범례를 숨겨 커스텀 범례를 사용
      },

      // tooltip: 마우스를 올렸을 때 나타나는 정보창 설정
      tooltip: {
        theme: 'dark', // 툴팁 테마
        y: {
          // 툴팁에 표시되는 값에 '%' 기호 추가
          formatter: function (val) {
            return val + '%';
          },
          // 툴팁 제목을 비워서 시리즈 이름을 숨김
          title: {
            formatter: function () {
              return '';
            }
          }
        }
      }
    };

  if (typeof horizontalChartEl !== 'undefined' && horizontalChartEl !== null) {
    const horizontalChart = new ApexCharts(horizontalChartEl, horizontalChartConfig);
    horizontalChart.render();
  }

  // defaultBarChart - Bar Chart (상세페이지 기본 차트 - 막대 차트)
  // --------------------------------------------------------------------
  const defaultBarChartEl = document.querySelector('#descChart'),
    defaultBarChartOptions = {
      series: [
        {
          name: descData.name[0], // 시리즈 이름 (범례에 표시)
          data: [18, 7, 15, 29, 18, 12, 9] // y축 데이터 값
        },
        {
          name: descData.name[1],
          data: [13, 18, 9, 14, 8, 17, 15]
        },
        {
          name: descData.name[2],
          data: [13, 18, 9, 14, 8, 17, 15]
        }
      ],
      chart: {
        height: 300,
        stacked: false, // 막대를 쌓아 누적 막대 차트로 표시
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
      colors: [config.colors.primary, config.colors.info, config.colors.success],
      dataLabels: {
        enabled: false
      },
      stroke: { // 막대 테두리 선에 대한 설정
        curve: 'smooth',
        width: 1,
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
  if (typeof defaultBarChartEl !== 'undefined' && defaultBarChartEl !== null) {
    const defaultBarChart = new ApexCharts(defaultBarChartEl, defaultBarChartOptions);
    defaultBarChart.render();
    chart = defaultBarChart;
  }

  // 3. 모든 타입 변경 버튼에 대한 이벤트 리스너 설정 (개선된 방식)
  const typeIcons = document.querySelectorAll('.chart-toolbar i[data-chart-type]');

  typeIcons.forEach(icon => {
    icon.addEventListener('click', (event) => {
      // 클릭된 아이콘의 data-chart-type 속성 값을 가져옵니다.
      const newType = event.target.getAttribute('data-chart-type');

      // 타입 변경 시 충돌을 방지하기 위한 새로운 옵션 객체 생성
      let newOptions = {
        chart: {
          type: newType,
          stacked: false // 기본적으로 누적 차트 비활성화
        },
        // 모든 타입에서 공통적으로 stroke.width를 2로 설정
        stroke: {
          width: newType === 'bar' ? 1 : 2, // 바 차트는 테두리 1, 나머지는 선 굵기 2
          curve: 'smooth'
        },
        // plotOptions를 타입에 맞게 초기화
        plotOptions: {},
        fill: {
          opacity: 1 // 기본 채우기 불투명도
        }
      };

      // 각 타입에 맞는 세부 옵션 설정
      if (newType === 'bar') {
        newOptions.plotOptions = chart.plotOptions; // 기본 바 차트 옵션 사용
      } else if (newType === 'area') {
        newOptions.fill.opacity = 0.6; // 영역 차트는 약간 투명하게
      } else if (newType === 'radar') {
        // Radar 차트는 stroke가 얇으면 잘 보이지 않으므로 굵게 설정
        newOptions.stroke.width = 2;
      }

      // updateOptions 메소드를 사용하여 차트 타입 및 관련 옵션 변경
      chart.updateOptions(newOptions);
    });
  });
});
