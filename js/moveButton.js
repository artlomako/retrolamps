function moveButton(
  sourceButton,
  targetButton,
  targetButtonContent,
  endCallback
) {
  const fakeContent = document.createElement("div");
  fakeContent.classList.add("fake-content");
  const realContent = sourceButton.querySelector(".content");
  fakeContent.innerHTML = targetButtonContent;

  const sourceRect = sourceButton.getBoundingClientRect();
  const targetRect = targetButton.getBoundingClientRect();
  const sourceW = sourceRect.width;
  const targetW = targetRect.width;
  let targetX = targetRect.x - sourceRect.x;
  if (sourceRect.left > targetRect.left) {
    targetX -= (sourceW - targetW) / 2;
  }
  const targetY = targetRect.top - sourceRect.top;

  return gsap
    .timeline()
    .set(fakeContent, {
      opacity: 0
    })
    .call(() => sourceButton.appendChild(fakeContent))
    .to(sourceButton, 0.5, {
      force3D: false,
      ease: Power1.easeInOut,
      x: targetX,
      y: targetY,
      width: targetW
    })
    .to(
      fakeContent,
      0.5,
      { force3D: false, ease: Power1.easeInOut, opacity: 1 },
      "<"
    )
    .to(
      realContent,
      0.5,
      { force3D: false, ease: Power1.easeInOut, opacity: 0 },
      "<"
    )
    .call(endCallback)
    .set(sourceButton, {
      x: "",
      y: "",
      width: ""
    })
    .set(realContent, { opacity: 1 })
    .call(() => sourceButton.removeChild(fakeContent));
}
