function moveElement(element, targetContainer) {
  const sourceY = element.offsetTop;
  const targetY = targetContainer.offsetTop;
  return gsap
    .timeline()
    .call(() => {
      targetContainer.appendChild(element);
    })
    .from(element, 0.5, { y: sourceY - targetY });
}
