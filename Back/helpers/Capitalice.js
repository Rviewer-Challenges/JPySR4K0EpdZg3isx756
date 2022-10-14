const Capitalice = (cadena) =>{
    const lower = cadena.toLoweCase();
    return cadena.char(0).toUpperCase() + lower.slice(1);
}

module.exports = {
    Capitalice
}