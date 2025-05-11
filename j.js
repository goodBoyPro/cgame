let topicJson = null;
let topicId = 0;
let score = 0;
let answer = "";
let finished = new Array();
let local = 0;
let isCurTopicFinished = false;
class Page {
    constructor() {
        this.topic = document.getElementById("topic");
        this.box = document.getElementById("box");
        this.box2 = document.getElementById("box2");
        // this.answer = document.getElementById("answer");
        // this.score = document.getElementById("score");
        this.btnNext = document.getElementById("btnNext");
        this.btnNext.addEventListener("click", function () {
            topicId++;
            if (topicId == topicJson["all"].length) {
                end();
                return;
            }
            let TCA = topicJson["all"][topicId];
            isCurTopicFinished = false;
            setTopic(TCA);
        });
        this.btnReset = document.getElementById("btnReset");
        this.btnReset.addEventListener("click", reset);
        this.btnLook = document.getElementById("btnLook");
        if (local) {
            this.btnOpenfile = document.getElementById("btnOpenFile");
            this.btnOpenfile.addEventListener("change", function (evnet) {
                let file = evnet.target.files[0];
                gameBeginFromBtn(file);
            })
        }

    }
    func1() { console.log('test') }
}
let page = new Page();
function gameBegin() {
    fetch("ti.json")
        .then(response => { return response.json(); })
        .then(file => {
            topicJson = file;
            setTopic(topicJson["all"][topicId]);
            page.btnNext.disabled = false;
            page.btnReset.disabled = false;
            page.btnLook.disabled = false;
            page.btnNext.disabled = false;
            page.btnNext.innerHTML = "下一题";
        })
}
function gameBeginFromBtn(file_) {
    topicJson = null;
    topicId = 0;
    score = 0;
    let reader = new FileReader();
    reader.onload = function (e) {
        topicJson = JSON.parse(e.target.result);
        setTopic(topicJson["all"][topicId]);
    }
    reader.readAsText(file_);
    page.btnNext.disabled = false;
    page.btnReset.disabled = false;
    page.btnLook.disabled = false;
    page.btnNext.disabled = false;
    page.btnNext.innerHTML = "下一题";
}

function setTopic(TCA) {
    reset();

    page.box2.innerHTML = '';
    page.topic.innerHTML = `题目:${TCA['topic']}`;
    page.box.innerHTML = '';
    let peace = document.createDocumentFragment();

    Object.values(TCA['content']).forEach(v => {
        let block = document.createElement('div');
        block.className = "block";
        block.textContent = v;
        block.addEventListener("click", function (e) {
            if (!isCurTopicFinished) {
                let block2 = document.createElement('div');
                block2.className = "block";
                block2.textContent = v;
                answer = answer + v;
                page.box2.appendChild(block2);
                addScore();
            }

        });
        peace.appendChild(block);

    });
    page.box.appendChild(peace);
}
function reset() {
    if (!isCurTopicFinished) {
        page.box2.innerHTML = '';
        answer = "";
    }

}
function end() {
    page.box.innerHTML = "";
    page.box2.innerText = "完成啦~~,\n正在评分~";
    page.btnNext.disabled = true;
    page.btnNext.innerHTML = "已完成";
    setTimeout(function () { page.box2.innerText = `你的分数是：\n${score}`; }, 3000);

}
function addScore() {
    if (compare(topicJson["all"][topicId]["answer"], answer)) {
        score += 10;
        // page.score.innerHTML = `分数:${score}`;
        page.box2.innerHTML = '';
        let a = document.createElement('div');
        a.className = 'block';
        a.textContent = topicJson["all"][topicId]["char"];

        page.box2.appendChild(a);
        isCurTopicFinished = true;

    }

}
function compare(str1, str2) {

    return str1 === str2;
}
if (!local)
    gameBegin()
