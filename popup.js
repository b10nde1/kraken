let siteMapFile=document.getElementById('siteMapFile');

siteMapFile.onchange=function(activeTab){
    let input = event.target;
    let reader = new FileReader();
    let searchKey=document.getElementById('searchKey').value;
    reader.onload = function(){
        let dataURL = reader.result;
        document.getElementById("code-to-scan").innerHTML=dataURL;
        scanDocument(searchKey);
    };
    let result = reader.readAsText(input.files[0]);
}

const scanDocument=(argIn)=> {
    let listLoc=document.getElementsByTagName('loc');
    let arg=argIn.split('/*/');
    let result='';
    let total=0;
    for(var comptArg=0;comptArg<arg.length;comptArg++){
        let tempCheck=0;
        let tempArg=arg[comptArg];
        for(var comptlistLoc=0;comptlistLoc<listLoc.length;comptlistLoc++){
            let tempListLoc=listLoc[comptlistLoc].innerText;
            if(tempArg===tempListLoc){
                tempCheck=1;
            }
        }
        if(tempCheck==0){
            console.log(tempArg);
            result+='<p>'+tempArg+'</p>';
            total++;
        }
    }
    document.getElementById('total-mapping').innerHTML=arg.length;
    document.getElementById('total-result').innerHTML=total;
    document.getElementById('result').innerHTML=result;
    copyElement(document.getElementById('result'));
}

const displayResut=(arg)=>{
    document.getElementById("result").innerHTML=arg;
    copyElement(document.getElementById("result"));
}

const copyElement=(el)=>{
    let body = document.body, range, sel;
    if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
            range.selectNodeContents(el);
            sel.addRange(range);
        } catch (e) {
            range.selectNode(el);
            sel.addRange(range);
        }
    } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
    document.execCommand("Copy");
}
