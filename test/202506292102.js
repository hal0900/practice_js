//1
let day = '火';

switch (day) {
  case '月':
  case '火':
  case '水':
  case '木':
  case '金':
    console.log('平日です'); // 月〜金→平日
    break;
  case '土':
  case '日':
    console.log('休日です'); // 土日→休日
    break;
  default:
    console.log('不明な曜日です'); // 問題にはない処理だが、念のため
}

//2
let weather = '雨';

switch (weather) {
  case '晴れ':
    console.log('洗濯日和です');
    break;
  case '雨':
    console.log('傘を忘れずに');
    break;
  case '雪':
    console.log('防寒対策を忘れずに');
    break;
  default:
    console.log('天気不明');
}

//3
let grade = 2;

switch (grade) {
  case 1:
    console.log('1年生です');
    break;
  case 2:
    console.log('2年生です');
    break;
  case 3:
    console.log('3年生です');
    break;
  default:
    console.log('学年不明');
}

//4
let number = 3;

switch (number) {
  case 1:
    console.log('一');
    break;
  case 2:
    console.log('二');
    break;
  case 3:
    console.log('三');
    break;
  default:
    console.log('対応外');
}

//5
let menu = 'カレー';

switch (menu) {
  case 'カレー':
    console.log('500円');
    break;
  case 'うどん':
    console.log('400円');
    break;
  case 'ラーメン':
    console.log('600円');
    break;
  default:
    console.log('メニューにありません');
}

//6
let signal = '青';

switch (signal) {
  case '赤':
    console.log('止まれ');
    break;
  case '黄':
    console.log('注意');
    break;
  case '青':
    console.log('進め');
    break;
  default:
    console.log('信号エラー');
}

//7
let animal = '犬';

switch (animal) {
  case '犬':
    console.log('ワン！');
    break;
  case '猫':
    console.log('ニャー');
    break;
  case '鳥':
    console.log('チュンチュン');
    break;
  default:
    console.log('わかりません');
}

//8
let month = 4;

switch (month) {
  case 3:
  case 4:
  case 5:
    console.log("春");
    break;
  case 6:
  case 7:
  case 8:
    console.log("夏");
    break;
  case 9:
  case 10:
  case 11:
    console.log("秋");
    break;
  case 12:
  case 1:
  case 2:
    console.log("冬");
    break;
  default:
    console.log("不明な月です");
}

//9
let key ="w";

switch (key) {
  case "w":
    console.log("前に進む");
    break;
  case "s":
    console.log("後ろに下がる");
    break;
  case "a":
    console.log("左に移動");
    break;
  case "d":
    console.log("右に移動");
    break;
  default:
    console.log("無効なキー");
}

//10
let classCode = "M";

switch (classCode) {
  case "M":
    console.log("数学");
    break;
  case "E":
    console.log("英語");
    break;
  case "J":
    console.log("国語");
    break;
  case "S":
    console.log("理科");
    break;
  default:
    console.log("不明な教科");
}