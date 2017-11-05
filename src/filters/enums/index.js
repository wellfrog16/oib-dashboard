export default (value, enums) =>
  enums && enums.length && (enums.find(item => item.value == value) || {}).label || value;
