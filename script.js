// CSVを配列に格納する
$(function(){
  $('#button_convert').click(function(){
    //改行ごとに配列化
    let rawText = $('#area_input').val()

// 修正案。
// 変換かけた時点でrawTextではない
// rawTextはconstとして
// 変換後のやつは convertedText1とかにしたほうがいい

        .replace(/"url","Title","Priority","Change frequency"\n/g,'')//タイトル行を消す
        .replace(/,[^,]*,[^,]*(\n|$)/g, '$1');//priorityとfrequencyを消す。
    let arr = rawText.split('\n');  // 1行ずつ1次元配列に変換
    //1次元配列を2次元配列に変換
    let res = [];
    let convertedText = '';
    for (let i = 0; i < arr.length; i++ ){
        if (arr[i] == '') break; //空白行が出てきた時点で終了
        arr[i] = arr[i].replace(/^\"(.*)\"$/g,'$1'); //最初と最後のクォートを消す
        res[i] = arr[i].split('\",\"'); // "," ごとに配列化。{url, title} になる

// この時点で、Converter側でsortかけられるので、かけてしまおう。その方が後々の手間が減る

        res[i].push(res[i][0]); // urlを末尾に追加
        res[i][2] = res[i][2].replace(/([^\/])\/([^(\/|\n\$)])/g,'$1\/\t$2');  //url列をスラッシュで区切る
// 
// ここで大きな変更をしてみたい
// 
// +---------------------------------------------------+
// |Title|_____|_____|example.com    |example.com|  |  |
// |     |Title|_____|example.com/a  |example.com|/a|  |
// |     |     |Title|example.com/a/b|example.com|/a|/b|
// |     |     |Title|example.com/a/c|example.com|/a|/c|
// +---------------------------------------------------+
// 
// 実はこの形式のほうが見やすかったりする？
// Gsheet側も、「こうだったら罫線を」みたいな条件付き書式をうまく設定でできれば、実は何とかなる可能性がある
  // 変換公式の方で、空きセルに特定の文字列を入れておいて、
  // GSheetでは「この文字列が入っていたら…」という条件にするといけるかも…？
// 
        convertedText += res[i][0]  +'\t' + res[i][1]  + '\t' + res[i][2] + '\n';  //タブ区切りテキスト化する
      }
      $('#area_output').val(convertedText);
      console.log('Converted!');
  });
});

// メッセージを出す
function showMsg(){
  msgBox = document.createElement('div');
  // msgBox.attr('id','message');
  msgBox.id = 'message';
  msgBox.textContent = 'Copied!';
  $('#output').append(msgBox);
}
// メッセージを消す
function msgFadeOut(){
  // msgBox.style.cssText+='opacity: 0;
  $('#message').fadeOut();
}
function removeMsg() {
  $('#message').remove();
}

// コピーボタンを押すと、右のテキストエリアが全選択され、コピー。
// コピーされました のメッセージが出て、その後自動的に消える
$(function(){
  $('#button_copy').click(function(){
    // 全選択してコピー
    $('#area_output').select();
    document.execCommand('copy');
    // メッセージが出て、消える
    showMsg();
    setTimeout('msgFadeOut()', 1000);
    setTimeout('removeMsg()', 2000);
  });
});

// Clear #area_input
$(function(){
  $('#button_clear').click(function(){
    $('#area_input').val('');
  });
});