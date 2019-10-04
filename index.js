const getByClass = className => document.getElementsByClassName(className)[0];

const changeParent = (element, newParent, afterTransitionCallback) => {
  const getRect = () => ({ x: element.offsetLeft, y: element.offsetTop });
  const withReflow = fn => {
    fn();
    element.getClientRects();
  };

  const oldRect = getRect();
  withReflow(() => newParent.appendChild(element));

  const newRect = getRect();
  withReflow(
    () =>
      (element.style.transform = `translate(${oldRect.x -
        newRect.x}px, ${oldRect.y - newRect.y}px)`)
  );
  element.style.transition = "all 400ms";
  element.style.transform = "";
  setTimeout(afterTransitionCallback, 500);
};

const hideLayer = layer => {
  layer.style.visibility = "hidden";
  layer.style["z-index"] = 0;
};
const showLayer = layer => {
  layer.style.visibility = "visible";
  layer.style["z-index"] = 100;
};

const mainText = getByClass("main-text");

const layer1 = getByClass("layer-1");
const showMoreButton = getByClass("layer-1__show-more-button");
const layer1MainTextContainer = getByClass("layer-1__main-text-container");

const layer2 = getByClass("layer-2");
const layer2MainTextContainer = getByClass("layer-2__main-text-container");

showMoreButton.onclick = () => {
  showMoreButton.style.opacity = 0;
  showLayer(layer2);
  changeParent(mainText, layer2MainTextContainer, () => hideLayer(layer1));
};
