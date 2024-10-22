function example() {
    var x = 10;

    if (true) {
        var x = 20;  // Same variable! This will overwrite the previous value of `x`.
        console.log("Inside if block:", x);  // Prints: 20
    }

    console.log("Outside if block:", x);  // Still prints: 20
}
