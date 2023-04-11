'use strict'
{
const area_input = document.getElementById('area_input');
const area_output = document.getElementById('area_output');
const button_clear = document.getElementById('button_clear');
const button_convert = document.getElementById('button_convert');
const button_copy = document.getElementById('button_copy');
const output = document.getElementById('output');

button_convert.addEventListener('click', () => {
    const rawText = area_input.value;
    const rawTextWithoutHeading = rawText
        .replace(/"url".*\n/,''); //タイトル行を消す
    let arr1 = rawTextWithoutHeading
        .split('\n'); // 1行ずつ配列に格納する
    arr1.sort();  // ソートする（＝URL順になる）
    let convertedText = 'URL\tTitle\tRoot\tL2\tL3\tL4\tL5\n'; //ヘッダ行
    for (let i = 0; i < arr1.length; i++ ){
        if (arr1[i] !== ''){ //空白行以外
        arr1[i] = arr1[i].replace(/^\"(.*)\"$/g,'$1'); //最初と最後のクォートを消す
        let arr2 = arr1[i].split('\",\"') // "," ごとに配列化。{url, title} になる
        arr2.splice(2, arr2.length - 2); //URLとTitle以外を削除
        arr2.push(arr2[0]); // URLを複製して末尾に追加
        arr2[2] = arr2[2].replace(/([^\/])\/([^(\/|\n\$)])/g,'$1\/\t$2');  //末尾の方のURLに、スラッシュごとにtab文字を挿入
        convertedText += arr2[0]  +'\t' + arr2[1]  + '\t' + arr2[2] + '\n';  //タブ区切りテキスト化する
        }
    }
    area_output.value = convertedText;
});

button_clear.addEventListener('click', () => {
    area_input.value = '';
});

button_copy.addEventListener('click', () => {
    navigator.clipboard.writeText(area_output.value);
    const msgBox = document.createElement('div');
    msgBox.id = 'message';
    msgBox.textContent = 'Copied!';
    output.appendChild(msgBox);
    setTimeout(() => {
        msgBox.remove();
    }, 1000);
});

}//use strict