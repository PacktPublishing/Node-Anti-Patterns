function stepOne(callback) {
    setTimeout(() => {
        console.log("Step One completed");
        callback(null, "Data from Step One");
    }, 1000);
}

function stepTwo(dataFromStepOne, callback) {
    setTimeout(() => {
        console.log("Step Two completed");
        callback(null, "Data from Step Two");
    }, 1000);
}

function stepThree(dataFromStepTwo, callback) {
    setTimeout(() => {
        console.log("Step Three completed");
        callback(null, "Data from Step Three");
    }, 1000);
}

// Callback Hell: Nesting callbacks
stepOne((err, resultOne) => {
    if (err) {
        console.error("Error in Step One");
        return;
    }

    stepTwo(resultOne, (err, resultTwo) => {
        if (err) {
            console.error("Error in Step Two");
            return;
        }

        stepThree(resultTwo, (err, resultThree) => {
            if (err) {
                console.error("Error in Step Three");
                return;
            }

            console.log("All steps completed: " + resultThree);
        });
    });
});

