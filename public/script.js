const topicInput = document.getElementById('topicInput');
const platformSelect = document.getElementById('platform');
const toneSelect = document.getElementById('tone');
const audienceSelect = document.getElementById('audience');
const generateBtn = document.getElementById('generateBtn');
const repurposeBtn = document.getElementById('repurposeBtn');
const loading = document.getElementById('loading');
const resultContainer = document.getElementById('result-container');

// Result elements
const contentOutput = document.getElementById('contentOutput');
const hashtagOutput = document.getElementById('hashtagOutput');
const ctaOutput = document.getElementById('ctaOutput');
const scoreValue = document.getElementById('scoreValue');
const scoreReasoning = document.getElementById('scoreReasoning');
const suggestionList = document.getElementById('suggestionList');
const copyBtn = document.getElementById('copyBtn');

const charCount = document.getElementById('charCount');
const charLimit = document.getElementById('charLimit');
const scoreCirclePath = document.getElementById('scoreCirclePath');
const imagePromptOutput = document.getElementById('imagePromptOutput');
const copyPromptBtn = document.getElementById('copyPromptBtn');

const historySidebar = document.getElementById('historySidebar');
const historyList = document.getElementById('historyList');
const historyToggle = document.getElementById('historyToggle');
const closeHistory = document.getElementById('closeHistory');

let currentContent = "";
let contentHistory = JSON.parse(localStorage.getItem('copilot_history') || "[]");

const PLATFORM_LIMITS = {
    'LinkedIn': 3000,
    'Instagram': 2200,
    'Twitter/X': 280,
    'Threads': 500,
    'Facebook': 63206,
    'YouTube Community': 10000,
    'TikTok Caption': 4000,
    'Pinterest': 500
};

// Character Counter Logic
function updateCharCounter() {
    const platform = platformSelect.value;
    const limit = PLATFORM_LIMITS[platform] || "∞";
    const currentLen = topicInput.value.length;

    charCount.innerText = currentLen;
    charLimit.innerText = limit;

    if (limit !== "∞") {
        if (currentLen > limit) {
            charCount.className = "limit-exceeded";
        } else if (currentLen > limit * 0.85) {
            charCount.className = "limit-near";
        } else {
            charCount.className = "";
        }
    }
}

topicInput.addEventListener('input', updateCharCounter);
platformSelect.addEventListener('change', updateCharCounter);

// History Side Bar Logic
historyToggle.addEventListener('click', () => {
    historySidebar.classList.add('open');
    renderHistory();
});

closeHistory.addEventListener('click', () => {
    historySidebar.classList.remove('open');
});

function saveToHistory(data, topic) {
    const historyItem = {
        id: Date.now(),
        topic: topic,
        platform: platformSelect.value,
        content: data.content,
        hashtags: data.hashtags,
        cta: data.cta,
        score: data.engagement_score,
        timestamp: new Date().toLocaleTimeString()
    };

    contentHistory.unshift(historyItem);
    if (contentHistory.length > 20) contentHistory.pop(); // Keep last 20
    localStorage.setItem('copilot_history', JSON.stringify(contentHistory));
}

function renderHistory() {
    historyList.innerHTML = "";
    if (contentHistory.length === 0) {
        historyList.innerHTML = '<p class="empty-msg">No history yet. Generate some magic!</p>';
        return;
    }

    contentHistory.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <h4>${item.topic.substring(0, 30)}${item.topic.length > 30 ? '...' : ''}</h4>
            <p>${item.platform} • ${item.timestamp}</p>
        `;
        div.onclick = () => {
            renderResult({
                content: item.content,
                hashtags: item.hashtags,
                cta: item.cta,
                engagement_score: item.score,
                score_reasoning: "Loaded from history."
            });
            historySidebar.classList.remove('open');
        };
        historyList.appendChild(div);
    });
}

generateBtn.addEventListener('click', async () => {
    const input = topicInput.value.trim();
    if (!input) {
        alert("Please enter a topic or some text first!");
        return;
    }

    await handleRequest('/api/generate', {
        input,
        platform: platformSelect.value,
        tone: toneSelect.value,
        audience: audienceSelect.value
    }, input);
});

repurposeBtn.addEventListener('click', async () => {
    if (!currentContent) {
        alert("Generate something first before repurposing!");
        return;
    }

    await handleRequest('/api/repurpose', {
        sourceContent: currentContent,
        targetPlatform: platformSelect.value,
        tone: toneSelect.value,
        audience: audienceSelect.value
    }, `Repurposed: ${currentContent.substring(0, 20)}`);
});

async function handleRequest(endpoint, body, topic) {
    try {
        loading.style.display = 'block';
        resultContainer.style.display = 'none';
        generateBtn.disabled = true;

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        renderResult(data);
        saveToHistory(data, topic);

    } catch (error) {
        console.error("Fetch error:", error);
        alert("Something went wrong. Make sure the server is running!");
    } finally {
        loading.style.display = 'none';
        generateBtn.disabled = false;
    }
}

function renderResult(data) {
    resultContainer.style.display = 'block';

    currentContent = data.content;
    contentOutput.innerText = data.content;
    hashtagOutput.innerText = data.hashtags ? data.hashtags.map(t => `#${t.replace('#', '')}`).join(' ') : "";
    ctaOutput.innerText = data.cta || "";

    // Update Score Gauge
    const score = data.engagement_score || 0;
    scoreValue.innerText = score;
    scoreCirclePath.setAttribute('stroke-dasharray', `${score}, 100`);

    // Change color based on score
    if (score < 50) scoreCirclePath.style.stroke = "#ef4444";
    else if (score < 80) scoreCirclePath.style.stroke = "#facc15";
    else scoreCirclePath.style.stroke = "#22c55e";

    scoreReasoning.innerText = data.score_reasoning || "No reasoning provided.";

    suggestionList.innerHTML = "";
    if (data.suggestions) {
        data.suggestions.forEach(tip => {
            const li = document.createElement('li');
            li.innerText = tip;
            suggestionList.appendChild(li);
        });
    }

    // Generate Image Prompt (Client-side template for now, or could move to backend)
    const imgPrompt = `A high-quality, professional ${data.hashtags?.[0] || 'themed'} digital illustration/photograph for ${platformSelect.value}, style: ${toneSelect.value}, depicting ${topicInput.value.substring(0, 50)}..., cinematic lighting, 8k, highly detailed.`;
    imagePromptOutput.innerText = imgPrompt;

    resultContainer.scrollIntoView({ behavior: 'smooth' });
}

copyBtn.addEventListener('click', () => {
    const fullText = `${contentOutput.innerText}\n\n${hashtagOutput.innerText}\n\n${ctaOutput.innerText}`;
    navigator.clipboard.writeText(fullText);
    showCopied(copyBtn);
});

copyPromptBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(imagePromptOutput.innerText);
    showCopied(copyPromptBtn);
});

function showCopied(btn) {
    const originalText = btn.innerText;
    btn.innerText = "Copied! ✅";
    setTimeout(() => btn.innerText = originalText, 2000);
}

// Initial counter update
updateCharCounter();
renderHistory();
