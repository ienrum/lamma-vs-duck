
const formatDate = (today: Date) => {
  return today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default formatDate;