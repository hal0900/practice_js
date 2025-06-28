// かけ算クイズ
// 1〜9の数字を2つランダムに生成し、ユーザーにその積を尋ねるクイズを作成します。
// 正解なら「正解！」、不正解なら「違います。正解は◯◯です」と表示します。
let answer1 = Math.floor(Math.random() * 9) + 1;
let answer2 = Math.floor(Math.random() * 9) + 1;
let attempts = 0;
let correctCount = 0;

while (true) {

    const guess = prompt(`${answer1} * ${answer2} の答えは何でしょう？`)
    if (guess === null) {
        alert(`ゲームを終了します。あなたは${attempts}問に挑戦し、合計で${correctCount}問正解しました。`);
        break;
    }
    const num = Number(guess);
    if (isNaN(num)) {
        alert(`数字を入力してください。`);
        continue;
    }
    attempts++;
    if (num === answer1 * answer2) {
        correctCount++;
        alert(`正解！あなたは今${correctCount}問正解しています。`);
    } else {
        alert(`違います。正解は${answer1 * answer2}です。`);
    }
    answer1 = Math.floor(Math.random() * 9) + 1;
    answer2 = Math.floor(Math.random() * 9) + 1;
}
