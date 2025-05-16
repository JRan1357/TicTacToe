const main = function () {
    const x = 1;

    getX: () => {
        return x;
    }

    return {
        getX
    }
}

console.log(main.getX);