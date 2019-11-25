 const changeParent = (element, newParent, afterTransitionCallback) => {
  const getRect = () => element.getBoundingClientRect();
  const withReflow = fn => {
    fn();
    element.innerText;
  };

  const oldRect = getRect();
  withReflow(() => newParent.appendChild(element));
  const newRect = getRect();
  element.style.transform = `translateX(${oldRect.x -
    newRect.x}px) translateY(${oldRect.y - newRect.y}px)`;

  anime({
    targets: element,
    translateX: 0,
    translateY: 0,
    width: newParent.getBoundingClientRect().width,
    duration: 500,
    easing: "easeInOutQuad",
    complete: afterTransitionCallback
  });
};
