export const getFromApi = async (path) => {
  const response = await fetch(path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
  return await response.json();
};

export const putToApi = async (path, body) => {
  const response = await fetch(path, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
  return await response.json();
};

export const postToApi = async (path, body) => {
  const response = await fetch(path, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
  return await response.json();
};

export const formatPrice = (price) => {
  let p = price.toLocaleString("en-US");
  let index = p.indexOf(".");
  return p.slice(0, index).replace(",", ".");
};

export const getFinalPrice = (lista, grabado, dollar) => {
  if (grabado == 1) return Number(lista) * 1.21 * Number(dollar);
  if (grabado == 3) return Number(lista) * 1.105 * Number(dollar);
};
