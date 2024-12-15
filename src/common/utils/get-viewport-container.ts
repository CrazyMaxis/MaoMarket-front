export default function getViewportContainer() {
  if (document.fullscreenElement) {
    return document.fullscreenElement as HTMLElement;
  }

  return document.body;
}
