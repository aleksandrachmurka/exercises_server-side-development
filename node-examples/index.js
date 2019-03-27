let rectangle = require('./rectangle');

const solveRectange = (l, b) => {
    rectangle(l, b, (err, rectangle) => {
        if (err) {
            console.log('Error: ', err.message);
        } else {
            console.log(`The area is ${rectangle.area()}.`);
            console.log(`The perimeter is ${rectangle.perimeter()}`);
        }
    });
}

solveRectange(2, 4)
solveRectange(3, 5)
solveRectange(0, 3)