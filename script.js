const buttonRegistration = document.getElementById("registration");
const buttonAuthorization = document.getElementById("authorization");
const authorizationFields = document.getElementById("authorizationFields");
const registrationFields = document.getElementById("registrationFields");
const identificationFields = document.getElementById("identificationFields");
const lineChoice = document.getElementById("lineChoice");
const buttonNext = document.getElementById("transitionButton");
const loginPasswordFields = document.getElementById("loginPasswordFields");
const transitionContainer = document.getElementById("transizionContainer");
const registrationButton = document.getElementById("registrationButton");
const authorizationButton = document.getElementById("authorizationButton");
const password = document.getElementById("passwordNew");
const passwordNewAgain = document.getElementById("passwordNewAgain");
const messageError = document.querySelector('.warning-field');

const user = {};

const toggleForms = (showAuthorization) => {
  lineChoice.style.transform = showAuthorization
    ? "translateX(0)"
    : "translateX(95px)";
  buttonAuthorization.style.color = showAuthorization ? "#FFFFFF" : "#D3D3D3";
  buttonRegistration.style.color = showAuthorization ? "#D3D3D3" : "#FFFFFF";
  authorizationFields.style.display = showAuthorization ? "flex" : "none";
  registrationFields.style.display = showAuthorization ? "none" : "flex";
};



const emptyFields = (field) => {
  const inputs = field.querySelectorAll("input");

  let emptyFieldsCount = 0;

  inputs.forEach((element) => {
    if (element.value === "") {
      emptyFieldsCount += 1;
    }
  });
  return emptyFieldsCount;
};

const userVerification = (inputs) => {
  inputs.forEach((element) => {
    user[`${element.id}`] = element.value;
  });
};

authorizationButton.addEventListener("click", () => {
  // отправка на проверку пользователя
  let emptyCount = emptyFields(authorizationFields);

  const inputs = authorizationFields.querySelectorAll("input");

  if (emptyCount === 0) {
    userVerification(inputs);
    console.log(user);
    sendingServer(user);
  } else {
    messageError.style.display = 'flex';
    setTimeout(() => {
      messageError.style.display = 'none';
    }, 2000);
  }
});

registrationFields.addEventListener("input", (event) => {
  const target = event.target;
  const validationType = target.dataset.validate;

  if (validationType) {
    let isValid = false;

    switch (validationType) {
      case "name":
        isValid = /^[а-яА-Я\s]+$/.test(target.value);
        break;
      case "serName":
        isValid = /^[а-яА-Я\s]+$/.test(target.value); // Только буквы и пробелы
        break;
      case "medicalInstitutions":
        isValid = /^[а-яА-Я\s]+$/.test(target.value);
    }
    if (!isValid) {
      target.style.color = "red";
    } else {
      target.style.color = "";
    }
  }
});

buttonAuthorization.addEventListener("click", () => {
  toggleForms(true);
});

buttonRegistration.addEventListener("click", () => {
  toggleForms(false);
});

buttonNext.addEventListener("click", () => {
  let emptyCount = emptyFields(identificationFields);

  if (emptyCount === 0) {
    loginPasswordFields.style.display = "flex";
    identificationFields.style.display = "none";

    transitionContainer.style.setProperty("--before-color", "#d9d9d9");
    transitionContainer.style.setProperty("--after-color", "#ffffff");
  } else {
    messageError.style.display = 'flex';
    setTimeout(() => {
      messageError.style.display = 'none';
    }, 2000);
  }
});

registrationButton.addEventListener("click", () => {
  // добавления нового пользователя
  let emptyCount = emptyFields(loginPasswordFields);
  const inputs = registrationFields.querySelectorAll("input");
  if (emptyCount === 0 && password.value === passwordNewAgain.value) {
    userVerification(inputs);
    console.log(user);
    sendingServer(user);

    password.style.color = "black";
    passwordNewAgain.style.color = "black";
  } else if (emptyCount === 0 && password.value !== passwordNewAgain.value) {
    password.style.color = "red";
    passwordNewAgain.style.color = "red";
  } else {
    messageError.style.display = 'flex';
    setTimeout(() => {
      messageError.style.display = 'none';
    }, 2000);
  }
});

const sendingServer = (objectUser) => {
  // URL будет меняться в зависиости от типа входа
  fetch("", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objectUser),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка сети");
      }
      return response.json();
    })
    .then((result) => {
      console.log("Ответ от сервера:", result);
    })
    .catch(console.error());
};
