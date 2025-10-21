const carouselWrapper = document.getElementById('carousel-wrapper');
const carouselBtnLeft = document.getElementById('carousel-btn-left');
const carouselBtnRight = document.getElementById('carousel-btn-right');

carouselBtnLeft.addEventListener('click', () => {
    const itemWidth = carouselWrapper.querySelector('.carousel-item').offsetWidth + 24;
    carouselWrapper.scrollBy({ left: -itemWidth, behavior: 'smooth' });
});

carouselBtnRight.addEventListener('click', () => {
    const itemWidth = carouselWrapper.querySelector('.carousel-item').offsetWidth + 24;
    carouselWrapper.scrollBy({ left: itemWidth, behavior: 'smooth' });
});

const counterButton = document.getElementById('counter-btn');
const counterButton10x = document.getElementById('counter-btn-10x');
const counterButtonMinus1 = document.getElementById('counter-btn-minus-1');
const counterButtonMinus10 = document.getElementById('counter-btn-minus-10');
const counterDisplay = document.getElementById('counter-display');
let count = 0;

counterButton.addEventListener('click', () => {
    count++;
    counterDisplay.textContent = count;
});

counterButton10x.addEventListener('click', () => {
    count += 10;
    counterDisplay.textContent = count;
});

counterButtonMinus1.addEventListener('click', () => {
    count--;
    counterDisplay.textContent = count;
});

counterButtonMinus10.addEventListener('click', () => {
    count -= 10;
    counterDisplay.textContent = count;
});

const phpButton = document.getElementById('php-btn');
const phpEffectContainer = document.getElementById('php-effect-container');

phpButton.addEventListener('click', () => {
    const num1 = parseFloat(document.getElementById('php-num1').value);
    const num2 = parseFloat(document.getElementById('php-num2').value);

    if (isNaN(num1) || isNaN(num2)) {
        phpEffectContainer.classList.remove('hidden');
        phpEffectContainer.innerHTML = '<p class="text-red-400">Por favor, insira dois números válidos.</p>';
        setTimeout(() => { phpEffectContainer.classList.add('hidden'); }, 2000);
        return;
    }

    const result = num1 + num2;

    phpEffectContainer.classList.remove('hidden');
    phpEffectContainer.innerHTML = `<p class="text-zinc-400">Somando ${num1} e ${num2}...</p>`;

    const containerRect = phpEffectContainer.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 8 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 100 + 50;

        const startX = centerX - (size / 2);
        const startY = centerY - (size / 2);
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;

        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;

        phpEffectContainer.appendChild(particle);

        setTimeout(() => {
            particle.style.opacity = '1';
            particle.style.transform = `translate(${endX - startX}px, ${endY - startY}px) scale(1)`;
            setTimeout(() => {
                particle.style.opacity = '0';
                particle.style.transition = 'opacity 0.5s ease-out';
            }, 500);
        }, 10);
    }

    setTimeout(() => {
        phpEffectContainer.innerHTML = `<p class="text-purple-400 text-2xl font-bold">${result}</p>`;
        setTimeout(() => {
            phpEffectContainer.classList.add('hidden');
            phpEffectContainer.innerHTML = '';
        }, 2000);
    }, 1500);
});

const pythonButton = document.getElementById('python-btn');
const pythonEffectContainer = document.getElementById('python-effect-container');

pythonButton.addEventListener('click', () => {
    const num1 = parseFloat(document.getElementById('python-num1').value);
    const op = document.getElementById('python-op').value;
    const num2 = parseFloat(document.getElementById('python-num2').value);
    let result;

    if (isNaN(num1) || isNaN(num2) || !['+', '-', '*', '/'].includes(op)) {
        pythonEffectContainer.classList.remove('hidden');
        pythonEffectContainer.innerHTML = '<p class="text-red-400">Entrada inválida. Tente novamente.</p>';
        setTimeout(() => { pythonEffectContainer.classList.add('hidden'); }, 2000);
        return;
    }

    switch (op) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': result = num1 / num2; break;
        default: result = "Erro";
    }

    pythonEffectContainer.classList.remove('hidden');
    pythonEffectContainer.innerHTML = `<p class="text-zinc-400">Calculando ${num1} ${op} ${num2}...</p>`;

    const colors = ['#f87171', '#facc15', '#4ade80', '#22d3ee', '#818cf8', '#d8b4fe'];
    for (let i = 0; i < 5; i++) {
        const ring = document.createElement('div');
        ring.className = 'ring';
        ring.style.borderColor = colors[i % colors.length];
        ring.style.width = `${i * 20 + 20}px`;
        ring.style.height = `${i * 20 + 20}px`;
        ring.style.opacity = '0.5';
        pythonEffectContainer.appendChild(ring);
    }

    setTimeout(() => {
        pythonEffectContainer.innerHTML = `<p class="text-green-400 text-2xl font-bold">Resultado: ${result}</p>`;
        setTimeout(() => {
            pythonEffectContainer.classList.add('hidden');
            pythonEffectContainer.innerHTML = '';
        }, 2000);
    }, 2000);
});

const colorSlider = document.getElementById('color-slider');
const colorBlock = document.getElementById('color-block');
const colorHex = document.getElementById('color-hex');

const hsvToRgb = (h, s, v) => {
    h /= 360;
    let r, g, b;
    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

const toHex = (c) => {
    const hex = Math.round(c).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
};

colorSlider.addEventListener('input', (event) => {
    const value = event.target.value;
    const hue = (value / 100) * 360;
    const [r, g, b] = hsvToRgb(hue, 0.7, 0.9);
    const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    colorBlock.style.backgroundColor = hexColor;
    colorHex.textContent = hexColor;
});

const javaButton = document.getElementById('java-btn');
const javaAdjInput = document.getElementById('java-adj');
const javaNounInput = document.getElementById('java-noun');
const javaOutput = document.getElementById('java-output');

javaButton.addEventListener('click', () => {
    const adj = javaAdjInput.value || 'incrível';
    const noun = javaNounInput.value || 'projeto';
    javaOutput.textContent = `A minha jornada em código é como um ${adj} ${noun}.`;
});

const sortButton = document.getElementById('sort-btn');
const canvas = document.getElementById('python-canvas');
const ctx = canvas.getContext('2d');
const numBars = 20;
let data = [];
let sorting = false;
let i = 0;
let j = 0;

function initializeData() {
    data = [];
    for (let k = 0; k < numBars; k++) {
        data.push(Math.floor(Math.random() * 100) + 1);
    }
    i = 0;
    j = 0;
    sorting = false;
    drawBars(data, -1, -1);
}

function drawBars(arr, bar1, bar2) {
    const barWidth = canvas.width / arr.length;
    const maxHeight = canvas.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let k = 0; k < arr.length; k++) {
        const barHeight = (arr[k] / 100) * maxHeight;
        ctx.fillStyle = k === bar1 || k === bar2 ? '#4ade80' : '#d8b4fe';
        ctx.fillRect(k * barWidth, maxHeight - barHeight, barWidth - 1, barHeight);
    }
}

function bubbleSortStep() {
    if (!sorting) return;

    drawBars(data, j, j + 1);

    if (data[j] > data[j + 1]) {
        [data[j], data[j + 1]] = [data[j + 1], data[j]];
    }

    j++;
    if (j >= data.length - i - 1) {
        j = 0;
        i++;
    }

    if (i < data.length - 1) {
        requestAnimationFrame(bubbleSortStep);
    } else {
        sorting = false;
        drawBars(data, -1, -1);
    }
}

sortButton.addEventListener('click', () => {
    if (!sorting) {
        initializeData();
        sorting = true;
        bubbleSortStep();
    }
});

window.onload = initializeData;

const currencyCard = document.getElementById('currency-card');
const dragHandle = document.getElementById('drag-handle');
const closeBtn = document.getElementById('close-btn');
const convertBtn = document.getElementById('convert-btn');
const amountInput = document.getElementById('currency-amount');
const fromSelect = document.getElementById('currency-from');
const toSelect = document.getElementById('currency-to');
const responseDiv = document.getElementById('currency-response');
const openCurrencyBtn = document.getElementById('open-currency-btn');

let isDragging = false;
let initialX, initialY;
let initialCardLeft, initialCardTop;

closeBtn.addEventListener('click', () => {
    currencyCard.style.display = 'none';
});

dragHandle.addEventListener('mousedown', (e) => {
    isDragging = true;
    initialX = e.clientX;
    initialY = e.clientY;
    initialCardLeft = currencyCard.offsetLeft;
    initialCardTop = currencyCard.offsetTop;
    currencyCard.style.cursor = 'grabbing';
    currencyCard.style.transition = 'none';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const dx = e.clientX - initialX;
    const dy = e.clientY - initialY;
    currencyCard.style.left = `${initialCardLeft + dx}px`;
    currencyCard.style.top = `${initialCardTop + dy}px`;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    currencyCard.style.cursor = 'grab';
});

openCurrencyBtn.addEventListener('click', () => {
    currencyCard.style.display = 'block';
});

convertBtn.addEventListener('click', async () => {
    const amount = parseFloat(amountInput.value);
    const from = fromSelect.value;
    const to = toSelect.value;

    if (isNaN(amount) || amount <= 0) {
        responseDiv.textContent = 'Por favor, insira um valor válido.';
        return;
    }

    responseDiv.textContent = 'Convertendo...';

    const url = `https://open.er-api.com/v6/latest/${from}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro de rede: ${response.statusText}`);
        }
        const data = await response.json();

        const rate = data.rates[to];
        if (rate) {
            const result = amount * rate;
            const formattedResult = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: to
            }).format(result);
            responseDiv.textContent = `${amount} ${from} = ${formattedResult}`;
        } else {
            responseDiv.textContent = 'Moeda de destino não encontrada.';
        }

    } catch (error) {
        responseDiv.textContent = `Erro na conversão: ${error.message}`;
        console.error('Erro na requisição da API de moedas:', error);
    }
});