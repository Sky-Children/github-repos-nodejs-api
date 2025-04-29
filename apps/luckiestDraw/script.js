const drawButton = document.getElementById('drawButton');
const resultDiv = document.getElementById('result');
// const bambooStick = document.getElementById('bambooStick');
// const bambooStickText = document.getElementById('bambooStickText');
const bambooTube = document.querySelector('.bamboo-tube');

// 标记音频是否已播放
let audioPlayed = false;
// 修改点击事件监听器
drawButton.addEventListener('click', async () => {
    // 为每个动画创建独立的偏移量和旋转参数
    const createAnimationParams = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // 获取竹筒位置和尺寸
      const bambooRect = bambooTube.getBoundingClientRect();
      const startX = bambooRect.left + bambooRect.width / 2;
      const startY = bambooRect.top + bambooRect.height / 2;
      
      // 添加文字散开溶解动画
      const resultText = document.createElement('div');
      resultText.className = 'result-text';
      
      // 计算文字元素的尺寸
      const tempText = document.createElement('div');
      tempText.className = 'result-text';
      tempText.textContent = result;
      document.body.appendChild(tempText);
      const textWidth = tempText.offsetWidth;
      const textHeight = tempText.offsetHeight;
      tempText.remove();
      
      // 生成随机偏移量，基于页面尺寸计算限制范围
      const randomX = Math.floor(Math.random()*(windowWidth - textWidth));
      const randomY = Math.floor(Math.random()*(windowHeight - textHeight));
      
      const boundedX = Math.max(0, Math.min(windowWidth - textWidth,  randomX));
      const boundedY = Math.max(0, Math.min(windowHeight - textHeight, randomY));
      
      // 计算相对于起始位置的偏移量
      const offsetX = boundedX - startX;
      const offsetY = boundedY - startY;
      
      return {
        offsetX,
        offsetY
      };
    };
    
    try {
        // 生成随机偏移量
        const randomOffsetStart = Math.floor(Math.random() * 100) - 50; // 范围 -50 到 50
        const randomOffsetEnd = Math.floor(Math.random() * 100) - 50; // 范围 -50 到 50
        const randomRotation = Math.floor(Math.random() * 20) - 10; // 范围 -10 到 10

        // 创建动态的 CSS 动画规则
        const style = document.createElement('style');
        const windowHeight = window.innerHeight;
        const bottomStart = (250 / windowHeight) * 100;
        const bottomEnd = (450 / windowHeight) * 100;
        style.textContent = `
            @keyframes drawStick {
                0% {
                    bottom: ${bottomStart}vh;
                    opacity: 0;
                    transform: translateX(calc(-50% + ${randomOffsetStart}px)) rotate(0deg);
                }
                20% {
                    opacity: 1;
                }
                80% {
                    bottom: ${bottomEnd}vh;
                    opacity: 1;
                    transform: translateX(calc(-50% + ${randomOffsetEnd}px)) rotate(${randomRotation}deg);
                }
                100% {
                    bottom: ${bottomEnd}vh;
                    opacity: 0;
                    transform: translateX(calc(-50% + ${randomOffsetEnd}px)) rotate(${randomRotation}deg);
                }
            }
        `;
        document.head.appendChild(style);

        resultDiv.classList.add('animating');
        // 移除按钮禁用逻辑
        // drawButton.disabled = true;
        // bambooStick.classList.add('draw-anim');

        const response = await fetch('texts.txt');
        if (!response.ok) {
            throw new Error('无法读取抽签内容文件');
        }
        const text = await response.text();
        const lines = text.split('\n').filter(line => line.trim() !== '');
        
        if (lines.length === 0) {
            throw new Error('没有可用的抽签内容');
        }

        const randomIndex = Math.floor(Math.random() * lines.length);
        const result = lines[randomIndex];

        // 添加文字散开溶解动画
        const resultText = document.createElement('div');
        resultText.className = 'result-text';
        resultText.textContent = result;

        // 随机生成美化样式
        const fonts = ['Arial', 'Times New Roman', 'Verdana', 'Georgia', 'Courier New'];
        const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
        const randomColor = `hsl(${Math.random() * 360}, 50%, 80%)`;
        const randomSize = `${Math.floor(Math.random() * 20) + 20}px`;
        const randomShadow = `0 0 ${Math.floor(Math.random() * 10)}px ${randomColor}`;

        resultText.style.fontFamily = randomFont;
        resultText.style.color = randomColor;
        resultText.style.fontSize = randomSize;
        resultText.style.textShadow = randomShadow;

        // 计算文字元素的尺寸
        const tempText = document.createElement('div');
        tempText.className = 'result-text';
        tempText.textContent = result;
        document.body.appendChild(tempText);
        const textWidth = tempText.offsetWidth;
        const textHeight = tempText.offsetHeight;
        tempText.remove();

        // 获取页面边界
        const windowWidth = window.innerWidth;
        // const windowHeight = window.innerHeight;
        
        // 获取竹筒位置和尺寸
        const bambooRect = bambooTube.getBoundingClientRect();
        
        const startX = bambooRect.left + bambooRect.width / 2;
        const startY = bambooRect.top + bambooRect.height / 2;
        
        // 生成随机偏移量，基于页面尺寸计算限制范围
        const randomX = Math.floor(Math.random()*(windowWidth - textWidth));
        const randomY = Math.floor(Math.random()*(windowHeight - textHeight));

        const boundedX = Math.max(0, Math.min(windowWidth - textWidth,  randomX));
        const boundedY = Math.max(0, Math.min(windowHeight - textHeight, randomY));

        // 计算相对于起始位置的偏移量
        const offsetX = boundedX - startX;
        const offsetY = boundedY - startY;

        // 设置自定义属性
        resultText.style.setProperty('--offset-x', offsetX);
        resultText.style.setProperty('--offset-y', offsetY);
        console.log(boundedX,boundedY);
        // 获取竹筒位置
        // const bambooRect = bambooTube.getBoundingClientRect();
        resultText.style.left = `${startX}px`;
        resultText.style.top = `${startY}px`;

        document.body.appendChild(resultText);

        // 创建动态的 CSS 动画规则，确保前 1 秒和后 1 秒方向一致
        const dissolveStyle = document.createElement('style');
        const animationName = `textDissolve-${Date.now()}`;
        dissolveStyle.textContent = `
            @keyframes ${animationName} {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                    filter: blur(0);
                }
                50% {
                    transform: translate(${offsetX}px, ${offsetY}px) scale(1.5);
                    opacity: 1;
                    filter: blur(0); // 前 1 秒无模糊效果
                }
                50.01% {
                    transform: translate(${offsetX}px, ${offsetY}px) scale(1.5);
                    opacity: 1;
                    filter: blur(0);
                }
                100% {
                    transform: translate(${offsetX}px, ${offsetY}px) scale(2);
                    opacity: 0;
                    filter: blur(5px);
                }
            }
        `;
        document.head.appendChild(dissolveStyle);

        resultText.style.animation = `${animationName} 2s cubic-bezier(0.250, 0.250, 0.500, 0.500) 0s 1 normal forwards`;

        // 监听动画结束事件
        resultText.addEventListener('animationend', () => {
            resultText.remove();
            resultDiv.textContent = '';
            resultDiv.classList.remove('animating');
            // 移除按钮启用逻辑
            // drawButton.disabled = false;
            document.head.removeChild(style);
            document.head.removeChild(dissolveStyle);
        });
    } catch (error) {
        resultDiv.textContent = `错误: ${error.message}`;
        resultDiv.classList.remove('animating');
        // 移除按钮启用逻辑
        // drawButton.disabled = false;
        // bambooStick.classList.remove('draw-anim');
    }
});


// 烛火位置（基于 1024x1024 背景图片）
const candlePositions = [
    { x: 466, y: 329 },
    { x: 522, y: 329 }
];

// 计算烛火位置
function updateCandlePositions() {
    const bgImageWidth = 1024;
    const bgImageHeight = 1024;
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    candlePositions.forEach((pos, index) => {
        const candle = document.getElementById(`candle${index + 1}`);
        if (candle) {
            const x = (pos.x / bgImageWidth) * windowWidth;
            const y = (pos.y / bgImageHeight) * windowHeight;
            
            candle.style.left = `${x}px`;
            candle.style.top = `${y}px`;
        }
    });
}

// 初始化烛火位置
updateCandlePositions();

// 监听窗口尺寸变化
window.addEventListener('resize', updateCandlePositions);

const receiveButton = document.getElementById('drawButton');
if (receiveButton) {
    receiveButton.addEventListener('click', () => {
        if (!audioPlayed) {
            const audio = new Audio('recording.wav');
            audio.play();
            audioPlayed = true;
        }
    });
}