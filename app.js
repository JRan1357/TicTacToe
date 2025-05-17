const main = function () {
    const x = 1;

    getX = () => {
        return x;
    }

    return {
        getX
    };
}

Main = main();
console.log(Main.getX());