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

// state
const mobile = window.outerWidth <= 425;
let currentLayer = 1;
let agreementChecked = false;

// elements
const logo = getByClass("header__logo");
const background = getByClass("background");
const backgroundImage = getByClass("background__image");
const backButton = getByClass("back-button");
const backButtonContainer = getByClass("back-button-container");
const mainText = getByClass("main-text");

const layer1 = getByClass("layer-1");
const layer1MainTextContainer = getContainer(1, "main-text");
const layer1ShowMoreButtonContainer = getContainer(1, "show-more-button");
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

const contactFormAgreementCheckbox = getByClass(
  "contact-form__agreement-checkbox"
);

const contactForm = getByClass("contact-form");

const checkboxCheckmark = getByClass("checkbox__checkmark");

if (mobile) {
  showMoreButton.onclick = () => {
    currentLayer = 2;

    hide(layer1GalleryControls);
    showLayer(layer2);
    showMoreButton.classList.add("transition12");
    changeParent(showMoreButton, layer2AskForPriceButtonContainer, () => {
      showMoreButton.classList.add("hidden");

      show(askForPriceButton);

      layer1ShowMoreButtonContainer.append(showMoreButton);
      showMoreButton.classList.remove("transition12");
      showMoreButton.style.width = "";
    });
    show(layer2Description, backButtonContainer);
    changeParent(mainText, layer2MainTextContainer);
    background.classList.add("background--extended-border");
    logo.classList.add("header__logo--transparent");
    // backgroundImage.classList.add("background__image--blurred");
  };
} else {
  showMoreButton.onclick = () => {
    currentLayer = 2;
    hide(showMoreButton, layer1GalleryControls);
    showLayer(layer2);
    show(layer2Description, askForPriceButton, backButtonContainer);
    changeParent(mainText, layer2MainTextContainer, () => hideLayer(layer1));
    background.classList.add("background--extended-border");
    backgroundImage.classList.add("background__image--blurred");
  };
}

backButton.onclick = () => {
  if (currentLayer === 2) {
    showLayer(layer1);
    background.classList.remove("background--extended-border");
    logo.classList.remove("header__logo--transparent");

    hide(layer2Description, backButtonContainer);
    askForPriceButton.classList.add("transition21");
    changeParent(askForPriceButton, layer1ShowMoreButtonContainer, () => {
      hide(askForPriceButton);
      show(showMoreButton);

      layer2AskForPriceButtonContainer.append(askForPriceButton);
      askForPriceButton.classList.remove("transition21");
      askForPriceButton.style.width = `${
        layer2AskForPriceButtonContainer.getBoundingClientRect().width
      }px`;
    });
    changeParent(mainText, layer1MainTextContainer);
    hideLayer(layer2);

    show(layer1GalleryControls);
    showLayer(layer1);
    // backgroundImage.classList.remove("background__image--blurred");

    currentLayer = 1;
  }
  if (currentLayer === 3) {
    showLayer(layer2);
    hide(layer3Description, layer3Title, contactForm);
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
  show(layer3Description, layer3Title, contactForm);
  changeParent(mainText, layer3MainTextContainer, () => {
    hideLayer(layer2);
  });
  changeParent(askForPriceButton, layer3AskForPriceButtonContainer, () => {});
};

contactFormAgreementCheckbox.onclick = () => {
  const className = "checkbox__checkmark--checked";
  if (agreementChecked) {
    checkboxCheckmark.classList.remove(className);
    agreementChecked = false;
  } else {
    checkboxCheckmark.classList.add(className);
    agreementChecked = true;
  }
};

function adjustContainers() {
  const setMinHeight = (element, sampleElement) =>
    (element.style["min-height"] = `${sampleElement.offsetHeight}px`);

  const setMinWidth = (element, sampleElement) => {
    element.style["min-width"] = `${sampleElement.offsetWidth}px`;
    element.style["max-width"] = `${sampleElement.offsetWidth}px`;
  };

  setMinHeight(layer1MainTextContainer, mainText);
  setMinHeight(layer1ShowMoreButtonContainer, showMoreButton);

  setMinHeight(layer2MainTextContainer, mainText);
  setMinHeight(layer3MainTextContainer, mainText);

  askForPriceButton.style.width = `${layer2AskForPriceButtonContainer.offsetWidth}px`;
  layer3MainTextContainer.style.left = `${
    layer2MainTextContainer.getBoundingClientRect().x
  }px`;
  layer3MainTextContainer.style.top = `-${layer3MainTextContainer.getBoundingClientRect()
    .y + mainText.offsetHeight}px`;

  setMinHeight(layer2AskForPriceButtonContainer, askForPriceButton);
  setMinWidth(layer1ShowMoreButtonContainer, showMoreButton);
}

window.onload = adjustContainers;
