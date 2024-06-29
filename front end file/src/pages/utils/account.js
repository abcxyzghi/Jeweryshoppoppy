const getAccount = () => {
  const str = localStorage.getItem("account");
  return JSON.parse(str);
};

export default getAccount;
