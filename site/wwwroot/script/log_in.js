document.addEventListener('DOMContentLoaded', () => {
    const input_mail = document.getElementById('log-in-email');
    const input_password = document.getElementById('log-in-password');
    const button_log_in = document.getElementById('log-in-btn');

    button_log_in.disabled = true;

    input_mail.addEventListener('input', () => {
        if (input_password.value && input_mail.value) {
            button_log_in.disabled = false
        } else {
            button_log_in.disabled = true
        }
    })

    input_password.addEventListener('input', () => {
        if (input_password.value && input_mail.value) {
            button_log_in.disabled = false
        } else {
            button_log_in.disabled = true
        }
    })

    button_log_in.addEventListener('click', () => {
        console.log(input_mail.value, input_password.value)
    })
})