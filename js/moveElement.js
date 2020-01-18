function moveElement(element, targetContainer) {
  const elementRect = element.getBoundingClientRect();
  const containerRect = targetContainer.getBoundingClientRect();

  const sourceX = elementRect.left;
  const targetX = containerRect.left;
  const sourceY = elementRect.top;
  const targetY = containerRect.top;
  
  return gsap
    .timeline()
    .call(() => {
      targetContainer.appendChild(element);
    })
    .from(element, 0.5, {
      force3D: false,
      ease: Power1.easeInOut,
      y: sourceY - targetY,
      x: sourceX - targetX
    });
}
