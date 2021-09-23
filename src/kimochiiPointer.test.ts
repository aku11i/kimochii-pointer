import { KimochiiPointer } from "./kimochiiPointer";
import { mockCustomShape } from "../test/__mocks__/customShape";
jest.mock("../test/__mocks__/customShape");

afterEach(() => {
  document.body.innerHTML = "";
});

describe("mount/unmount", () => {
  test("to document.body if argument is skipped", () => {
    const pointer = new KimochiiPointer();

    pointer.mount();
    expect(document.body.lastChild).toBe(pointer.element);

    pointer.unmount();
    expect(document.body.lastChild).toBeNull();
  });

  test("to custom element if argument is specified", () => {
    const container = document.createElement("div");
    const pointer = new KimochiiPointer();

    pointer.mount(container);
    expect(container.lastChild).toBe(pointer.element);

    pointer.unmount();
    expect(container.lastChild).toBeNull();
  });
});

describe("register", () => {
  test("registered", () => {
    const pointer = new KimochiiPointer();
    const mockShape = mockCustomShape();

    pointer.register(mockShape);
    expect(pointer["_shapes"].get("custom")).toBe(mockShape);
  });
});

describe("unregister", () => {
  test("unregistered", () => {
    const pointer = new KimochiiPointer();
    const mockShape = mockCustomShape();
    pointer.register(mockShape);

    pointer.unregister(mockShape);
    expect(pointer["_shapes"].get("custom")).toBeUndefined();
  });
});

describe("findRegisteredShape", () => {
  test("returns registered shape", () => {
    const pointer = new KimochiiPointer();
    const mockShape = mockCustomShape();

    pointer.register(mockShape);
    expect(pointer.findRegisteredShape("custom")).toBe(mockShape);
  });
});

describe("getAllRegisteredShapes", () => {
  test("get an array of all registered shapes", () => {
    const pointer = new KimochiiPointer();
    const shapes = pointer.getAllRegisteredShapes();
    expect(shapes).toHaveLength(pointer["_shapes"].size);
  });
});

describe("attach", () => {
  test("shape.transform is called", () => {
    const pointer = new KimochiiPointer();
    const mockShape = mockCustomShape();
    const target = document.createElement("div");

    pointer.attach(mockShape, target);
    expect(mockShape.transform).toBeCalledWith(target);
  });

  test("pointer._currentShape is changed", () => {
    const pointer = new KimochiiPointer();
    const mockShape = mockCustomShape();
    const target = document.createElement("div");

    pointer.attach(mockShape, target);
    expect(pointer["_currentShape"]).toBe(mockShape);
  });
});

describe("detach", () => {
  test("shape.restore is called", () => {
    const pointer = new KimochiiPointer();
    const target = document.createElement("div");
    const mockShape = mockCustomShape();

    pointer.attach(mockShape, target);

    pointer.detach();
    expect(mockShape.restore).toBeCalled();
  });

  test("pointer._currentShape is removed", () => {
    const pointer = new KimochiiPointer();
    const target = document.createElement("div");

    pointer.attach(mockCustomShape(), target);

    pointer.detach();
    expect(pointer["_currentShape"]).toBeUndefined();
  });
});

describe("apply", () => {
  test("apply styles immediately", () => {
    const pointer = new KimochiiPointer();
    pointer.apply({
      width: 999,
    });
    expect(getComputedStyle(pointer.element).width).toBe("999px");
  });

  test("apply styles with duration", async () => {
    const pointer = new KimochiiPointer();
    pointer.apply({
      width: 999,
      duration: 0.1,
    });
    expect(getComputedStyle(pointer.element).width).not.toBe("999px");
    await new Promise((r) => setTimeout(r, 100));
    expect(getComputedStyle(pointer.element).width).toBe("999px");
  });
});

describe("getProperty", () => {
  test("get property of pointer", () => {
    const pointer = new KimochiiPointer();
    pointer.apply({
      width: 999,
    });
    expect(pointer.getProperty("width")).toBe(999);
  });
});

describe("lock", () => {
  test("locked property can not be applied", () => {
    const pointer = new KimochiiPointer();
    pointer.lock("width");

    pointer.apply({ width: 999 });
    expect(pointer.getProperty("width")).not.toBe(999);
  });

  test("lock with custom value", () => {
    const pointer = new KimochiiPointer();
    pointer.lock("width", 888);

    pointer.apply({ width: 999 });
    expect(pointer.getProperty("width")).not.toBe(999);
    expect(pointer.getProperty("width")).toBe(888);
  });
});

describe("unlock", () => {
  test("unlocked property can be applied", () => {
    const pointer = new KimochiiPointer();
    pointer.lock("width");
    pointer.unlock("width");

    pointer.apply({ width: 999 });
    expect(pointer.getProperty("width")).toBe(999);
  });
});

describe("isLocked", () => {
  test("returns true if locked", () => {
    const pointer = new KimochiiPointer();
    pointer.lock("width");

    expect(pointer.isLocked("width")).toBe(true);
    expect(pointer.isLocked("height")).toBe(false);
  });

  test("returns false if unlocked", () => {
    const pointer = new KimochiiPointer();
    pointer.lock("width");
    pointer.unlock("width");

    expect(pointer.isLocked("width")).toBe(false);
  });
});
