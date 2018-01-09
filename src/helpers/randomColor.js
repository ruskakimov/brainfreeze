const colors = [
  'black',
  'white',
  'red',
  'purple',
  'green',
  'yellow',
  'blue',
  'orange'
];

const randIndex = len => {
  return Math.floor(Math.random() * len);
};

const getRandomColor = () => {
  return colors[randIndex(colors.length)];
};

const getRandomColorPair = (prevColor1 = null, prevColor2 = null) => {
  const new_pair = [getRandomColor(), getRandomColor()];
  while (prevColor1 === new_pair[0] && prevColor2 === new_pair[1]) {
    new_pair[0] = getRandomColor();
    new_pair[1] = getRandomColor();
  }
  return new_pair;
};

export default getRandomColorPair;
