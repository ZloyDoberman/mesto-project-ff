export const showErrors = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
}

const hideErrors = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
}

const isValid = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }
  if(!inputElement.validity.valid){
    showErrors(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideErrors(formElement, inputElement, validationConfig);
  }
}

const setEventListeners = (formElement, validationConfig) => {
  const listInput = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(listInput, buttonElement, validationConfig);
  listInput.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
          isValid(formElement, inputElement, validationConfig);
          toggleButtonState(listInput, buttonElement, validationConfig);
      });
  });
}


export const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, validationConfig);
    });
}

const toggleButtonState = (listInput, buttonElement, validationConfig) => {
  const formValid = listInput.every((inputElement) => inputElement.validity.valid);
  if (formValid) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  }
};

export const clearValidation = (profileForm, validationConfig) => {
  const listInput = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = profileForm.querySelector(validationConfig.submitButtonSelector);
  listInput.forEach((inputElement) => {
    inputElement.setCustomValidity('');
    hideErrors(profileForm, inputElement, validationConfig);
  });
  toggleButtonState(listInput, buttonElement, validationConfig);
}