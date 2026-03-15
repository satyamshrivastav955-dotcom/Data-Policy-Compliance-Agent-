import { Violation } from "@/types";
import { mockViolations } from "./data";

type ViolationHandler = (violation: Violation) => void;
type VoidHandler = () => void;

export class MockWebSocket {
  private index = 0;
  private intervalId: number | null = null;
  private onViolationHandler?: ViolationHandler;
  private onOpenHandler?: VoidHandler;
  private onCloseHandler?: VoidHandler;
  private onErrorHandler?: (err: Error) => void;

  constructor() {
    this.start();
  }

  private start() {
    this.onOpenHandler?.();
    this.intervalId = window.setInterval(() => {
      const violation = mockViolations[this.index % mockViolations.length];
      this.onViolationHandler?.(violation);
      this.index += 1;
    }, 3500);
  }

  public onViolation(handler: ViolationHandler) {
    this.onViolationHandler = handler;
  }

  public onOpen(handler: VoidHandler) {
    this.onOpenHandler = handler;
  }

  public onClose(handler: VoidHandler) {
    this.onCloseHandler = handler;
  }

  public onError(handler: (err: Error) => void) {
    this.onErrorHandler = handler;
  }

  public close() {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
    }
    this.onCloseHandler?.();
  }
}

