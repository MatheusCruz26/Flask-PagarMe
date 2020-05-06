function payment(obj) {
  fetch("/card/payment", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "content-type": "application/json",
    },
    body: obj,
  })
    .then((response) => {
      alert("Pagamento realizado com sucesso.");
    })
    .catch(() => {
      alert("Ocorreu um erro ao realizar o pagamento.");
    });
}

document.getElementById("payment").addEventListener("click", (e) => {
  e.preventDefault();
  const objPayment = {
    customer: {
      external_id: `#${Math.floor(Math.random() * 10000) + 1}`,
      name: "João da Silva",
      type: "individual",
      country: "br",
      email: "j.silva123@gmail.com",
      documents: [
        {
          type: "cpf",
          number: "45824470073",
        },
      ],
      phone_numbers: ["+5511997022828"],
      birthday: "1989-10-20",
    },
    card: {
      card_expiration_date: `${document.getElementById("expmonth").value}${
        document.getElementById("expyear").value
      }`,
      card_number: document.getElementById("cardnumber").value,
      card_cvv: document.getElementById("cvv").value,
      card_holder_name: document.getElementById("cardname").value,
    },
    billing: {
      name: "João da Silva",
      address: {
        country: "br",
        state: "sp",
        city: "São Paulo",
        neighborhood: "Lapa",
        street: "Rua Corrientes",
        street_number: "14",
        zipcode: "05076010",
      },
    },
    items: [
      {
        id: Math.floor(Math.random() * 100) + 1,
        title: "Camiseta Jeans",
        unit_price: "10000",
        quantity: "1",
        tangible: "true",
      },
    ],
  };
  payment(JSON.stringify(objPayment));
});
