const randomColorGenerator = () => {
  event.preventDefault();
  const colors = [];
  for (let i = 0; i < 5; i++) {
    const color =  '#' + Math.floor(Math.random()*16777215).toString(16);
    const palletes = $('article').get();
    $(palletes[i]).css('background-color', color)
  }
}

$('.palette_generator').on('click', randomColorGenerator);


