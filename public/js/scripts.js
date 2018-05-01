const randomColorGenerator = (event) => {
  event.preventDefault();
  for (let i = 0; i < 5; i++) {
    const color =  '#' + Math.floor(Math.random()*16777215).toString(16);
    const palletes = $('article').get();
    const hexText = $('h2').get();
    if(!$(palletes[i]).hasClass('lock')) {
      $(palletes[i]).css('background-color', color);
      $(hexText[i]).text(color);
    }
  }
}

const toggleLock = (event) => {
  const pallete = event.target.closest('article');
  $(pallete).toggleClass('lock');
}

$('.palette_generator').on('click', randomColorGenerator);
$('.lock').on('click', toggleLock);

