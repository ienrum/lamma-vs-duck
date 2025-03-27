export const colors = {
  primary: {
    DEFAULT: "#FFE566", // 포스트잇 노란색
    hover: "#FFE566E6", // 90% opacity
  },
  secondary: {
    DEFAULT: "#FF9B9B", // 연한 빨간색
    hover: "#FF9B9BE6",
  },
  success: {
    DEFAULT: "#98FB98", // 연한 초록색
    hover: "#98FB98E6",
  },
  warning: {
    DEFAULT: "#FFB347", // 연한 주황색
    hover: "#FFB347E6",
  },
  error: {
    DEFAULT: "#FF6B6B", // 빨간색
    hover: "#FF6B6BE6",
  },
  text: {
    DEFAULT: "#000000",
    secondary: "#666666",
    light: "#FFFFFF",
  },
  border: {
    DEFAULT: "#000000",
  },
  shadow: {
    DEFAULT: "2px 2px 0px 0px rgba(0,0,0,0.2)",
    hover: "4px 4px 0px 0px rgba(0,0,0,0.2)",
    active: "1px 1px 0px 0px rgba(0,0,0,0.2)",
  },
} as const; 