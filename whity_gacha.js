//ガチャデータをフラットな配列に変換
function flattenGroupedData(data) {
    const result = [];

    for (const rarity in data.items) {
        const weight = data.weights[rarity] ?? 1; // 未定義ならデフォルト1
        data.items[rarity].forEach(name => {
            result.push({ name, rarity, weight });
        });
    }

    return result;
}

//ガチャのデータを読み込む
let gachaItems = [];

async function loadGachaData() {
    const button = document.getElementById("gachaButton");

    try {
        const response = await fetch("whity_gachaData.json");
        if (!response.ok) {
            throw new Error("ネットワークエラー");
        }
        const rawData = await response.json();
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
function buildWeightedTable(items) {
    let table = [];
    items.forEach(item => {
        for (let i = 0; i < item.weight; i++) {
            table.push(item);
        }
    });
    return table
}

// 重み付きで1つ抽選
function drawItem(weightedTable) {
    const index = Math.floor(Math.random() * weightedTable.length);
    return weightedTable[index];
}

// 10連ガチャを実行
function runGacha() {
    const button = document.getElementById("gachaButton");
    button.disabled = true;

    const resultArea = document.getElementById("results");
    resultArea.innerHTML = ""; // 前回の結果を消す

    const table = buildWeightedTable(gachaItems);

    // 確定枠用：高レアだけのテーブルを作成
    const highRarityItems = gachaItems.filter(item =>
        item.rarity === "super-rare" ||
        item.rarity === "super-super-rare" ||
        item.rarity === "ultra-rare"
    );
    const highRarityTable = buildWeightedTable(highRarityItems);

    const results = [];

    // 最初の9回：通常抽選
    for (let i = 0; i < 9; i++) {
        results.push(drawItem(table));
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
    }, currentDelay);
}

//ガチャを読み込み
loadGachaData();