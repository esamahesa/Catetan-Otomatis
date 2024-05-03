const input = document.querySelector('#input');
const button = document.querySelector('.button');

const bankWD = {
    BCA1: { nama: "EKA SEPTI ANGGRAENI", noRek: "8305527340" },
    BCA2: { nama: "SUARDI", noRek: "8300249737" },
    BCA3: { nama: "RIO SAGITA", noRek: "6470633717" },
    BCA4: { nama: "SYAHLANI", noRek: "1672505423" },
    BCA9: { nama: "DIDI SETIADI", noRek: "3432351944" },
    MANDIRI1: { nama: "MULYANA", noRek: "1210012031419" },
    MANDIRI5: { nama: "FADLY S", noRek: "1060017066195" },
    BNI1: { nama: "GERADUS SUHERLAN KOWOT", noRek: "1798904975" },
    BNI5: { nama: "YULIANTO D SATRIAWAN", noRek: "1731309577" },
    BRI2: { nama: "NURSHOFA", noRek: "033201158398508" }
};

function validateAmount(string){
    const numberAfterDot = string.indexOf('.') !== -1 ? string.slice(string.indexOf('.') + 1, string.indexOf(' ') !== - 1 ? string.indexOf(' ') : string.length) : null;
    const printZero = (str)=>{
        console.log(string.length, str, numberAfterDot)
        switch(str.length){
            case 1:
                return '00.000';
            case 2:
                return '0.000';
            case 3:
                return '.000';
        }
    }

    const amount = typeof numberAfterDot === 'string' ? string + printZero(numberAfterDot) : string + '.000.000';
    return amount;
}

function convertInput(input, bankWD){
    const stringPool = input.split(', ');
    const firstSentence = `MASUK DANA KE **${stringPool[0]}** => **${validateAmount(stringPool[1])}**;`;
    const secondSentence = `KIRIM KE **${stringPool[2].toUpperCase()} WD ROMA ${bankWD[stringPool[2].toUpperCase()].nama}**`;
    const lastSentence = `${bankWD[stringPool[2].toUpperCase()].noRek}`;
    return [firstSentence, secondSentence, '```', lastSentence, '```'];
};

function funcClick(){
    const resultSection = document.querySelector('.result-section');
    const convertingInput = convertInput(input.value, bankWD);
    if(resultSection.style.display === '') resultSection.style.display = 'block';

    let textCopy = '';
    for(let i = 0; i < convertingInput.length; i++){
        if(resultSection.children.length < 6){
            const elementP = document.createElement('p');
    
            resultSection.appendChild(elementP);
            elementP.innerHTML = convertingInput[i];
        } else{
            const childResultSection = resultSection.children[i];
            childResultSection.innerHTML = convertingInput[i];
        }
        textCopy += convertingInput[i] + '\n';
    };

    const copyTextToClipBoard = ()=>{
        let temptTextArea = document.createElement('textarea');
        temptTextArea.value = textCopy;
        document.body.appendChild(temptTextArea);
        temptTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(temptTextArea);
        alert('Teks telah disalin!');
    };

    if(document.querySelector('.copy') === null){
        const copyElement = document.createElement('div');
        copyElement.classList.add('copy');
        copyElement.innerHTML = 'Copy';
        resultSection.appendChild(copyElement);

        copyElement.addEventListener('click', copyTextToClipBoard);
    } else {
        const removeCopyElement = document.querySelector('.copy');
        removeCopyElement.remove();

        const copyElement = document.createElement('div');
        copyElement.classList.add('copy');
        copyElement.innerHTML = 'Copy';
        resultSection.appendChild(copyElement);

        copyElement.addEventListener('click', copyTextToClipBoard);
    };
};

button.addEventListener('click', funcClick);