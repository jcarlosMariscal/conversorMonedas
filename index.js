const d = document;
const w = window;
d.addEventListener("DOMContentLoaded", (e) => {
  const cantidad = d.getElementById("cantidad");
  const mi_moneda = d.getElementById("mi_moneda");
  const moneda_cambio = d.getElementById("moneda_cambio");
  const conversion = d.getElementById("conversion");
  const informacion = d.getElementById("informacion_conversion");
  const descripcion = d.getElementById("descripcion");

  const isOnLine = () => {
    const $div = d.createElement("div");
    if (navigator.onLine) {
      $div.textContent = "Conexión reestablecida";
      $div.classList.add("alert", "alert-primary");
      $div.classList.remove("alert-danger");
      descripcion.innerHTML = `Use nuestra calculadora para convertir una moneda(divisa) a otra
                usando los tipos de cambio más recientes.`;
      descripcion.classList.remove("alert", "alert-danger");

      cantidad.disabled = false;
      mi_moneda.disabled = false;
      moneda_cambio.disabled = false;
    } else {
      $div.textContent = "Se ha perdido la conexión";
      $div.classList.add("alert", "alert-danger");
      $div.classList.remove("alert-primary");
      descripcion.innerHTML = `Parece que ha perdido la conexión a internet. Puede seguir usando la aplicación <a href="conversion.html">Aquí</a>`;
      descripcion.classList.add("alert", "alert-danger");

      cantidad.disabled = true;
      mi_moneda.disabled = true;
      moneda_cambio.disabled = true;
    }
    d.body.insertAdjacentElement("afterbegin", $div);
    setTimeout(() => d.body.removeChild($div), 2000);
  };
  w.addEventListener("online", (e) => isOnLine());
  w.addEventListener("offline", (e) => isOnLine());

  let hacerConversion = () => {
    let url = `https://api.exchangerate-api.com/v4/latest/${mi_moneda.value}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const taza = data.rates[moneda_cambio.value];
        conversion.value = (cantidad.value * taza).toFixed(2);
        informacion.innerText = `${cantidad.value} ${mi_moneda.value} = ${(
          cantidad.value * taza
        ).toFixed(2)} ${moneda_cambio.value}`;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  moneda_cambio.addEventListener("change", hacerConversion);
  mi_moneda.addEventListener("change", hacerConversion);
  cantidad.addEventListener("input", hacerConversion);
});
