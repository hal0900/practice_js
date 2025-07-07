//ガチャデータをフラットな配列に変換
function flattenGroupedData(data) {
    const result = [];

    for (const rarity in data.items) {
        const items = data.items[rarity];
        const totalWeight = data.weights[rarity] ?? 1; // 未定義ならデフォルト1
        const perItemWeight = totalWeight / items.length; // 各アイテムに均等割り当て

        items.forEach(name => {
            result.push({ name, rarity, weight: perItemWeight });
        });
    }

    return result;
}

//ガチャのデータを読み込む
let gachaItems = [];
let gachaWeights = {};

async function loadGachaData() {
    const button = document.getElementById("gachaButton");

    try {
        const response = await fetch("whity_gachaData.json");
        if (!response.ok) {
            throw new Error("ネットワークエラー");
        }
        const rawData = await response.json();
        gachaWeights = rawData.weights;
        gachaItems = flattenGroupedData(rawData);

        //読み込み成功：ボタンを有効化
        button.disabled = false;
        button.classList.remove("disabled-button");
        button.textContent = "ガチャをまわす！";
    } catch(error) {
        console.error("データ読み込み失敗：", error);
        button.textContent = "読み込み失敗";
        button.classList.add("disabled-button");
        button.disabled = true;
    }
}

// レアリティの略称を作成
const rarityShortMap = {
    "normal": "N",
    "nori-rare": "N",
    "rare": "R",
    "super-rare": "SR",
    "super-super-rare": "SSR",
    "ultra-rare": "UR"
};

// 抽選用の累積テーブルを作る関数
function buildCumulativeTable(items) {
    let table = [];
    let cumulative = 0;

    for ( const item of items) {
        cumulative += item.weight;
        table.push({ item, cumulative});
    }

    return { table, total: cumulative };
}

// 重み付きで1つ抽選
function drawItem(cumulativeTable) {
    const rand = Math.random() * cumulativeTable.total;

    for (const entry of cumulativeTable.table) {
        if (rand < entry.cumulative) {
            return entry.item;
        }
    }
    
    // 念のため（理論上ここには来ない）
    return cumulativeTable.table[cumulativeTable.table.length - 1].item;
}

// 10連ガチャを実行
function runGacha() {
    const button = document.getElementById("gachaButton");
    button.disabled = true;

    const resultArea = document.getElementById("results");
    resultArea.innerHTML = ""; // 前回の結果を消す

    const normalTable = buildCumulativeTable(gachaItems);

    // 確定枠用：高レアだけのテーブルを作成
    const highRarityItems = gachaItems.filter(item =>
        item.rarity === "super-rare" ||
        item.rarity === "super-super-rare" ||
        item.rarity === "ultra-rare"
    );
    const highRarityTable = buildCumulativeTable(highRarityItems);

    const results = [];

    // 最初の9回：通常抽選
    for (let i = 0; i < 9; i++) {
        results.push(drawItem(normalTable));
    }

    // 最後の1回：高レア確定
    results.push(drawItem(highRarityTable));

    // 表示遅延を管理
    let currentDelay = 0;

    // 1行ずつ順に表示
    results.forEach((item, i) => {
        const isHighRarity = item.rarity === "ultra-rare" || item.rarity === "super-super-rare";

        // 演出前 (i+1回目として表示)
        setTimeout(() => {
            button.textContent = `${i + 1}回目...`;
            button.classList.add("disabled-button");
            button.disabled = true;

            // 高レアリティの出現の前に確定演出を挿入
            if (isHighRarity) {
                const sparkleBefore = document.createElement("p");
                sparkleBefore.textContent = "✨✨✨ ！！！高レア登場！！！ ✨✨✨";
                sparkleBefore.classList.add("sparkle-banner");
                resultArea.appendChild(sparkleBefore);
            }
        }, currentDelay);

        // 演出後の追加表示（高レアのみ追加で待つ）
        const displayItemDelay = currentDelay + (isHighRarity ? 500 : 0);

        setTimeout(() => {
            const p = document.createElement("p");
            const shortRarity = rarityShortMap[item.rarity] || "??";
            if (item.rarity === "ultra-rare") {
                p.textContent = `【${shortRarity}】✨✨${item.name}✨✨`;
            } else {
                p.textContent = `【${shortRarity}】${item.name}`;
            }
            //rarityに応じてスタイルを付与
            p.classList.add(item.rarity);
            //ガチャ結果を表示
            resultArea.appendChild(p);

            //ultra-rareの後にも✨✨✨✨✨✨を挿入
            if (isHighRarity) {
                const sparkleAfter = document.createElement("p");
                sparkleAfter.textContent = "✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨";
                sparkleAfter.classList.add("sparkle-banner");
                resultArea.appendChild(sparkleAfter);
            }
        }, displayItemDelay);

        // 次の表示までの時間を加算（通常表示300ms + 高レアはさらに500ms）
        currentDelay = displayItemDelay + 300;
    });

    // 全ての表示が終わったあとにボタンを有効化
    setTimeout(() => {
        button.disabled = false;
        button.classList.remove("disabled-button");
        button.textContent = "ガチャをまわす！";

    //ガチャ表示後にボタンを表示
    document.getElementById("actions").style.display = "block";

    }, currentDelay);

}

//ガチャを読み込み
loadGachaData();

// 改良版：排出率を表示する
function showRarityRates(weights) {
    if (!weights || Object.keys(weights).length === 0) {
        alert("排出率データがありません。");
        return;
    }

    const rarityOrder = [
        "normal",
        "rare",
        "super-rare",
        "super-super-rare",
        "ultra-rare",
        "nori-rare"
    ];

    const total = Object.values(weights).reduce((sum, val) => sum + val, 0);

    const lines = rarityOrder
        .filter(rarity => weights[rarity] !== undefined)
        .map(rarity => {
            const percent = (weights[rarity] / total * 100).toFixed(2);
            const short = rarityShortMap[rarity] || rarity;
            return `【${short}】${percent}%`;
        });

    alert("レアリティごとの排出率：\n\n" + lines.join("\n"));
}


//結果を画像として保存（html2canvas必須）
function downloadResultAsImage() {
    const resultArea = document.getElementById("results");

    // クラスを追加（画像用スタイル）
    resultArea.classList.add("results-for-image");

    // CSS反映待ち（100ms程度）
    setTimeout(() => {

        html2canvas(resultArea).then(canvas => {
            const link = document.createElement("a");

            // 日付と時刻の取得
            const now = new Date();
            const yyyy = now.getFullYear();
            const mm = String(now.getMonth() + 1).padStart(2, '0');
            const dd = String(now.getDate()).padStart(2, '0');
            const hh = String(now.getHours()).padStart(2, '0');
            const min = String(now.getMinutes()).padStart(2, '0');
            const ss = String(now.getSeconds()).padStart(2, '0');

            const timestamp = `${yyyy}-${mm}-${dd}_${hh}${min}${ss}`;

            link.download = `gacha_result_${timestamp}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();

            //クラスを外す（元の状態に戻す）
            resultArea.classList.remove("results-for-image");

        });

    }, 100);
}

//結果をテキストでコピー（Clipboard API）
function copyResultAsText() {
    const resultArea = document.getElementById("results");
    const lines = Array.from(resultArea.querySelectorAll("p")).map(p => p.textContent);
    const text = `ホワイティ帝国10連ガチャの結果\n\n` + lines.join("\n") + "\n\n#ホワイティ帝国 #ホワイ帝10連";

    navigator.clipboard.writeText(text)
        .then(() => alert("結果をコピーしました！SNSで貼り付けてみよう！"))
        .catch(err => alert("コピーに失敗しました：" + err));
}