const API_BASE = "https://higakaga.store";

// --- 1. 요약 데이터 가져오기 ---
async function fetchSummary() {
    const res = await fetch(`${API_BASE}/summary`);
    const data = await res.json();

    renderAvgLevelChart(data);
    renderWorldRatioChart(data);
}

// 평균 레벨 차트 (막대 그래프)
function renderAvgLevelChart(data) {
    const ctx = document.getElementById("avgLevelChart").getContext("2d");
    const labels = Object.keys(data).filter(k => k !== "None");
    const levels = labels.map(k => data[k].avg_level);

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "평균 레벨",
                data: levels,
                backgroundColor: ["#3498db", "#2ecc71", "#e67e22"]
            }]
        }
    });
}

// 월드 비율 차트 (도넛 차트)
function renderWorldRatioChart(data) {
    const ctx = document.getElementById("worldRatioChart").getContext("2d");
    const labels = Object.keys(data).filter(k => k !== "None");
    const ratios = labels.map(k => data[k].top_ratio);
    const worlds = labels.map(k => data[k].top_world);

    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: worlds,
            datasets: [{
                label: "비율",
                data: ratios,
                backgroundColor: ["#9b59b6", "#f1c40f", "#e74c3c"]
            }]
        }
    });
}

// --- 2. 캐릭터 조회 ---
async function fetchCharacters() {
    const q = document.getElementById("questSelect").value;
    const res = await fetch(`${API_BASE}/characters?q=${q}`);
    const rows = await res.json();

    const tbody = document.querySelector("#charTable tbody");
    tbody.innerHTML = "";
    rows.forEach(r => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${r.character_name}</td><td>${r.character_class}</td><td>${r.character_level}</td>`;
        tbody.appendChild(tr);
    });
}

// 초기 로드
fetchSummary();
