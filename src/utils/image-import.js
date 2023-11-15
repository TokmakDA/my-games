
function importAll(r) {
  let imagesArr = {};
  r.keys().forEach((item, index) => {
    imagesArr[item.replace('./', '')] = r(item);
  });

  const filterImage = (fragment) =>
    Object.keys(imagesArr)
      .filter((key) => key.includes(fragment) && imagesArr)
      .sort()
      .map((key) => {
        return { name: key, src: imagesArr[key] };
      });

  const front = filterImage('simpsons-card-img');
  const shirt = filterImage('simpsons-card-shirt');
  const bgImg = filterImage('bg-image');

  return { imagesArr, front, shirt, bgImg };
}
export const simpsons = importAll(
  require.context('../images/simpsons/', false, /\.(png|jpe?g|svg)$/),
);

