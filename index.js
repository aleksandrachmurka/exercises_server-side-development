let rectangle = {
    perimeter: (x,y) =>  2*(x+y),
    area: (x,y) => x*y
};

const solveRectange = (l, b) => {
    if ( l <= 0 || b <= 0) {
        console.log("Rectangle dimensions should be greater than 0");
    } else {
        console.log(`Area of the rectangle is ${rectangle.area(l,b)}`);
        console.log(`Perimeter of the rectangle is ${rectangle.perimeter(l,b)}`);
    }
}

solveRectange(2, 4)
solveRectange(3, 5)
solveRectange(0, 3)