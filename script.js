function buttonClick() {
    // ブラウザで使えない場合は終了
    if (!navigator.clipboard) {
        console.log("このブラウザは対応していません")
        return;
    }
    const title = document.querySelector('[data-testid="issue-title"]').innerText
    // クリップボード書き込み
    navigator.clipboard.writeText(title)
}

// オプション
const options = {
    childList: true,
    characterData: true,
    characterDataOldValue: true,
    attributes: true,
    subtree: true,
}

// DOMの変更を検知した場合のコールバック関数
function domChanged() {
    const title_dom = document.querySelector('[data-testid="issue-title"]')
    if(title_dom){
        const copyButton = title_dom.parentNode.querySelector('button')
        if(!copyButton){
            const button = document.createElement('button')
            button.type = 'button'
            button.onclick = buttonClick
            button.className = 'gg-copy'
            // 最後の子要素として追加
            title_dom.parentNode.appendChild(button)
        }
    }
}

// body以下に変更があった場合に通知
const target = document.querySelector('body');

// DOM変更監視を開始
const observer = new MutationObserver(domChanged);
observer.observe(target, options);

/*
MutationObserverを使わずゴリ押しで書いたコード
*/
/*
window.onload = () => {
    setTimeout(() => {
        const cards = document.querySelectorAll('[data-testid="board-issue-card"]')
        console.log(cards)
        for(const card of cards){
            card.onclick = addButton
        }

        addButton()
    }, "4000")
}

function addButton() {
    console.log("addButton")
    setTimeout(() => {
        const title_dom = document.querySelector('[data-testid="issue-title"]')
        if(title_dom){
            console.log(title_dom)

            // 最後の子要素として追加
            const button = document.createElement('button')
            button.type = 'button'
            button.onclick = buttonClick
            button.className = 'gg-copy'
            console.log(button)
            title_dom.parentNode.appendChild(button)
        }
    }, 2000)
}
*/
