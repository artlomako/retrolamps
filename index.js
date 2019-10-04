const getByClass = className => document.getElementsByClassName(className)[0];

const hide = (...elements) =>
  elements.forEach(element => (element.style.opacity = 0));

const show = (...elements) =>
  elements.forEach(element => (element.style.opacity = 1));

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

const background = getByClass("background");
const backButton = getByClass("back-button");
const mainText = getByClass("main-text");

const layer1 = getByClass("layer-1");
const layer1MainTextContainer = getByClass("layer-1__main-text-container");
const layer1GalleryControls = getByClass("layer-1__gallery-controls");

const showMoreButton = getByClass("layer-1__show-more-button");

const layer2 = getByClass("layer-2");
const layer2MainTextContainer = getByClass("layer-2__main-text-container");
const layer2Description = getByClass("layer-2__description");
const askForPriceButton = getByClass("ask-for-price-button");

showMoreButton.onclick = () => {
  hide(showMoreButton, layer1GalleryControls);
  showLayer(layer2);
  show(layer2Description, askForPriceButton, backButton);
  changeParent(mainText, layer2MainTextContainer, () => hideLayer(layer1));
  background.classList.add("background--extended-border");
};
