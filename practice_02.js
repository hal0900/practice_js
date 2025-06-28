// 単語リスト
const words = [
  "apple", "grape", "lemon", "peach", "mango", "melon", "berry", "olive", "plum", "pearl",
  "chair", "table", "plant", "glass", "spoon", "bread", "cream", "sugar", "honey", "music",
  "about", "above", "abuse", "actor", "begin", "bible", "black", "bonus", "check", "civil",
  "coast", "craft", "draft", "doubt", "devil", "dance", "eagle", "elder", "empty", "extra" 
];
// ランダムに1つ選ぶ
const answer = words[Math.floor(Math.random() * words.length)];
let display = "_".repeat(answer.length).split(""); // 例： ["_", "_", "_", "_", "_"]
let misses = 0;
const maxMisses = answer.length * 3;

while(true) {
    // 現在の状態を表示
    const guess = prompt(`単語： ${display.join(" ")}\n1文字入力してください（ミス：${misses}/${maxMisses}）`);
    if (guess === null) {
        alert("ゲームを終了します。");
        break;
    }
    if (guess.length !== 1) {
        alert("1文字だけ入力してください。");
        continue;
    }
    // アルファベット以外の入力をチェック
    if (!/^[a-zA-Z]$/.test(guess)) {
        alert("アルファベット1文字を入力してください。");
        continue;
    }
    let hit = false;
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === guess && display[i] === "_") {
            display[i] = guess;
            hit = true;
        }
    }
    if (!hit) {
        misses++;
        alert("はずれ！");
    }
    if (display.join("") === answer) {
        alert(`クリア！正解は「${answer}」でした！`);
        break;
    }
    if (misses >= maxMisses) {
        alert(`ゲームオーバー！正解は「${answer}」でした。`);
        break;
    }
}