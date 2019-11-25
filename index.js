window.onload = function() {
  var vw = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );

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
  const mobile = vw <= 425;
  let currentLayer = 1;
  let agreementChecked = false;

  // elements
  const logo = getByClass("header__logo");
  const backgroundImage = getByClass("background__image");
  const backgroundBorder = getByClass("background__border");
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
  const layer2DescriptionContainer = getContainer(2, "description");
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
      showLayer(layer2);
      gsap
        .timeline()
        .to(backgroundBorder, 0.5, { borderWidth: "1rem" })
        .to(layer1GalleryControls, 0.5, { opacity: 0 }, "<")
        .to(
          backgroundImage,
          0.5,
          {
            backgroundPositionX: "40%",
            scale: 1.4
          },
          "<"
        )
        .to(backButtonContainer, 0.5, { opacity: 1 }, "<")
        .to(logo, 0.5, { opacity: 0.5 }, "<")
        .add(
          moveButton(
            showMoreButton,
            askForPriceButton,
            "Zapytaj o cenę",
            () => {
              hideLayer(layer1);
              show(askForPriceButton, backButtonContainer);
              hide(showMoreButton, layer1GalleryControls);
            }
          ),
          "<"
        )
        .add(
          moveElement(mainText, layer2MainTextContainer, () => {}),
          "<"
        )
        .to(layer2Description, 0.5, { opacity: 1 }, "<");
    };
  } else {
    showMoreButton.onclick = () => {
      currentLayer = 2;
      showLayer(layer2);
      gsap
        .timeline()
        .to(backgroundBorder, 0.5, { borderWidth: "1rem" })
        .fromTo(
          backgroundImage,
          0.5,
          { filter: "blur(0)" },
          { filter: "blur(3px)", scale: 1.2 },
          "<"
        )
        .to(layer1GalleryControls, 0.5, { opacity: 0 }, "<")
        .to(backButtonContainer, 0.5, { opacity: 1 }, "<")
        .to(showMoreButton, 0.5, { opacity: 0 }, "<")
        .add(
          moveElement(mainText, layer2MainTextContainer, () => {}),
          "<"
        )
        .to(layer2DescriptionContainer, 0.5, { opacity: 1 }, "<")
        .call(() => hideLayer(layer1));
    };
  }

  backButton.onclick = () => {
    if (currentLayer === 2) {
      if (mobile) {
        showLayer(layer1);
        gsap
          .timeline()
          .to(backgroundImage, 0.5, {
            scale: 1
          })
          .to(backgroundBorder, 0.5, { borderWidth: "0.5rem" }, "<")
          .to(logo, 0.5, { opacity: 1 }, "<")
          .to(layer2Description, 0.5, { opacity: 0 }, "<")
          .to(layer1GalleryControls, 0.5, { opacity: 1 }, "<")
          .to(backButtonContainer, 0.5, { opacity: 0 }, "<")
          .add(
            () =>
              moveButton(askForPriceButton, showMoreButton, "Więcej", () => {
                hideLayer(layer2);
                show(showMoreButton, layer1GalleryControls);
                hide(askForPriceButton, backButtonContainer);
              }),
            "<"
          )
          .add(
            moveElement(mainText, layer1MainTextContainer, () => {}),
            "<"
          );

        currentLayer = 1;
      } else {
        showLayer(layer1);
        gsap
          .timeline()
          .to(backButtonContainer, 0.5, { opacity: 0 })
          .to(layer1GalleryControls, 0.5, { opacity: 1 }, "<")
          .to(layer2DescriptionContainer, 0.5, { opacity: 0 }, "<")
          .add(
            moveElement(mainText, layer1MainTextContainer, () => {}),
            "<"
          )
          .to(showMoreButton, 0.5, { opacity: 1 }, "<")
          .to(backgroundBorder, 0.5, { borderWidth: "0.5rem" }, "<")
          .to(backgroundImage, 0.5, { filter: "blur(0px)", scale: 1 }, "<")
          .call(() => hideLayer(layer2));

        currentLayer = 1;
      }
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
      // element.style["max-width"] = `${sampleElement.offsetWidth}px`;
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
  adjustContainers();
};
