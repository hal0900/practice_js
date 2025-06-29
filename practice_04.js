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

    //運勢の候補
    let fortunes = ["大ホワイティ", "中ホワイティ", "小ホワイティ", "ホワイティ", "末ホワイティ", "はらぱん"];

    //ランダムに1つ選ぶ
    let randomIndex = Math.floor(Math.random() * fortunes.length);
    let result = fortunes[randomIndex];

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

//ゲーム開始
runFortuneGame();