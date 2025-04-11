import { beforeEach, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    forward: vi.fn(),
  }),
  usePathname: () => '',
  useSearchParams: () => new URLSearchParams(),
}));

class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
}

window.ResizeObserver = ResizeObserver;

beforeEach(() => {
  vi.clearAllMocks();
  // screen 에 출력된 모든 dom 초기화
  document.body.innerHTML = '';
});