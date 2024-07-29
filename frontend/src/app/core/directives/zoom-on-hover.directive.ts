import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appZoomOnHover]",
})
export class ZoomOnHoverDirective {
  private zoomLens: HTMLDivElement;
  private zoomFactor = 2;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.zoomLens = this.renderer.createElement("div");
    this.renderer.addClass(this.zoomLens, "zoom-lens");
    this.renderer.setStyle(this.zoomLens, "width", "200px");
    this.renderer.setStyle(this.zoomLens, "height", "200px");
    this.renderer.setStyle(this.zoomLens, "overflow", "hidden");
    this.renderer.setStyle(this.zoomLens, "border", "1px solid transparent");
    this.renderer.appendChild(this.el.nativeElement.parentNode, this.zoomLens);
  }

  @HostListener("mousemove", ["$event"])
  onMouseMove(event: MouseEvent) {
    const containerRect = this.el.nativeElement.getBoundingClientRect();
    const lensSize = {
      width: this.zoomLens.offsetWidth,
      height: this.zoomLens.offsetHeight,
    };
    const cursorPos = {
      x: event.clientX - containerRect.left,
      y: event.clientY - containerRect.top,
    };

    const position = {
      x: Math.max(
        Math.min(
          cursorPos.x - lensSize.width / 2,
          containerRect.width - lensSize.width,
        ),
        0,
      ),
      y: Math.max(
        Math.min(
          cursorPos.y - lensSize.height / 2,
          containerRect.height - lensSize.height,
        ),
        0,
      ),
    };

    this.renderer.setStyle(this.zoomLens, "top", position.y + "px");
    this.renderer.setStyle(this.zoomLens, "left", position.x + "px");

    this.renderer.setStyle(
      this.zoomLens,
      "backgroundImage",
      `url(${this.el.nativeElement.src})`,
    );
    this.renderer.setStyle(
      this.zoomLens,
      "backgroundSize",
      `${this.el.nativeElement.offsetWidth * this.zoomFactor}px ${this.el.nativeElement.offsetHeight * this.zoomFactor}px`,
    );
    this.renderer.setStyle(
      this.zoomLens,
      "backgroundPosition",
      `-${position.x * this.zoomFactor}px -${position.y * this.zoomFactor}px`,
    );
  }
}
