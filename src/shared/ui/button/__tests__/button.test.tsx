import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "..";

describe('Button', () => {
  it('should render', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDefined();
  });

  it('should render a button', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeDefined();
  });

  it('should render a button with a custom class name', () => {
    render(<Button className="custom-class">Click me</Button>);
    expect(screen.getByRole('button').className).toContain('custom-class');
  });

  it('버튼이 클릭되면 함수가 호출된다.', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('버튼이 로딩 상태일 때 클릭되지 않는다.', () => {
    const handleClick = vi.fn();
    render(<Button isLoading>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('버튼이 비활성화 상태일 때 클릭되지 않는다.', () => {
    const handleClick = vi.fn();
    render(<Button disabled>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('버튼이 로딩상태일 때 로딩 아이콘이 보인다.', () => {
    render(<Button isLoading>Click me</Button>);
    const button = screen.getByRole('button');

    expect(button.querySelector('svg')).toBeTruthy();
  });
});
