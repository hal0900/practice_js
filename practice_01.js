function guessNumberGame() {
// 数当てゲーム
// 1〜100のランダムな数を当てるゲームです

  const answer = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;

  while (true) {
    const guess = prompt('1〜100の数字を入力してください:');
    if (guess === null) {
      alert('ゲームを終了します。');
      break;
    }
    const num = Number(guess);
    attempts++;
    if (isNaN(num) || num < 1 || num > 100) {
      alert('1〜100の数字を入力してください。');
      continue;
    }
    if (num === answer) {
      alert(`正解です！${attempts}回目で当たりました。`);
      break;
    } else if (num < answer) {
      alert('もっと大きい数字です。');
    } else {
      alert('もっと小さい数字です。');
    }
  }

}