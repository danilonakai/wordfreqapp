var result = [];

function click_check_btn(){
    let content = document.querySelector('#content-input').value;
    let lowercase = content.toLowerCase();
    let paragraphs = lowercase.split("\n\n" );

    paragraphs.forEach(p=>{
        words = p.split(" ");

        words.forEach(word=>{
            check_duplicate_words(text_processing(word));
        });
    });

    show_result(paragraphs.length);

    if(window.innerWidth <= 500){
        console.log("test");
        window.scrollTo({
            top: document.querySelector('.content .output').offsetTop,
            left: 0,
            behavior: 'smooth'
        });
    }
}

function text_processing(word){
    converted = word
                    .replace("...","")
                    .replace(".","")
                    .replace(",","")
                    .replace("?","")
                    .replace("!","")
                    .replace(":","")
                    .replace(";","")
                    .replace('"',"")
                    .replace("”","")
                    .replace("'","")
                    .replace("_","")
                    .replace("—","")
                    .replace("-","")
                    .replace("[","")
                    .replace("]","")
                    .replace("{","")
                    .replace("}","")
                    .replace("(","")
                    .replace(")","");

    if(converted.length > 0){
        return converted;
    }   
}

function check_duplicate_words(word){
    let duplicate = false;

    result.forEach(i=>{
        if(i.word == word){
            duplicate = true;
            i.counter = i.counter + 1;
        }
    });

    if(duplicate == false){
        let content = {'word': word, 'counter': 1}
        result.push(content);
    }
}

function show_result(paragraphs){
    let words = 0;
    let characters = 0;
    let word_counter = "";
    result.sort(sort_results);

    console.log(result);

    result.forEach(e=>{
        if(e.word !== undefined){
            words = words += e.counter;
            characters = characters += (String(e.word).length * e.counter);
            word_counter = word_counter + '<li><strong>'+e.word+'</strong><span>'+e.counter+'</span></li>'; 
        }
    });


    document.querySelector('#words span').innerHTML = words;
    document.querySelector('#characters span').innerHTML = characters;
    document.querySelector('#paragraphs span').innerHTML = paragraphs;
    document.querySelector('#word-counter').innerHTML = word_counter;

    result = [];
}

function sort_results(a,b){
    let ac = a.counter;
    let bc = b.counter;
    let comparison = 0;
    
    if (ac < bc) {
        comparison = 1;
    }
    else if (ac > bc) {
        comparison = -1;
    }

    return comparison;
}