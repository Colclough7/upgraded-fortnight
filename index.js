const form = document.querySelector('#form')
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const password2 = document.querySelector('#password2')
//FUNCTIONS
const showError = (input,message)=>{
    const formControl = input.parentElement
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small')
    small.innerText = message
}
const showSuccess = input=>{
    const formControl = input.parentElement
    formControl.className = 'form-control success'
}
const checkEmail = input=>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    re.test(input.value.trim())?showSuccess(input):showError(input,`Email is NOT valid!`)
}
const checkRequired = inputArr=>{
    inputArr.forEach(input=>{
        input.value.trim() === ''? showError(input,`${getFieldName(input)} is required!`):showSuccess(input)
    })
}
const checkPasswordsMatch = (input1,input2)=>{
    input1.value !== input2.value?showError(input1,`Passwords do NOT match!`): input2.value === '' || input1.value !== input2.value?
    showError(input2,`Passwords must be ENTERED!`):
    ''
}
const getFieldName = input=>{
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}
const checkLength = (input,min,max)=>{
    input.value.length < min? showError(input,`${getFieldName(input)} must be at least ${min} characters!`):
    input.value.length > max? showError(input,`${getFieldName(input)} must be less than ${max} characters!`):
    showSuccess(input)
}
const emptyValue = inputArr=>{
    inputArr.forEach(input=>input.value = '')
}
//EVENT HANDLER
form.addEventListener('submit',e=>{
    e.preventDefault()
    checkRequired([username,email,password,password2])
    checkLength(username,3,15)
    checkEmail(email)
    checkLength(password,6,25)
    checkLength(password2,6,25)
    checkPasswordsMatch(password,password2)
    emptyValue([username,email,password,password2])
})