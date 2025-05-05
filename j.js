let topicJson = null;
let topicId = 0;
class Page {
    constructor() {
        this.topic = document.getElementById("topic");
        this.box = document.getElementById("box");
        this.answer = document.getElementById("answer");
        this.score = document.getElementById("score");
        this.btnNext = document.getElementById("btnNext");
        this.btnNext.addEventListener("click", function () { 
            topicId++;
            setTopic(topicJson["all"][topicId]);
        });
        
    }
    func1() { console.log('test') }
}
let page = new Page();
function gameBegin() {
    fetch("ti.json")
        .then(response => { return response.json(); })
        .then(file => {
            console.log(file["all"][topicId]['topic']);
            topicJson = file;
            setTopic(file["all"][topicId]);
        })
}

function setTopic(TCA) {
    page.topic.innerHTML = `题目:${TCA['topic']}`;
    page.box.innerHTML = '';
    let peace = document.createDocumentFragment();

    Object.values(TCA['content']).forEach(v => {
        let block = document.createElement('div');
        block.className = "block";
        block.textContent = v;
        block.addEventListener("click", function (e) {
            console.log("click");
        });
        peace.appendChild(block);
    });
    page.box.appendChild(peace);
}

gameBegin()