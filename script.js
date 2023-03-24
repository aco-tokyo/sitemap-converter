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
    const TrimmedRawText = rawText
        //  あれ？ 実はタイトル行は消さなくても良いのでは？
        .replace(/"url","Title","Priority","Change frequency"\n/g,'') //タイトル行を消す
        .replace(/,[^,]*,[^,]*(\n|$)/g, '$1'); //priority列とfrequency列を消す
    let arr1 = TrimmedRawText
        .split('\n'); // 1行ずつ配列に格納する
    arr1.sort();  // ソートする（＝URL順になる）
    let arr2 = [];
    let convertedText = '';
    for (let i = 0; i < arr1.length; i++ ){
        arr1[i] = arr1[i].replace(/^\"(.*)\"$/g,'$1'); //最初と最後のクォートを消す
        arr2[i] = arr1[i].split('\",\"') // "," ごとに配列化。{url, title} になる
        arr2[i].push(arr2[i][0]); // urlを複製して末尾に追加
        arr2[i][2] = arr2[i][2].replace(/([^\/])\/([^(\/|\n\$)])/g,'$1\/\t$2');  //url列をスラッシュで区切る
        convertedText += arr2[i][0]  +'\t' + arr2[i][1]  + '\t' + arr2[i][2] + '\n';  //タブ区切りテキスト化する
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