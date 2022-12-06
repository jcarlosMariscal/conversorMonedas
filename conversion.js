const d = document;
const w = window;
d.addEventListener("DOMContentLoaded", (e) => {
  const msjPersonalizado = document.getElementById("msjPersonalizado");
  const verificarInstalación = localStorage.getItem("instalado");
  if (verificarInstalación) {
    msjPersonalizado.style.display = "none";
    return;
  }
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

  if (moneda_cambio) moneda_cambio.addEventListener("change", hacerConversion);
  if (mi_moneda) mi_moneda.addEventListener("change", hacerConversion);
  if (cantidad) cantidad.addEventListener("input", hacerConversion);

  // ------------------------ BOTÓN DE INSTALACIÓN Y NOTIFICACIONES -------------------
  const btnInstalar = document.getElementById("instalar");
  const cerrarMsj = document.getElementById("cerrarMsj");
  cerrarMsj.addEventListener("click", (e) => {
    msjPersonalizado.style.display = "none";
    e.preventDefault();
    // msjPersonalizado.classList.add("ocultar");
  });
  let eventoPrompt;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    eventoPrompt = e;
  });
  btnInstalar.addEventListener("click", (e) => {
    msjPersonalizado.style.display = "none";
    eventoPrompt.prompt();
    eventoPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        localStorage.setItem("instalado", true);
        console.log("El usuario instaló la app");
      } else {
        console.log("El usuario rechazó la instalación");
      }
      eventoPrompt = null;
    });
  });

  // ----------------------- NOTIFICACIONES -------------------------------------
  // let btnNotificaciones = document.getElementById("instalarNotificaciones");
  // btnNotificaciones.addEventListener("click", (e) => {
  //   Notification.requestPermission().then((result) => {
  //     if (result === "granted") {
  //       randomNotificacion();
  //     }
  //   });
  // });
  // const randomNotificacion = () => {
  //   let nTitle = "Titulo notificación";
  //   let nBody = "Te invitamos a conocer nuestro contenido de primera mano";
  //   let nImage = "./icons/notificaciones.jpg";
  //   let options = {
  //     body: nBody,
  //     icon: nImage,
  //   };
  //   let notif = new Notification(nTitle, options);
  //   setTimeout(randomNotificacion, 10000);
  // };
});
