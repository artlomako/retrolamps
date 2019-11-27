function moveButton(
  sourceButton,
  targetButton,
  targetButtonContent,
  endCallback
) {
  const fakeContent = document.createElement("div");
  const realContent = sourceButton.querySelector(".content");
  fakeContent.innerHTML = targetButtonContent;

  const targetX = targetButton.offsetTop - sourceButton.offsetTop;
  const targetW = targetButton.offsetWidth;

  return gsap
    .timeline()
    .set(fakeContent, {
      opacity: 0,
      position: "absolute",
      xPercent: -50,
      yPercent: -50,
      left: "50%",
      top: "50%"
    })
    .call(() => sourceButton.appendChild(fakeContent))
    .to(sourceButton, 0.5, {
      force3D: false,
      ease: Power1.easeInOut,
      y: targetX,
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
      y: "",
      width: ""
    })
    .set(realContent, { opacity: 1 })
    .call(() => sourceButton.removeChild(fakeContent));
}
