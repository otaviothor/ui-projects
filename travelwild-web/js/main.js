var data;

axios
  .get(
    "https://raw.githubusercontent.com/otaviothor/travelwild/master/js/paises"
  )
  .then((response) => {
    this.data = response.data;
  })
  .catch((error) => {
    console.log(error);
  });

// Sidenav
const sideNav = document.querySelector(".sidenav");
M.Sidenav.init(sideNav, {});

// Slider
const slider = document.querySelector(".slider");
M.Slider.init(slider, {
  indicators: false,
  transition: 500,
  interval: 6000,
});

// Autocomplete
const ac = document.querySelector(".autocomplete");
M.Autocomplete.init(ac, {});

// Material Boxed
const mb = document.querySelectorAll(".materialboxed");
M.Materialbox.init(mb, {});

// ScrollSpy
const ss = document.querySelectorAll(".scrollspy");
M.ScrollSpy.init(ss, {});

// Dropdown
const dt = document.querySelectorAll(".dropdown-trigger");
M.Dropdown.init(dt, {});

// Modal
const md = document.querySelectorAll(".modal");
M.Modal.init(md, {});

// conta os caracteres do textarea do Contato
$("#mensagemContato").keyup(() => {
  var max = parseInt($("#mensagemContato").attr("maxlength"));
  var tamanho = $("#mensagemContato").val().length;
  var newLength = max - tamanho;
  if (newLength > 0) {
    $("#spanMensagemContato").html(newLength + " caracteres restantes");
  } else if (newLength == 0) {
    $("#spanMensagemContato").html(null);
  } else {
    $("#spanMensagemContato").html(null);
  }
});

// mascara de telefone
$(document).ready(() => {
  $("#telefoneContato").mask("(99) 99999-9999");
});

// verifica a quantidade de caracteres no campo senha do cadastro
$("#senha").keyup(() => {
  var tamanho = $("#senha").val().length;
  if (tamanho < 8 || tamanho > 12) {
    $("#spanSenha").html(
      "A senha deve conter no mínimo 8 caracteres e no máximo 12"
    );
    $("#confsenha").prop("disabled", true);
  } else if (tamanho == 0) {
    $("#spanSenha").html(null);
  } else {
    $("#spanSenha").html(null);
    $("#confsenha").prop("disabled", false);
  }
});

// verifica se as senhas são iguais
$("#confsenha").keyup(() => {
  var senhaValue = $("#senha").val();
  var confSenhaValue = $("#confsenha").val();
  if (confSenhaValue != senhaValue) {
    $("#spanConfSenha").html("As senhas não conferem");
    $("#btnCadastro").prop("disabled", true);
  } else {
    $("#spanConfSenha").html(null);
    $("#btnCadastro").prop("disabled", false);
  }
});

// function pra alternar entre o login e o recuperar senha
$(".toggleLogin").click(() => {
  $(".formRecuperarSenha").toggleClass("hide");
  $(".formLogin").toggleClass("hide");
});

// muda o tipo do campo password pra text
function verSenha() {
  $(".btnVerSenha").toggleClass("fa-eye fa-eye-slash");
  if ($(".inputSenha").attr("type") == "password") {
    $(".inputSenha").attr("type", "text");
  } else {
    $(".inputSenha").attr("type", "password");
  }
}

// image preview
$(".inputFoto").change(() => {
  imagePreview(this);
});

function imagePreview(input) {
  if (input.files && input.files[0]) {
    console.log("ok");

    var reader = new FileReader();
    reader.onload = (e) => {
      $(".imagePreview").attr("src", e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    console.error("deu ruim");
  }
}

// consulta e preenchimento do cep
$(".cep").blur(async () => {
  var cep = $(".cep").val();
  fetch(`https://viacep.com.br/ws/${cep}/json`).then((dados) => {
    dados.json().then((endereco) => {
      console.log(endereco);
      $(".rua").val(endereco.logradouro);
      $(".bairro").val(endereco.bairro);
      $(".cidade").val(endereco.localidade);
      $(".estado").val(endereco.uf);
    });
  });
});
