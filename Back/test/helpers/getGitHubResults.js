

const gitHubResults =
    [
        {
            tipoTest: "Datos de github populate developers, devuelve JSON status 200 e info correcta",
            url: "/developers/git-hub",
            info: "Información repositorios git",
        },
        {
            tipoTest: "Todos los repositorios, devuelve JSON status 200 e info correcta",
            url: "/developers/git-hub/repositories",
            info: "Repositorios almacenados en BD",
        }
    ]

module.exports = gitHubResults