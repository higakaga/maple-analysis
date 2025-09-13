// API 호출 함수
async function fetchSummary() {
    try {
        const response = await fetch("https://higakaga.store/summary");
        const data = await response.json();

        renderSummary(data);
        renderCharts(data);

    } catch (err) {
        console.error("API 호출 실패:", err);
        alert("데이터를 불러오는데 실패했습니다.");
    }
}

// 카드 렌더링
function renderSummary(data) {
    const container = document.getElementById("summary");
    container.innerHTML = `
    <h2>요약 결과</h2>
    <div class="card">
      <p><b>[0 그룹]</b> 평균 레벨: ${data["0"].avg_level}, Top World: ${data["0"].top_world} (${(data["0"].top_ratio * 100).toFixed(1)}%)</p>
      <p><b>[1 그룹]</b> 평균 레벨: ${data["1"].avg_level}, Top World: ${data["1"].top_world} (${(data["1"].top_ratio * 100).toFixed(1)}%)</p>
      <p><b>[2 그룹]</b> 평균 레벨: ${data["2"].avg_level}, Top World: ${data["2"].top_world} (${(data["2"].top_ratio * 100).toFixed(1)}%)</p>
    </div>
  `;
}

// 차트 렌더링
function renderCharts(data) {
    // 기존 차트 객체 있으면 제거 (버튼 여러번 눌러도 중첩 방지)
    if (window.pieChart) window.pieChart.destroy();
    if (window.donutChart) window.donutChart.destroy();
    if (window.histChart) window.histChart.destroy();

    // Pie Chart (Top Ratio)
    const pieCtx = document.getElementById("pieChart").getContext("2d");
    window.pieChart = new Chart(pieCtx, {
        type: "pie",
        data: {
            labels: ["그룹0", "그룹1", "그룹2"],
            datasets: [{
                label: "Top World Ratio",
                data: [
                    data["0"].top_ratio,
                    data["1"].top_ratio,
                    data["2"].top_ratio
                ],
                backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"]
            }]
        }
    });

    // Donut Chart (평균 레벨)
    const donutCtx = document.getElementById("donutChart").getContext("2d");
    window.donutChart = new Chart(donutCtx, {
        type: "doughnut",
        data: {
            labels: ["그룹0", "그룹1", "그룹2"],
            datasets: [{
                label: "평균 레벨",
                data: [
                    data["0"].avg_level,
                    data["1"].avg_level,
                    data["2"].avg_level
                ],
                backgroundColor: ["#4bc0c0", "#9966ff", "#ff9f40"]
            }]
        }
    });

    // Histogram (평균 레벨 막대 그래프)
    const histCtx = document.getElementById("histChart").getContext("2d");
    window.histChart = new Chart(histCtx, {
        type: "bar",
        data: {
            labels: ["그룹0", "그룹1", "그룹2"],
            datasets: [{
                label: "평균 레벨",
                data: [
                    data["0"].avg_level,
                    data["1"].avg_level,
                    data["2"].avg_level
                ],
                backgroundColor: ["#36a2eb", "#ff6384", "#ffcd56"]
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// ✅ 버튼 클릭 시 API 호출 실행
document.getElementById("loadData").addEventListener("click", fetchSummary);
