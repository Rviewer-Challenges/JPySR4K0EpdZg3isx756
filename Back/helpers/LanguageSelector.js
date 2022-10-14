const languageSelector = (language) => {
    switch (language) {
        case "javascript":
            return "JavaScript"
        case "typescript":
            return "TypeScript"
        case "kotlin":
            return  "Kotlin"
        case "python":
            return "Python"
        default:
            return language

    }
}

module.exports = languageSelector