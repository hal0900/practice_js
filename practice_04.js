//占いゲーム
function runFortuneGame() {
    //ユーザーネームを入力
    let userName = prompt("あなたの名前を入力してください。");

    while (!userName) {
        //キャンセルを押した場合は終了する
        if (userName === null) {
            alert("キャンセルされました。占いを終了します。");
            return;
        }

        userName = prompt("何も入力されていません。\nあなたの名前を入力してください。");

    }

    //重み付き運勢の候補
    const fortunes = [
        "はらぱん", //とても出にくい
        "大ホワイティ", "大ホワイティ",  //出にくい
        "末ホワイティ", "末ホワイティ", "末ホワイティ", //やや出にくい
        "中ホワイティ", "中ホワイティ", "中ホワイティ", "中ホワイティ",  // やや出やすい
        "小ホワイティ", "小ホワイティ", "小ホワイティ", "小ホワイティ", "小ホワイティ",  // 出やすい
        "ホワイティ", "ホワイティ", "ホワイティ", "ホワイティ", "ホワイティ", "ホワイティ" // 出やすい
    ];

    //名前と日付に応じた一定の数値を取得
    function getTodaySeed(userName) {
        const today = new Date().toDateString();
        let combined = userName + today;
        let hash = 0;

        for (let i = 0; i < combined.length; i++) {
            hash = (hash * 31 + combined.charCodeAt(i)) % 1000000;
        }

        return hash;
    }

    //決定的に選ぶ
    const seed = getTodaySeed(userName);
    const index = seed % fortunes.length;
    const result = fortunes[index];

    //結果ごとにメッセージを表示する
    let message = "";

    switch (result) {
        case "大ホワイティ":
            message = "最高のホワイティになるでしょう！";
            break;
        case "中ホワイティ":
            message = "なかなか良いホワイティになりそうです。";
            break;
        case "小ホワイティ":
            message = "少しホワイティなことがあるかも。";
            break;
        case "ホワイティ":
            message = "平穏無事なホワイティでしょう。";
            break;
        case "末ホワイティ":
            message = "まあまあホワイティな感じです。";
            break;
        case "はらぱん":
            message = "今日はちょっと注意が必要かも…。";
            break;
        default:
            message = "占いに失敗しました。";
            break;
    }

    //結果表示
    alert(userName + "さんの今日の運勢は…「" + result + "」です。\n" + message);
}