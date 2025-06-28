// 最初の単語リスト
let words = ["しりとり", "りんご", "りすにんぐ", "りくち", "りょくちゃ", "りかけいのおとこ", "りんがーはっと", "りこりす", "りつりょう", "りなっくす"];
//ランダムに単語を1つ選ぶ
let current = words[Math.floor(Math.random() * words.length)];
// 正解数を記録
let score = 0;
// 失敗を記録
let misses = 0;
const maxScore = 5; // 5回の正解でクリア
const maxMisses = 3; // 3回の失敗でゲームオーバー
// 使用済みの単語リスト
let usedWords = [current.toLowerCase()]; // 最初の単語も使ったことにする
// 小さい文字→大きい文字の変換マップ
const smallToLarge = {
    "ぁ": "あ", "ぃ": "い", "ぅ": "う", "ぇ": "え", "ぉ": "お",
    "ゃ": "や", "ゅ": "ゆ", "ょ": "よ",
    "っ": "つ", "ゎ": "わ", "ゐ":"い", "ゑ":"え", "ヰ":"い", "ヱ":"え",
    "が":"か", "ぎ":"き", "ぐ":"く", "げ":"け", "ご":"こ",
    "ざ":"さ", "じ":"し", "ず":"す", "ぜ":"せ", "ぞ":"そ",
    "だ":"た", "ぢ":"ち", "づ":"つ", "で":"て", "ど":"と", 
    "ば":"は", "び":"ひ", "ぶ":"ふ", "べ":"へ", "ぼ":"ほ", 
    "ぱ":"は", "ぴ":"ひ", "ぷ":"ふ", "ぺ":"へ", "ぽ":"ほ", 
};

// ルール説明
let originalCurrent = current; // 変換前の文字列を保持
current = current.replace(/[ぁぃぅぇぉゃゅょっゎがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゐゑヰヱ]/g, ch => smallToLarge[ch]); // 小文字・濁音・半濁音などの文字列を変換
let input = prompt(`最後の文字から始まる単語を平仮名で答えてね。\n3回失敗したり「ん」がついたらゲームオーバー。\n一度使った単語はもう使えないよ。\n\n最初の単語は${originalCurrent}だよ。\n${current[current.length -1]}で始まる次の単語を入力してね。\n\n5問正解でクリアだよ。\n（現在スコア：${score}点/ミス：${misses}）`);

let currentLastChar = "";
while (score < maxScore && misses < maxMisses){
    if (input === null) {
        alert("ゲーム終了！おつかれさま！");
        break;
    }
    // currentの末尾から「ー」以外の文字を探す
    for (let i = current.length - 1; i >= 0; i--) {
        if (current[i] !== "ー") {
            currentLastChar = current[i];
            break;
        }
    }
    if (!/^[ぁ-んー]+$/.test(input)) {
        alert("ひらがなだけで入力してね！");
        input = prompt(`最後の文字から始まる単語を平仮名で答えてね。\n前の単語は${originalCurrent}だよ。\n${currentLastChar}で始まる次の単語を入力してね。\n（現在スコア：${score}点/ミス：${misses}）`);
        continue;
    }
    let originalInput = input; // 変換前の文字列を保持
    input = input.replace(/[ぁぃぅぇぉゃゅょっゎがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゐゑヰヱ]/g, ch => smallToLarge[ch]); // 小文字・濁音・半濁音などの文字列を変換
    if (!input || input.length < 1) {
        alert("1文字以上の単語を入力してね！");
        input = prompt(`最後の文字から始まる単語を平仮名で答えてね。\n前の単語は${originalCurrent}だよ。\n${currentLastChar}で始まる次の単語を入力してね。\n（現在スコア：${score}点/ミス：${misses}）`);
        continue;
    }
    if (input[0] === "ん" || input[0] === "ー") {
        alert("「ん」「ー」で始まる単語は使えないよ！");
        input = prompt(`最後の文字から始まる単語を平仮名で答えてね。\n前の単語は${originalCurrent}だよ。\n${currentLastChar}で始まる次の単語を入力してね。\n（現在スコア：${score}点/ミス：${misses}）`);
        continue;
    }
    if (usedWords.includes(input.toLowerCase())) {
        alert("その単語は既に使われているよ。使っていない単語で答えてね！")
        input = prompt(`最後の文字から始まる単語を平仮名で答えてね。\n前の単語は${originalCurrent}だよ。\n${currentLastChar}で始まる次の単語を入力してね。\n（現在スコア：${score}点/ミス：${misses}）`);
        continue;
    }
    let lastChar = "";
    for (let i = input.length -1; i >= 0; i--) {
        if (input[i] !== "ー") {
            lastChar = input[i];
            break;
        }
    }
    if (input[0].toLowerCase() === currentLastChar.toLowerCase()) {
        if (lastChar.toLowerCase() === "ん") {
            alert("残念！「ん」がついたからゲームオーバー！");
            break;
        }
        alert("正解！");
        usedWords.push(input.toLowerCase());
        originalCurrent = originalInput;
        current = originalInput.replace(/[ぁぃぅぇぉゃゅょっゎがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゐゑヰヱ]/g, ch => smallToLarge[ch]);
        score++;
        // 正解時のみ次の問題へ進む
        input = prompt(`最後の文字から始まる単語を平仮名で答えてね。\n前の単語は${originalCurrent}だよ。\n${lastChar}で始まる次の単語を入力してね。\n（現在スコア：${score}点/ミス：${misses}）`);
    } else {
        alert("最初の文字が違うよ！");
        misses++;
        // 間違えた場合は前の単語・頭文字をそのまま表示して再入力
        input = prompt(`最後の文字から始まる単語を平仮名で答えてね。\n前の単語は${originalCurrent}だよ。\n${currentLastChar}で始まる次の単語を入力してね。\n（現在スコア：${score}点/ミス：${misses}）`);
    }
}
if (score >= maxScore) {
    alert("クリア！おめでとう！");
} else if (misses >= maxMisses) {
    alert("ゲームオーバー！");
}