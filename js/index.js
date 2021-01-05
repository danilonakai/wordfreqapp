var result = [];

$('#check').click(function(){
    let content = $('#content-input').val();
    let lowercase = content.toLowerCase();
    let paragraphs = lowercase.split("\n\n" );

    $(paragraphs).each(function(p){
        words = paragraphs[p].split(" ");

        $(words).each(function(w){
            word = words[w];
            check_duplicate_words(text_processing(word));
        });
    });

    show_result(paragraphs.length);
});

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

    $(result).each(function(i){
        if(result[i].word == word){
            duplicate = true;
            result[i].counter = result[i].counter + 1;
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

    $(result).each(function(e){
        words = words += result[e].counter;
        characters = characters += (String(result[e].word).length * result[e].counter);
        word_counter = word_counter + '<li><strong>'+result[e].word+'</strong><span>'+result[e].counter+'</span></li>'; 
    });

    $('#words span').html(words);
    $('#characters span').html(characters);
    $('#paragraphs span').html(paragraphs);
    $('#word-counter').html(word_counter);
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