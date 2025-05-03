/**
 * Valida o valor do salário.
 * @param {number} salario - Valor a ser validado.
 * @throws {Error} Se o salário for menor ou igual a zero.
 */
export function validarSalario(salario) {
    if (salario <= 0) {
        throw new Error('O salário deve ser maior que zero.');
    }
}
