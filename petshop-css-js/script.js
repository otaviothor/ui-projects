const Modal = {
  toggle() {
    document.querySelector(".modal-overlay").classList.toggle("active");
    document.body.style.overflowY =
      document.body.style.overflowY === "hidden" ? "auto" : "hidden";
  },
};

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("pet4.animais")) || [];
  },
  set(transactions) {
    localStorage.setItem("pet4.animais", JSON.stringify(transactions));
  },
};

const Animal = {
  all: Storage.get(),
  add(transaction) {
    Animal.all.push(transaction);
    App.reload();
  },
  remove(index) {
    Animal.all.forEach((an, i) => {
      if (i === index) {
        an.avaliable = false;
      }
    });
    App.reload();
  },
  entry() {
    let entries = 0;
    Animal.all.forEach((an) => {
      if (an.avaliable) {
        entries += 1;
      }
    });
    return entries;
  },
  exit() {
    let exits = 0;
    Animal.all.forEach((an) => {
      if (!an.avaliable) {
        exits += 1;
      }
    });
    return exits;
  },
  total() {
    let total = 0;
    Animal.all.forEach((an) => {
      total += Number(an.valor);
    });
    return total;
  },
};

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),
  addAnimal(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLAnimal(transaction, index);
    tr.dataset.index = index;
    DOM.transactionsContainer.appendChild(tr);
  },
  innerHTMLAnimal(transaction, index) {
    const valor = Utils.formatCurrency(transaction.valor);

    const html = `
      <td class="raca">${transaction.raca}</td>
      <td class="servico">${transaction.servico}</td>
      <td class="valor-servico">${valor}</td>
      <td>
        <img 
          onclick="Animal.remove(${index})" 
          src="./assets/${transaction.avaliable ? "minus" : "exit"}.svg" 
          alt="${
            transaction.avaliable ? "Remover animal" : "Animal já foi liberado"
          }" 
          title="${
            transaction.avaliable ? "Remover animal" : "Animal já foi liberado"
          }">
      </td>
    `;

    return html;
  },
  updateBalance() {
    document.getElementById("entry").innerHTML = Animal.entry();
    document.getElementById("exit").innerHTML = Animal.exit();
    document.getElementById("total").innerHTML = Utils.formatCurrency(
      Animal.total()
    );
  },
  clearAnimals() {
    DOM.transactionsContainer.innerHTML = "";
  },
};

const Utils = {
  formatCurrency(value) {
    value = String(value);
    value = Number(value);
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return value;
  },
};

const Form = {
  raca: document.querySelector("input#raca"),
  servico: document.querySelector("input#servico"),
  valor: document.querySelector("input#valor"),
  getValues() {
    return {
      raca: Form.raca.value,
      servico: Form.servico.value,
      valor: Form.valor.value,
    };
  },
  validateFields() {
    const { raca, servico, valor } = Form.getValues();
    if (raca.trim() === "" || servico.trim() === "" || valor.trim() === "") {
      throw new Error("Por favor, preencha todos os campos");
    }
  },
  formatValues() {
    let { raca, servico, valor } = Form.getValues();
    valor = valor.replaceAll(".", "").replace(",", ".");
    return {
      raca,
      servico,
      valor,
      avaliable: true,
    };
  },
  clearFields() {
    Form.raca.value = "";
    Form.servico.value = "";
    Form.valor.value = "";
  },
  submit(e) {
    e.preventDefault();
    try {
      Form.validateFields();
      const transaction = Form.formatValues();
      Animal.add(transaction);
      Form.clearFields();
      Modal.toggle();
    } catch (error) {
      alert(error.message);
    }
  },
};

const App = {
  init() {
    Animal.all.forEach((transaction, index) =>
      DOM.addAnimal(transaction, index)
    );
    DOM.updateBalance();
    Storage.set(Animal.all);
  },
  reload() {
    DOM.clearAnimals();
    App.init();
  },
};

App.init();
