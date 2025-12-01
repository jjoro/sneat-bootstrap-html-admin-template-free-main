const puppeteer = require('puppeteer');

// ==========================================
// [Part 1] Pure Domain: 데이터 및 로직 정의
// ==========================================

/**
 * 기본 단계 생성 팩토리 (Internal)
 */
const createStep = (type, payload = {}) => Object.freeze({
    type,
    payload: Object.freeze({ ...payload }),
    condition: () => true // 기본 조건: 항상 실행
});

/**
 * 조건을 추가하는 고차 함수
 */
const withCondition = (predicate) => (step) => ({
    ...step,
    condition: predicate
});

/**
 * [New] 액션 생성자 모음 (Action Creators)
 * 사용자가 더 직관적으로 작업을 정의할 수 있도록 돕는 순수 함수들입니다.
 */
const Actions = {
    navigate: (url) => createStep('navigate', { url }),
    
    // 마우스 이벤트
    click: (selector) => createStep('click', { selector }),
    doubleClick: (selector) => createStep('double_click', { selector }),
    hover: (selector) => createStep('hover', { selector }),
    
    // 입력 및 키보드 이벤트
    type: (selector, text) => createStep('type', { selector, value: text }),
    press: (key) => createStep('press', { value: key }), // 예: 'Enter', 'Escape'
    
    // 유틸리티
    wait: (ms) => createStep('wait', { delay: ms }),
    scrollTo: (selector) => createStep('scroll_to', { selector }),
    scrape: (selector) => createStep('scrape', { selector }),
    screenshot: (path) => createStep('screenshot', { path })
};

/**
 * 워크플로우 생성
 */
const createWorkflow = (mode, steps) => Object.freeze({
    mode,
    steps: Object.freeze([...steps])
});

// ==========================================
// [Part 2] Impure Shell: 실행기 (확장됨)
// 다양한 이벤트 타입을 처리하도록 switch문이 확장되었습니다.
// ==========================================

const executeStep = async (page, step) => {
    // 실제 로직에서는 page 상태를 기반으로 조건을 체크해야 하지만, 
    // 여기서는 개념적으로 step의 순수 함수 조건만 확인합니다.
    const shouldRun = true; // 실제 구현 시: await step.condition(page) 

    if (!shouldRun) {
        console.log(`[Skip] Condition unmet for: ${step.type}`);
        return;
    }

    console.log(`[Action] ${step.type.toUpperCase()} executing...`);

    try {
        switch (step.type) {
            case 'navigate':
                await page.goto(step.payload.url, { waitUntil: 'networkidle2' });
                break;

            case 'click':
                await page.waitForSelector(step.payload.selector, { visible: true, timeout: 5000 });
                await page.click(step.payload.selector);
                break;

            case 'double_click': // [New]
                await page.waitForSelector(step.payload.selector);
                await page.click(step.payload.selector, { clickCount: 2 });
                break;

            case 'hover': // [New]
                await page.waitForSelector(step.payload.selector);
                await page.hover(step.payload.selector);
                break;

            case 'type':
                await page.waitForSelector(step.payload.selector);
                await page.type(step.payload.selector, step.payload.value);
                break;

            case 'press': // [New] 키보드 특정 키 입력
                await page.keyboard.press(step.payload.value);
                break;

            case 'scroll_to': // [New] 해당 요소로 스크롤
                await page.waitForSelector(step.payload.selector);
                await page.$eval(step.payload.selector, el => el.scrollIntoView());
                break;

            case 'scrape':
                await page.waitForSelector(step.payload.selector);
                const text = await page.$eval(step.payload.selector, el => el.textContent);
                console.log(`  -> [RESULT] Scraped: "${text.trim()}"`);
                break;

            case 'screenshot': // [New]
                await page.screenshot({ path: step.payload.path });
                console.log(`  -> [FILE] Saved to ${step.payload.path}`);
                break;

            case 'wait':
                await new Promise(r => setTimeout(r, step.payload.delay));
                break;

            default:
                console.warn(`Unknown action type: ${step.type}`);
        }
    } catch (error) {
        console.error(`  -> [ERROR] Failed to execute ${step.type}: ${error.message}`);
    }
};

const runStepsRecursively = async (page, steps, index = 0) => {
    if (index >= steps.length) return;
    await executeStep(page, steps[index]);
    await runStepsRecursively(page, steps, index + 1);
};

const executeWorkflow = async (workflow) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // 뷰포트 설정 (스크린샷 등을 위해)
    await page.setViewport({ width: 1280, height: 800 });

    const runLoop = async () => {
        await runStepsRecursively(page, workflow.steps);
        
        if (workflow.mode === 'infinite') {
            console.log("--- Waiting for next cycle... ---");
            await new Promise(r => setTimeout(r, 3000));
            await runLoop(); 
        } else {
            console.log("--- All Tasks Completed ---");
            await browser.close();
        }
    };

    await runLoop();
};

// ==========================================
// [Part 3] Usage Example: 사용자 정의 영역
// ==========================================

// 1. CSS 선택자 설정 (Immutable Dictionary)
// 선택자를 별도로 분리하여 관리의 용이성을 높입니다.
const Selectors = Object.freeze({
    searchInput: 'textarea[name="q"]', // 구글 검색창
    resultHeader: 'h3',                // 검색 결과 제목
    logo: 'img[alt="Google"]',         // 구글 로고
    footer: 'footer'                   // 페이지 하단
});

// 2. 조건 함수 (순수 함수 예시)
// 특정 시간대(짝수 초)에만 스크린샷을 찍는 조건
const isEvenSecond = () => new Date().getSeconds() % 2 === 0;

// 3. 작업 정의 (Pipeline)
// Action Creators를 사용하여 코드가 명세서처럼 읽히도록 작성합니다.
const automationTasks = [
    // 사이트 이동
    Actions.navigate('https://www.google.com'),
    
    // 로고에 마우스 호버 (이벤트 테스트)
    Actions.hover(Selectors.logo),
    Actions.wait(500),

    // 검색어 입력
    Actions.type(Selectors.searchInput, 'Functional Programming Javascript'),
    
    // 엔터키 입력 (클릭 대신 키보드 이벤트 사용 예시)
    Actions.press('Enter'),
    
    // 검색 결과 로딩 대기
    Actions.wait(2000),
    
    // 하단으로 스크롤 이동
    Actions.scrollTo(Selectors.footer),
    Actions.wait(1000),

    // 다시 첫 번째 결과로 스크롤 이동 (선택자 재사용)
    Actions.scrollTo(Selectors.resultHeader),
    
    // 결과 텍스트 추출
    Actions.scrape(Selectors.resultHeader),

    // 조건부 스크린샷: 짝수 초일 때만 실행
    withCondition(isEvenSecond)(
        Actions.screenshot('result.png')
    )
];

// 4. 실행 (단일 실행 모드)
const myWorkflow = createWorkflow('single', automationTasks);

executeWorkflow(myWorkflow);
    // 다시 첫 번째 결과로 스크롤 이동 (선택자 재사용)
    Actions.scrollTo(Selectors.resultHeader),
    
    // 결과 텍스트 추출
    Actions.scrape(Selectors.resultHeader),

    // 조건부 스크린샷: 짝수 초일 때만 실행
    withCondition(isEvenSecond)(
        Actions.screenshot('result.png')
    )
];

// 4. 실행 (단일 실행 모드)
const myWorkflow = createWorkflow('single', automationTasks);

executeWorkflow(myWorkflow);
