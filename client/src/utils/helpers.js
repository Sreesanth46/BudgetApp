export const resetForm = (form) => {
    for (const [key, value] of Object.entries(form)) {
        form[key] = "";
    }
}