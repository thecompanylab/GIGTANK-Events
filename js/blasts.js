function formatTime(date) {
    var
    output  =   [];
    output.push((date.getHours() % 12) || 12);
    output.push(':');
    output.push(('0' + date.getMinutes()).slice(-2));
    output.push(date.getHours() > 11 ? ' p.m.' : ' a.m.');
    return output.join('');
}

function autolink(text) {
    // http://jsfiddle.net/kachibito/hEgvc/1/light/
    return text.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g,"<a href='$1'>$1</a>");
}

function loadBlasts(){
    var 
    blastsRaw = JSON.parse(httpGet('http://gtc.colab.co/ccbme'))['blasts'],
    i   =   blastsRaw.length,
    blasts_count    =   i;
    blasts  =   [],
    days    =   [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ],
    months  =   [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    while(i--) {
        var
        blastRaw    =   blastsRaw[i],
        sent    =   new Date(blastRaw['created_at']),
        blast   =   {};  
        if(blastRaw['id'] > 32) {

            //sent.parse(blastRaw['created_at']);
            blast['timestamp'] = sent.getTime();
            blast['time'] = formatTime(sent);
            blast['month']      =   months[sent.getMonth()];
            blast['date']        =   sent.getDate();
            blast['day']        =   days[sent.getDay()];
            blast['id']     =   blastRaw['id'];
            blast['body']   =   blastRaw['body'];
            blast['html']   = autolink(blastRaw['body']);

            blasts.unshift(blast);
        }
    }
    return blasts;
}

function displayBlasts() {
    var
    tmpl        =   document.getElementById('template').innerHTML,
    blastCon     =   document.getElementById('blasts');
    
    
    
    templatedata = {
        'blasts':   loadBlasts()
    };
    blastCon.innerHTML   =   window.Mustache.render(tmpl, templatedata);
}
