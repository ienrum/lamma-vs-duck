export const colors = {
  primary: {
    DEFAULT: "#FFE566", // 포스트잇 노란색
    hover: "#FFE566E6", // 90% opacity
    text: "#000000",
    border: "#000000",
    shadow: "2px 2px 0px 0px rgba(0,0,0,0.2)",
  },
  secondary: {
    DEFAULT: "#FF9B9B", // 연한 빨간색
    hover: "#FF9B9BE6",
    text: "#000000",
    border: "#000000",
    shadow: "2px 2px 0px 0px rgba(0,0,0,0.2)",
  },
  success: {
    DEFAULT: "#98FB98", // 연한 초록색
    hover: "#98FB98E6",
    text: "#000000",
    border: "#000000",
    shadow: "2px 2px 0px 0px rgba(0,0,0,0.2)",
  },
  warning: {
    DEFAULT: "#FFB347", // 연한 주황색
    hover: "#FFB347E6",
    text: "#000000",
    border: "#000000",
    shadow: "2px 2px 0px 0px rgba(0,0,0,0.2)",
  },
  error: {
    DEFAULT: "#FF6B6B", // 빨간색
    hover: "#FF6B6BE6",
    text: "#000000",
    border: "#000000",
    shadow: "2px 2px 0px 0px rgba(0,0,0,0.2)",
  },
  crossPad: {
    DEFAULT: "#000000",
    hover: "#000000E6",
    active: "#000000E6",
    text: "#FFFFFF",
    border: "gray",
    shadow: "2px 2px 0px 0px rgba(0,0,0,0.2)",
  }
} as const; 