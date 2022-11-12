const d = document;
const w = window;
d.addEventListener("DOMContentLoaded", (e) => {
  const cantidad = d.getElementById("cantidad");
  const mi_moneda = d.getElementById("mi_moneda");
  const moneda_cambio = d.getElementById("moneda_cambio");
  const conversion = d.getElementById("conversion");
  const informacion = d.getElementById("informacion_conversion");

  const isOnLine = () => {
    const $div = d.createElement("div");
    if (navigator.onLine) {
      $div.textContent = "Conexión reestablecida";
      $div.classList.add("alert", "alert-primary");
      $div.classList.remove("alert-danger");
    } else {
      $div.textContent = "Se ha perdido la conexión";
      $div.classList.add("alert", "alert-danger");
      $div.classList.remove("alert-primary");
    }
    d.body.insertAdjacentElement("afterbegin", $div);
    setTimeout(() => d.body.removeChild($div), 2000);
  };
  w.addEventListener("online", (e) => isOnLine());
  w.addEventListener("offline", (e) => isOnLine());

  let hacerConversion = () => {
    let url = `bd/data.json`;
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        for (let i = 0; i < data.monedas.length; i++) {
          // console.log(data.monedas[i]);
          if (data.monedas[i].base === mi_moneda.value) {
            let rates = data.monedas[i].rates;
            // console.log(rates);
            for (let j = 0; j < rates.length; j++) {
              if (rates[j].base2 === moneda_cambio.value) {
                const taza = rates[j][moneda_cambio.value];
                conversion.value = (cantidad.value * taza).toFixed(2);
                informacion.innerText = `${cantidad.value} ${
                  mi_moneda.value
                } = ${(cantidad.value * taza).toFixed(2)} ${
                  moneda_cambio.value
                }`;
              }
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  moneda_cambio.addEventListener("change", hacerConversion);
  mi_moneda.addEventListener("change", hacerConversion);
  cantidad.addEventListener("input", hacerConversion);
});
