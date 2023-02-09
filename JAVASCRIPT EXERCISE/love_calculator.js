prompt("What Is Your Name ? ");
prompt("What Is Your Lovebird Name ? ");

var loveScore = Math.random() * 100;
loveScore = Math.floor(loveScore) * 1;

if (loveScore >= 70) {
    
    window.alert('Your Love Score Is ' + loveScore + ' Your are Lovebird Champion');

} else if(loveScore < 70 && loveScore === 50){
    
    window.alert('You Are Suck : ' + loveScore);

}
