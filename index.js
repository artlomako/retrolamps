const getByClass = className => document.getElementsByClassName(className)[0];

const hide = (...elements) =>
  elements.forEach(element => element.classList.add("hidden"));

const show = (...elements) =>
  elements.forEach(element => element.classList.remove("hidden"));

const getContainer = (layerNumber, className) =>
  getByClass(`layer-${layerNumber}__${className}-container`);

const hideLayer = layer => {
  layer.style.visibility = "hidden";
  layer.style["z-index"] = 0;
};

const showLayer = layer => {
  layer.style.visibility = "visible";
  layer.style["z-index"] = 100;
};

let currentLayer = 1;

const background = getByClass("background");
const backgroundImage = getByClass("background__image");
const backButton = getByClass("back-button");
const mainText = getByClass("main-text");

const layer1 = getByClass("layer-1");
const layer1MainTextContainer = getContainer(1, "main-text");
const layer1GalleryControls = getByClass("layer-1__gallery-controls");

const showMoreButton = getByClass("layer-1__show-more-button");

const layer2 = getByClass("layer-2");
const layer2MainTextContainer = getContainer(2, "main-text");
const layer2Description = getByClass("layer-2__description");
const layer2AskForPriceButtonContainer = getContainer(
  2,
  "ask-for-price-button"
);

const layer3 = getByClass("layer-3");
const layer3MainTextContainer = getContainer(3, "main-text");
const askForPriceButton = getByClass("ask-for-price-button");
const layer3AskForPriceButtonContainer = getContainer(
  3,
  "ask-for-price-button"
);
const layer3Description = getByClass("layer-3__description");
const layer3Title = getByClass("layer-3__title");

showMoreButton.onclick = () => {
  currentLayer = 2;
  hide(showMoreButton, layer1GalleryControls);
  showLayer(layer2);
  show(layer2Description, askForPriceButton, backButton);
  changeParent(mainText, layer2MainTextContainer, () => hideLayer(layer1));
  background.classList.add("background--extended-border");
  backgroundImage.classList.add("background__image--blurred");
};

backButton.onclick = () => {
  if (currentLayer === 2) {
    showLayer(layer1);
    show(showMoreButton);
    hide(layer2Description, askForPriceButton, backButton);
    changeParent(mainText, layer1MainTextContainer, () => hideLayer(layer2));
    background.classList.remove("background--extended-border");
    backgroundImage.classList.remove("background__image--blurred");
    currentLayer = 1;
  }
  if (currentLayer === 3) {
    showLayer(layer2);
    hide(layer3Description, layer3Title);
    show(layer2Description);
    changeParent(mainText, layer2MainTextContainer, () => hideLayer(layer3));
    changeParent(askForPriceButton, layer2AskForPriceButtonContainer);
    currentLayer = 2;
  }
};

askForPriceButton.onclick = () => {
  currentLayer = 3;
  showLayer(layer3);
  hide(layer2Description);
  show(layer3Description, layer3Title);
  changeParent(mainText, layer3MainTextContainer, () => {});
  changeParent(askForPriceButton, layer3AskForPriceButtonContainer, () => {});
};

function adjustContainers() {
  const mainTextHeight = mainText.offsetHeight;
  const y = layer3MainTextContainer.getBoundingClientRect().y;
  const yDiff = (y + mainTextHeight) * -1;
  layer3MainTextContainer.style.transform = `translateX(${
    layer2MainTextContainer.getBoundingClientRect().x
  }px) translateY(${yDiff}px)`;

  const setMinHeight = (element, sampleElement) =>
    (element.style["min-height"] = `${sampleElement.offsetHeight}px`);

  setMinHeight(layer2MainTextContainer, mainText);
  setMinHeight(layer3MainTextContainer, mainText);

  setMinHeight(layer3AskForPriceButtonContainer, askForPriceButton);
}

window.onload = adjustContainers;
