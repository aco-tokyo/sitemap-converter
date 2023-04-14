'use strict'
{
const area_input = document.getElementById('area_input');
const area_output = document.getElementById('area_output');
const button_clear = document.getElementById('button_clear');
const button_convert = document.getElementById('button_convert');
const button_copy = document.getElementById('button_copy');
const output = document.getElementById('output');

button_convert.addEventListener('click', () => {
    const text_input = area_input.value.trim();
    const array_byLine = text_input.split('\n') // 1行ずつ配列に格納する
    array_byLine.shift(); // ヘッダ行の分を削除
    array_byLine.sort();  // ソートする（＝URL順になる）
    let text_output = `URL\tTitle\tRoot\tL2\tL3\tL4\tL5\tL6`; //新ヘッダ行
    for (let i = 0; i < array_byLine.length; i++ ){
        // if (array_byLine[i] !== ''){ //空白行を無視する
            array_byLine[i] = array_byLine[i].replace(/^\"(.*)\"$/g,'$1'); //最初と最後のクォートを消す
            const array_byComma = array_byLine[i].split('\",\"') // "," ごとに配列化し、[URL, Title, xxx, xxx, ...] を作る
            array_byComma.splice(2, array_byComma.length - 2); //URLとTitle以外を削除し、[URL, Title] だけにする
            array_byComma.push(array_byComma[0]); // URLを複製して末尾に追加
            array_byComma[2] = array_byComma[2].replace(/([^\/])\/([^(\/|\n\$)])/g,'$1\/\t$2');  //末尾の方のURLに、スラッシュごとにtab文字を挿入
            text_output += `\n${array_byComma[0]}\t${array_byComma[1]}\t${array_byComma[2]}\n` //タブ区切りテキスト化する
        // }  
    }
    area_output.value = text_output;
});

button_clear.addEventListener('click', () => {
    area_input.value = '';
});

button_copy.addEventListener('click', () => {
    navigator.clipboard.writeText(area_output.value);
    const div_message = document.createElement('div');
    div_message.id = 'message';
    div_message.textContent = 'Copied!';
    output.appendChild(div_message);
    setTimeout(() => {
        div_message.remove();
    }, 1000);
});

}//use strict