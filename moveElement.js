function moveElement(element, targetContainer) {
  const sourceX= element.offsetLeft;
  const targetX= targetContainer.offsetLeft;
  const sourceY = element.offsetTop;
  const targetY = targetContainer.offsetTop;
  return gsap
    .timeline()
    .call(() => {
      targetContainer.appendChild(element);
    })
    .from(element, 0.5, { y: sourceY - targetY, x: sourceX - targetX});
}
