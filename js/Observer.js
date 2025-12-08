<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOM 생성 감지 MutationObserver</title>
    <!-- Tailwind CSS CDN 로드 -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* 기본 폰트 설정 */
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4">

    <div id="app-container" class="w-full max-w-lg bg-white p-8 shadow-2xl rounded-xl border border-gray-100">
        <h1 class="text-3xl font-extrabold text-gray-800 mb-4 text-center">DOM 생성 감지기 (MutationObserver)</h1>
        <p class="text-gray-600 mb-8 text-center">
            이 페이지는 `.dynamic-element` 클래스를 가진 요소가 생성되는 것을 감지합니다.<br>
            <span class="font-bold text-indigo-600">3초 후</span>에 요소가 동적으로 추가됩니다.
        </p>
        
        <div id="status-box" class="p-4 bg-blue-100 text-blue-800 rounded-lg font-semibold mb-6 text-center">
            현재 상태: 타겟 요소 대기 중...
        </div>

        <div id="dynamic-area" class="min-h-[100px] border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-gray-400">
            <!-- 동적으로 요소가 추가될 영역 -->
            요소 생성 대기 영역
        </div>
    </div>

    <script>
        // Global variables for Firebase context (required for Canvas environment, even if unused here)
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};

        /**
         * MutationObserver를 사용하여 특정 DOM 요소가 생성될 때까지 기다리는 Promise를 반환합니다.
         * @param {string} selector - 감지할 타겟 요소의 CSS 선택자.
         * @returns {Promise<Element>} - 발견된 DOM 요소를 resolve하는 Promise.
         */
        function waitForElement(selector) {
            return new Promise((resolve) => {
                const statusBox = document.getElementById('status-box');
                
                // 1. 이미 요소가 존재하는지 확인 (일반적으로 동적 생성 시에는 false)
                const existingElement = document.querySelector(selector);
                if (existingElement) {
                    statusBox.textContent = '현재 상태: 요소가 이미 존재하여 즉시 감지됨!';
                    return resolve(existingElement);
                }

                statusBox.textContent = `현재 상태: '${selector}' 요소 생성 감시 시작...`;

                // 2. MutationObserver 설정 및 시작
                const observer = new MutationObserver((mutationsList, currentObserver) => {
                    const foundElement = document.querySelector(selector);
                    if (foundElement) {
                        // 요소를 찾았으면 Promise를 resolve하고 감시를 종료합니다.
                        resolve(foundElement);
                        currentObserver.disconnect();
                    }
                });

                // document.body 전체를 감시하며, 자식 노드의 추가/제거 및 하위 트리 변경을 모두 감지합니다.
                observer.observe(document.body, {
                    childList: true, // 자식 노드 변경 감지
                    subtree: true    // 모든 자손 노드 감지
                });
            });
        }

        // --- 메인 로직 실행 ---

        // 1. 감지할 타겟 선택자
        const targetSelector = '.dynamic-element';

        console.log(`[INIT] '${targetSelector}' 요소의 생성을 감시합니다.`);

        // 2. 요소가 생성될 때까지 기다립니다. (Promise 기반)
        waitForElement(targetSelector).then((element) => {
            console.log('[SUCCESS] 타겟 요소가 성공적으로 감지되었습니다! 함수 실행.');
            
            const statusBox = document.getElementById('status-box');
            statusBox.className = 'p-4 bg-green-100 text-green-800 rounded-lg font-semibold mb-6 text-center';
            statusBox.textContent = `현재 상태: ✅ 요소 감지 성공! (클래스: ${targetSelector})`;
            
            // 3. 감지 후 실행할 함수 로직 (예: 스타일 변경, 이벤트 리스너 추가)
            element.classList.remove('bg-red-50');
            element.classList.add('bg-yellow-300', 'ring-4', 'ring-yellow-500/50', 'shadow-md');
            element.textContent = '저는 감지되었어요! 🥳';
            element.addEventListener('click', () => {
                alert('감지 후 연결된 클릭 이벤트가 작동합니다!');
            });
        });

        // 4. 테스트: 3초 후에 감지 대상 요소를 동적으로 생성합니다.
        setTimeout(() => {
            console.log('[TEST] 3초 후, 동적으로 타겟 요소를 생성하여 DOM에 추가합니다.');
            const dynamicArea = document.getElementById('dynamic-area');
            
            const newElement = document.createElement('button');
            newElement.className = 'dynamic-element p-3 mt-4 text-white bg-red-500 hover:bg-red-600 rounded-lg transition duration-200';
            newElement.textContent = '3초 후에 생성됨 (클릭해보세요)';
            
            dynamicArea.innerHTML = ''; // "요소 생성 대기 영역" 텍스트 제거
            dynamicArea.appendChild(newElement);

        }, 3000);
    </script>
</body>
</html>

