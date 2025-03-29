import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CrossPadContainer } from "../CrossPadContainer";

describe("CrossPadContainer", () => {
  it("버튼 클릭 시 onPress 콜백이 올바른 방향과 함께 호출되어야 합니다", () => {
    const mockOnPress = vi.fn();
    render(<CrossPadContainer onPress={mockOnPress} />);

    const upButton = screen.getByTestId("arrow-up");
    const downButton = screen.getByTestId("arrow-down");
    const leftButton = screen.getByTestId("arrow-left");
    const rightButton = screen.getByTestId("arrow-right");

    fireEvent.click(upButton);
    expect(mockOnPress).toHaveBeenCalledWith("up");

    fireEvent.click(downButton);
    expect(mockOnPress).toHaveBeenCalledWith("down");

    fireEvent.click(leftButton);
    expect(mockOnPress).toHaveBeenCalledWith("left");

    fireEvent.click(rightButton);
    expect(mockOnPress).toHaveBeenCalledWith("right");
  });

  it("모든 방향 버튼이 렌더링되어야 합니다", () => {
    render(<CrossPadContainer onPress={vi.fn()} />);

    expect(screen.getByTestId("arrow-up")).toBeDefined();
    expect(screen.getByTestId("arrow-down")).toBeDefined();
    expect(screen.getByTestId("arrow-left")).toBeDefined();
    expect(screen.getByTestId("arrow-right")).toBeDefined();
  });
}); 